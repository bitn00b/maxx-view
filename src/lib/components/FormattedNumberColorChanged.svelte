<script lang="ts">
  import { afterUpdate, beforeUpdate } from "svelte";

  export let rawNumber: number;
  export let formattedNumber: number;


  let element;

  let prevValue: number;

  beforeUpdate(() => {
    // prevValue = toFormat;
  });

  afterUpdate(() => {
    const intoGreen = !prevValue || prevValue < rawNumber;

    prevValue = rawNumber;
    flash(element, intoGreen);
  });
  function flash(element, green) {
    requestAnimationFrame(() => {
      // instant red bg flash in
      element.style.transition = "none";
      element.style.color = green
      ? "rgba(62,255,0,1)"
      : "rgba(255,62,0,1)";
     /* element.style.backgroundColor = green
        ? "rgba(62,255,0,0.2)"
        : "rgba(255,62,0,0.2)";
*/
      setTimeout(() => {
        // slow 1s fade out
        element.style.transition = "color 1s, background 1s";
        element.style.color = "";
      //  element.style.backgroundColor = "";
      });
    });
  }
</script>

<span bind:this={element}>
  {formattedNumber}
</span>
