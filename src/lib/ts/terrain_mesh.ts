import * as trpb from "./terrain_pb";
import * as BABYLON from "babylonjs";

export class TerrainMesh {
    private _terrain: trpb.Terrain;
    private _patches: TerrainPatch[];

    get terrain() { return this._terrain; }


    constructor(terrain: trpb.Terrain) {
        this._terrain = terrain;
        const patchCount = terrain.patchCount;

        this._patches = [];

        for (var x = 0; x < patchCount; x++) {
            for (var z = 0; z < patchCount; z++) {
                this._patches.push(new TerrainPatch(x, z, this));
            }
        }
    }

    build(scene: BABYLON.Scene): void {
        this._patches.forEach((v) => v.build(scene));
    }
}

export class TerrainPatch {
    get x() { return this._x; }
    get z() { return this._z; }
    get terrain() { return this._terrain; }

    private _x: number;
    private _z: number;
    private _terrain: TerrainMesh;
    private _tiles: trpb.Tile[];

    constructor(x: number, z: number, terrain: TerrainMesh) {
        this._x = x;
        this._z = z;
        this._terrain = terrain;

        const t = terrain.terrain;
        const patchSize = t.patchSize;
        const patchCount = t.patchCount;
        const startIndex = (z + x * patchCount) * 256;

        this._tiles = t.tiles.slice(startIndex, patchSize * patchSize);
    }

    build(scene: BABYLON.Scene): void {
        const terrain = this.terrain.terrain;
        const patchSize = terrain.patchSize;
        const patchCount = terrain.patchCount;
        const mapSize = patchSize * patchCount;
        var vsize = patchSize + 1;
        const gx = this._x * patchSize;
        const gz = this._z * patchSize;
        const tiles = this._tiles;
        const name = "terrain-patch[" + this._x + "-" + this._z + "]";
        var terrainMesh = new BABYLON.Mesh(name, scene);

        var positions: number[] = [];
        var indices: number[] = [];
        
        for (let i = 0; i < vsize; i++) {
            for (let j = 0; j < vsize; j++) {
                let ix = gx + i;
                let iz = gz + j;
                let v = (ix * mapSize) + iz;

                positions.push(ix * 4);
                positions.push(terrain.heights[v]);
                positions.push(iz * 4);
            }
        }


        // build grid of textures on this patch
        // var textures: number[] = [];
        // for (var x = 0; x < patchSize; x++) {
        //     for (var z = 0; z < patchSize; z++) {
        //         var tex = tiles[z + x * patchSize].texture;
        //         if (textures.indexOf(tex) < 0) {
        //             textures.push(tex);
        //         }
        //     }
        // }

        for (var x = 0; x < patchSize; x++) {
            for (var z = 0; z < patchSize; z++) {
                // indices.push((z + 0) * vsize + (x + 0));
                // indices.push((z + 1) * vsize + (x + 0));
                // indices.push((z + 0) * vsize + (x + 1));

                // indices.push((z + 0) * vsize + (x + 1));
                // indices.push((z + 1) * vsize + (x + 0));
                // indices.push((z + 1) * vsize + (x + 1));

                indices.push((z + 0) * vsize + (x + 0));
                indices.push((z + 1) * vsize + (x + 1));
                indices.push((z + 0) * vsize + (x + 1));

                indices.push((z + 1) * vsize + (x + 1));
                indices.push((z + 0) * vsize + (x + 0));
                indices.push((z + 1) * vsize + (x + 0));
            }
        }

        var vertexData = new BABYLON.VertexData();

        vertexData.positions = positions;
        vertexData.indices = indices;

        vertexData.applyToMesh(terrainMesh);
    }
}

export async function loadTerrain(scene: BABYLON.Scene, name: string) {
    const response = await fetch(name);
    const body = await response.arrayBuffer();

    const terrain = trpb.Terrain.deserializeBinary(body);
    const m = new TerrainMesh(terrain);

    m.build(scene);
}