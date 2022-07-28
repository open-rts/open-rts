<script>
  import * as jspb from "google-protobuf";
  import * as trpb from "./ts/terrain_pb";
  import { onMount } from "svelte";

  async function load() {
    const response = await fetch("terrains/acropolis_bay_2p.pbf");
    const body = await response.arrayBuffer();

    const terrain = trpb.Terrain.deserializeBinary(body);
    console.dir(terrain.toObject());
  }

  onMount(load);

  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<button on:click={increment}>
  count is {count}
</button>
