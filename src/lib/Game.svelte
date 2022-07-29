<script>
  import * as jspb from "google-protobuf";
  import * as BABYLON from "babylonjs";
  import * as trpb from "./ts/terrain_pb";
  import { onMount } from "svelte";

    async function loadTerrain() {
    const response = await fetch("terrains/acropolis_bay_2p.pbf");
    const body = await response.arrayBuffer();

    const terrain = trpb.Terrain.deserializeBinary(body);
    console.dir(terrain.toObject());
  }

  function load() {
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    var createScene = function () {
      // Create a basic BJS Scene object
      var scene = new BABYLON.Scene(engine);
      // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
      var camera = new BABYLON.FreeCamera(
        "camera1",
        new BABYLON.Vector3(0, 5, -10),
        scene
      );
      // Target the camera to scene origin
      camera.setTarget(BABYLON.Vector3.Zero());
      // Attach the camera to the canvas
      camera.attachControl(canvas, false);
      // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
      var light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
      var sphere = BABYLON.Mesh.CreateSphere(
        "sphere1",
        16,
        2,
        scene,
        false,
        BABYLON.Mesh.FRONTSIDE
      );

      // Move the sphere upward 1/2 of its height
      sphere.position.y = 1;
      // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
      var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene, false);
      // Return the created scene
      return scene;
    };
    const scene = createScene(); //Call the createScene function

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
  onMount(loadTerrain);
</script>

<canvas id="renderCanvas" touch-action="none" />

<style>
  #renderCanvas {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
</style>
