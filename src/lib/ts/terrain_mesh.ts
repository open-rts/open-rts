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
        const startIndex = 0;

        this._tiles = t.tiles.slice(startIndex, patchSize * patchSize);
    }

    build(scene: BABYLON.Scene): void {
        const terrain = this.terrain.terrain;
        const patchSize = terrain.patchSize;
        const tiles = this._tiles;

        var terrainMesh = new BABYLON.Mesh("terrainMesh", scene);

        var vsize = patchSize + 1;
        var positions: number[] = [];

        for (var x = 0; x < vsize; x++) {
            for (var z = 0; z < vsize; z++) {
                positions.push(this._x * 64 + x * 4);
                positions.push(terrain.heights[z + x * vsize]);
                positions.push(this._z * 64 + z * 4);
            }
        }

        var indices: number[] = [];

        // build grid of textures on this patch
        var textures: number[] = [];
        for (var z = 0; z < patchSize; z++) {
            for (var x = 0; x < patchSize; x++) {
                var tex = tiles[z + x * patchSize].getTexture();
                if (textures.indexOf(tex) < 0) {
                    textures.push(tex);
                }
            }
        }

        for (var z = 0; z < patchSize; z++) {
            for (var x = 0; x < patchSize; x++) {
                // indices.push((j + 0) * vsize + (i + 0));
                // indices.push((j + 1) * vsize + (i + 0));
                // indices.push((j + 0) * vsize + (i + 1));

                // indices.push((j + 0) * vsize + (i + 1));
                // indices.push((j + 1) * vsize + (i + 0));
                // indices.push((j + 1) * vsize + (i + 1));

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

export async function loadTerrain(scene: BABYLON.Scene) {
    const response = await fetch("terrains/acropolis_bay_2p.pbf");
    const body = await response.arrayBuffer();

    const terrain = trpb.Terrain.deserializeBinary(body);
    const m = new TerrainMesh(terrain);

    m.build(scene);
}