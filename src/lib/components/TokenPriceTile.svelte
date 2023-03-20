<script lang="ts">
  import { ActionIcon, Paper, Menu } from '@svelteuidev/core';
  import type { UrlIcon } from "./types";
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import BiGlobe from "svelte-icons-pack/bi/BiGlobe";
  import BiLogoTelegram from "svelte-icons-pack/bi/BiLogoTelegram";
  import FiTwitter from "svelte-icons-pack/fi/FiTwitter";
  import SimpleImage from "./SimpleImage.svelte";
  import FaSolidExternalLinkSquareAlt from "svelte-icons-pack/fa/FaSolidExternalLinkSquareAlt";
  import { formatNumberUSD } from "../utils.js";

  const MenuItem = Menu.Item;

  export let title: string;
  export let price: number;
  export let urls: UrlIcon[];
  export let mainUrl: UrlIcon | undefined;

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
      {title}

      <div class="top-right">
        <Menu>
          <ActionIcon color="blue" variant="light" slot="control">
            <Icon src={FaSolidExternalLinkSquareAlt} size="16" color="lightgray"></Icon>
          </ActionIcon>

          {#each urls as urlEntry}
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

    </div>
    <h3>$ {formatNumberUSD(price)}</h3>

    <slot name="additionalData"></slot>
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
