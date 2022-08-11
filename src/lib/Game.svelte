<script>
  import * as tm from "./ts/load_game";
  import { onMount } from "svelte";

  onMount(tm.loadGame);
</script>

<canvas id="renderCanvas" touch-action="none" />

<style>
  #renderCanvas {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
</style>
