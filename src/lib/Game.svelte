<script>
  import * as jspb from "google-protobuf";
  import * as BABYLON from "babylonjs";
  import * as trpb from "./ts/terrain_pb";
  import * as tm from "./ts/terrain_mesh";
  import { onMount } from "svelte";

  function load() {
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    var createScene = function () {
      // Create a basic BJS Scene object
      var scene = new BABYLON.Scene(engine);
      // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
      var camera = new BABYLON.FreeCamera(
        "camera1",
        new BABYLON.Vector3(64 * 8, 128, 64 * 8),
        scene
      );
      
      // Target the camera to scene origin
      camera.setTarget(new BABYLON.Vector3(64 * 8, 64, 64 * 8 * 2));
      // Attach the camera to the canvas
      camera.attachControl(canvas, false);
      // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
      var light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      // Return the created scene
      return scene;
    };
    const scene = createScene(); //Call the createScene function

    tm.loadTerrain(scene);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
      scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
      engine.resize();
    });
  }

  onMount(load);
</script>

<canvas id="renderCanvas" touch-action="none" />

<style>
  #renderCanvas {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
</style>
