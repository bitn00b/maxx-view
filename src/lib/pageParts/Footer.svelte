<script lang="ts">
  import TippingModal from "../modals/TippingModal.svelte";
  import {showTippingModal} from "../appState.js";
</script>

<div class="fixed-footer">
  <div class="relative-parent">
    <div class="milky-background"></div>

    <div class="tipping-button" on:click={() => $showTippingModal = true}>
      💸 If you would like to tip BitNoob 🥰
    </div>
  </div>

</div>

<TippingModal />

<style lang="scss">
  .fixed-footer {
    position: fixed;
    bottom: 0.35rem;
    left: 0.25rem;
    right: 0.25rem;

    display: flex;
    gap: 0.5rem;
    z-index: 2;


    overflow: clip;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);

    backdrop-filter: blur(0.5rem);

    &:hover {
      backdrop-filter: blur(2rem);

      box-shadow: 0 0 1rem rgba(255, 255, 255, 0.2);
    }
  }

  .relative-parent {
    position: relative;
    width: 100%;

    --gradientFrom: var(--svelteui-colors-blue400);
    --gradientTo: var(--svelteui-colors-blue900);

    &:hover {
      --gradientFrom: var(--svelteui-colors-teal300);
      --gradientTo: var(--svelteui-colors-teal700);
    }
  }

  .milky-background {

    position: absolute;
    height: 100%;
    width: 100%;

    background: var(--svelteui-colors-blue700); // fallback if linear-gradient doesnt work
    background: linear-gradient(
                    to right bottom,
                    var(--gradientFrom),
                    var(--gradientTo)
    );

    opacity: 0.4;


  }

  .tipping-button {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;

    position: inherit;
    min-height: 3vh;
    padding: 0.5rem;
    z-index: 1;

    line-height: 16px;

    &:hover {
      cursor: pointer;
    }
  }
</style>
