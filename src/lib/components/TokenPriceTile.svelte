<script lang="ts">
  import {ActionIcon, Paper, Menu} from '@svelteuidev/core';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import BiGlobe from "svelte-icons-pack/bi/BiGlobe";
  import BiLogoTelegram from "svelte-icons-pack/bi/BiLogoTelegram";
  import FiTwitter from "svelte-icons-pack/fi/FiTwitter";
  import SimpleImage from "./SimpleImage.svelte";
  import FaSolidExternalLinkSquareAlt from "svelte-icons-pack/fa/FaSolidExternalLinkSquareAlt";
  import {formatNumberUSD} from "../utils.js";
  import type {StaticTokenInformation, UrlIcon} from "../logic/types";
  import {getTokenPriceReadable} from "../logic/priceCache";

  const MenuItem = Menu.Item;

  export let staticInfo: StaticTokenInformation;

  let mainUrl = staticInfo.urls.find(u => u.type === 'homepage');

  export let priceValue: number = undefined;

  const priceOfTokenInfo = getTokenPriceReadable(staticInfo);

  $: priceOfTokenUSD = $priceOfTokenInfo?.priceUSD;

  $: priceToShow = priceValue ?? priceOfTokenUSD;

  const iconMap: { [key: UrlIcon['type']]: unknown } = {
    'homepage': BiGlobe,
    'twitter': FiTwitter,
    'telegram': BiLogoTelegram
  };

  const iconColorMap = {
    'homepage': 'cyan',
    'telegram': '#0088cc'
  }

</script>

<Paper>
   <div>
      <div class="title-row">
         {staticInfo.title}

         {#if staticInfo.urls.length}
            <div class="top-right">
               <Menu>
                  <ActionIcon color="blue" variant="light" slot="control">
                     <Icon src={FaSolidExternalLinkSquareAlt} size="16" color="lightgray"></Icon>
                  </ActionIcon>

                  {#each staticInfo.urls as urlEntry}
                     {#if urlEntry.type === 'custom'}
                        <MenuItem href={urlEntry.targetUrl} root="a" target="_blank"
                                  icon={SimpleImage} iconProps="{{
                        iconProps: {
                          src: urlEntry.iconUrl,
                          size: 16,
                        }
                      }}">
                           {urlEntry.title}
                        </MenuItem>
                     {:else}
                        <MenuItem href={urlEntry.targetUrl} root="a" target="_blank"
                                  icon={Icon}
                                  iconProps="{
                       {iconProps: {
                         src: iconMap[urlEntry.type],
                         size: 24,
                         color:iconColorMap[urlEntry.type],
                         className: 'custom-icon-16'
                       }}}">
                           {urlEntry.title}
                        </MenuItem>
                     {/if}
                  {/each}
               </Menu>

               {#if mainUrl}
                  <ActionIcon color="blue" variant="light" root="a" target="_blank" title={mainUrl.title}
                              href={mainUrl.targetUrl} style="margin-top: 0.5rem">
                     <Icon src={iconMap[mainUrl.type]} size="24" color="white"></Icon>
                  </ActionIcon>
               {/if}
            </div>
         {/if}
      </div>

      {#if !!priceToShow }
         <h3>$ {formatNumberUSD(priceToShow)}</h3>
      {/if}

      <slot name="additionalData" priceToShow={priceToShow}></slot>
   </div>
</Paper>

<div style="display: flex; gap: 0.5rem">

</div>

<style lang="scss">
  .title-row {
    position: relative;
    padding-right: 2rem;

    :global(.top-right) {
      position: absolute;
      right: 0;
      top: 0;

    }
  }

  :global(.custom-icon-16) {
    scale: 0.7;
    margin-left: -6px;
    margin-right: 6px;
    margin-top: -4px;
    margin-bottom: -4px;
  }


</style>
