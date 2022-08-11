import * as trpb from "./terrain_pb";
import * as BABYLON from "babylonjs";

export class TerrainMesh {
    private _terrain: trpb.Terrain;
    private _patches: TerrainPatch[];
    private _material: BABYLON.MultiMaterial;

    get terrain() { return this._terrain; }
    get material() { return this._material; }


    constructor(terrain: trpb.Terrain) {
        this._terrain = terrain;
        const patchCount = terrain.patchCount;

        this._patches = [];

        for (let x = 0; x < patchCount; x++) {
            for (let z = 0; z < patchCount; z++) {
                this._patches.push(new TerrainPatch(x, z, this));
            }
        }
    }

    build(scene: BABYLON.Scene): void {
        const textures = this._terrain.textures;
        const colors = [
            BABYLON.Color3.Red(),
            BABYLON.Color3.Blue(),
            BABYLON.Color3.Yellow(),
            BABYLON.Color3.Green(),
            BABYLON.Color3.Magenta(),
            BABYLON.Color3.Purple(),
            BABYLON.Color3.Teal(),
            new BABYLON.Color3(165, 42, 42),
            new BABYLON.Color3(191, 255, 0),

            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
            BABYLON.Color3.Random(),
        ];

        this._material = new BABYLON.MultiMaterial("multi", scene);


        for (let i = 0; i < textures.length; i++) {
            var mat = new BABYLON.StandardMaterial("material-" + i, scene);
            mat.diffuseColor = colors[i % colors.length];

            this._material.subMaterials.push(mat);
        }

        console.dir(textures);

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

    constructor(x: number, z: number, terrain: TerrainMesh) {
        this._x = x;
        this._z = z;
        this._terrain = terrain;
    }

    build(scene: BABYLON.Scene): void {
        const terrain = this.terrain.terrain;
        const patchSize = terrain.patchSize;
        const patchCount = terrain.patchCount;
        const mapSize = patchSize * patchCount;
        const vsize = patchSize + 1;
        const gx = this._x * patchSize;
        const gz = this._z * patchSize;
        const startIndex = (this._z + this._x * patchCount) * patchCount * patchCount;

        const tiles = terrain.tiles;

        const name = "terrain_patch__" + this._x + "_" + this._z;
        var terrainMesh = new BABYLON.Mesh(name, scene);

        const positions: number[] = [];
        const indices: number[] = [];
        const textures: number[] = [];
        const splats: TerrainSplat[] = [];

        for (let i = 0; i < vsize; i++) {
            const ix = gx + i;

            for (let j = 0; j < vsize; j++) {
                const iz = gz + j;
                const v = (ix * mapSize) + iz;

                positions.push(ix * 4);
                positions.push(terrain.heights[v]);
                positions.push(iz * 4);
            }
        }


        // build grid of textures on this patch

        for (let x = 0; x < patchSize; x++) {
            for (let z = 0; z < patchSize; z++) {
                const tile = tiles[startIndex + x + z * patchSize];
                const tex = tile.texture;
                if (textures.indexOf(tex) < 0) {
                    textures.push(tex);
                }
            }
        }

        for (let k = 0; k < textures.length; k++) {
            const tex = textures[k];
            const indexStart = indices.length;

            for (let x = 0; x < patchSize; x++) {
                for (let z = 0; z < patchSize; z++) {
                    const tile = tiles[startIndex + x + z * patchSize];
                    const texOld = tile.texture;
                    if (texOld == tex) {
                        const dir = false;//terrain.GetTriangulationDir(px + i, pz + j);
                        if (dir) {
                            indices.push((z + 0) * vsize + (x + 0));
                            indices.push((z + 1) * vsize + (x + 0));
                            indices.push((z + 0) * vsize + (x + 1));

                            indices.push((z + 0) * vsize + (x + 1));
                            indices.push((z + 1) * vsize + (x + 0));
                            indices.push((z + 1) * vsize + (x + 1));
                        }
                        else {
                            indices.push((z + 0) * vsize + (x + 0));
                            indices.push((z + 1) * vsize + (x + 1));
                            indices.push((z + 0) * vsize + (x + 1));

                            indices.push((z + 1) * vsize + (x + 1));
                            indices.push((z + 0) * vsize + (x + 0));
                            indices.push((z + 1) * vsize + (x + 0));
                        }
                    }
                }
            }

            splats.push(new TerrainSplat(this, tex, indexStart, indices.length - indexStart));
        }


        var vertexData = new BABYLON.VertexData();

        vertexData.positions = positions;
        vertexData.indices = indices;

        var normals = [];
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        vertexData.normals = normals;
        vertexData.applyToMesh(terrainMesh);

        terrainMesh.subMeshes = [];

        const vertCount = terrainMesh.getTotalVertices();

        for (let i = 0; i < splats.length; i++) {
            const splat = splats[i];
            new BABYLON.SubMesh(splat.texture, 0, vertCount, splat.startIndex, splat.count, terrainMesh);

        }

        terrainMesh.material = this._terrain.material;
    }
}

export class TerrainSplat {
    patch: TerrainPatch;
    texture: number;
    startIndex: number;
    count: number;

    constructor(patch: TerrainPatch, texture: number, startIndex: number, count: number) {
        this.patch = patch;
        this.texture = texture;
        this.startIndex = startIndex;
        this.count = count;
    }
}

export async function loadTerrain(scene: BABYLON.Scene, name: string) {
    const response = await fetch(name);
    const body = await response.arrayBuffer();

    const terrain = trpb.Terrain.deserializeBinary(body);
    const m = new TerrainMesh(terrain);

    m.build(scene);
}