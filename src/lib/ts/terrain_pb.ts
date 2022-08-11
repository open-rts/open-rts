import * as jspb from "google-protobuf";

export class Terrain extends jspb.Message {

  private static repeatedFields_ = [4, 5, 6];
  constructor(opt_data?: any) {
    super();
    jspb.Message.initialize(this, opt_data, 0, -1, Terrain.repeatedFields_, null);
  }


  get version(): number {
    return jspb.Message.getFieldWithDefault(this, 1, 0);
  }


  set version(value: number) {
    jspb.Message.setField(this, 1, value);
  }

  get patchCount(): number {
    return jspb.Message.getFieldWithDefault(this, 2, 0);
  }

  set patchCount(value: number) {
    jspb.Message.setField(this, 2, value);
  }

  get patchSize(): number {
    return jspb.Message.getFieldWithDefault(this, 3, 0);
  }

  set patchSize(value: number) {
    jspb.Message.setField(this, 3, value);
  }

  get heights(): number[] {
    return jspb.Message.getRepeatedFloatingPointField(this, 4);
  }

  set heights(value: number[]) {
    jspb.Message.setField(this, 4, value || []);
  }


  addHeights(value: number, index?: number) {
    return jspb.Message.addToRepeatedField(this, 4, value, index);
  }


  clearHeightsList() {
    return this.heights = [];
  }

  get textures(): Array<string> {
    return jspb.Message.getField(this, 5) as Array<string>;
  }

  set textures(value: string[]) {
    jspb.Message.setField(this, 5, value || []);
  }

  addTextures(value: string, index?: number) {
    jspb.Message.addToRepeatedField(this, 5, value, index);
  }


  clearTextures() {
    this.textures = [];
  }

  get tiles(): Tile[] {
    return jspb.Message.getRepeatedWrapperField(this, Tile, 6);
  }

  set tiles(value: Tile[]) {
    jspb.Message.setRepeatedWrapperField(this, 6, value);
  }


  addTile(value: Tile, index?: number) {
    jspb.Message.addToRepeatedWrapperField(this, 6, value, Tile, index);
  }

  clearTiles() {
    this.tiles = [];
  }



  static deserializeBinary(bytes: jspb.ByteSource) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new Terrain();
    return Terrain.deserializeBinaryFromReader(msg, reader);
  }

  static serializeBinaryToWriter(message: Terrain, writer: jspb.BinaryWriter) {

    const fv = message.version;
    if (fv !== 0) {
      writer.writeUint32(
        1,
        fv
      );
    }

    const fpc = message.patchCount;
    if (fpc !== 0) {
      writer.writeUint32(
        2,
        fpc
      );
    }
    const fps = message.patchSize;
    if (fps !== 0) {
      writer.writeUint32(
        3,
        fps
      );
    }
    const fh = message.heights;
    if (fh && fh.length > 0) {
      writer.writePackedFloat(
        4,
        fh
      );
    }
    const ft = message.textures;
    if (ft.length > 0) {
      writer.writeRepeatedString(
        5,
        ft
      );
    }
    const ftl = message.tiles;
    if (ftl.length > 0) {
      writer.writeRepeatedMessage(
        6,
        ftl,
        Tile.serializeBinaryToWriter
      );
    }
  }

  static deserializeBinaryFromReader(msg: Terrain, reader: jspb.BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          let value1 = reader.readUint32();
          msg.version = value1;
          break;
        case 2:
          let value2 = reader.readUint32();
          msg.patchCount = value2;
          break;
        case 3:
          var value3 = reader.readUint32();
          msg.patchSize = value3;
          break;
        case 4:
          var value4 = (reader.isDelimited() ? reader.readPackedFloat() : [reader.readFloat()]);
          for (var i = 0; i < value4.length; i++) {
            msg.addHeights(value4[i]);
          }
          break;
        case 5:
          var value5 = reader.readString();
          msg.addTextures(value5);
          break;
        case 6:
          var value6 = new Tile();
          reader.readMessage(value6, Tile.deserializeBinaryFromReader);
          msg.addTile(value6);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  }

  serializeBinary(): Uint8Array {
    var writer = new jspb.BinaryWriter();
    Terrain.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  static toObject(includeInstance: boolean, msg: Terrain) {
    var f, obj = {
      version: jspb.Message.getFieldWithDefault(msg, 1, 0),
      patchCount: jspb.Message.getFieldWithDefault(msg, 2, 0),
      patchSize: jspb.Message.getFieldWithDefault(msg, 3, 0),
      heights: (f = jspb.Message.getRepeatedFloatingPointField(msg, 4)) == null ? undefined : f,
      textures: (f = jspb.Message.getField(msg, 5)) == null ? undefined : f,
      tiles: jspb.Message.toObjectList(msg.tiles,
        Tile.toObject, includeInstance)
    }

    return obj;
  }

  toObject(includeInstance?: boolean) {
    return Terrain.toObject(includeInstance ?? false, this);
  }
}

export class Tile extends jspb.Message {
  constructor(data?: any) {
    super();
    jspb.Message.initialize(this, data, 0, -1, null, null);
  }

  static deserializeBinary(bytes: jspb.ByteSource) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new Tile();
    return Tile.deserializeBinaryFromReader(msg, reader);
  }



  static deserializeBinaryFromReader(msg: Tile, reader: jspb.BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          var value = reader.readUint32();
          msg.texture = value;
          break;
        case 2:
          var value = reader.readUint32();
          msg.priority = value;
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  }


  serializeBinary() {
    var writer = new jspb.BinaryWriter();
    Tile.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }


  static serializeBinaryToWriter(message: Tile, writer: jspb.BinaryWriter) {
    const ft = message.texture;
    if (ft !== 0) {
      writer.writeUint32(
        1,
        ft
      );
    }
    const fp = message.priority;
    if (fp !== 0) {
      writer.writeUint32(
        2,
        fp
      );
    }
  }


  get texture(): number {
    return (jspb.Message.getFieldWithDefault(this, 1, 0));
  }

  set texture(value: number) {
    jspb.Message.setField(this, 1, value);
  }

  get priority(): number {
    return (jspb.Message.getFieldWithDefault(this, 2, 0));
  }

  set priority(value: number) {
    jspb.Message.setField(this, 2, value);
  }

  toObject(includeInstance?: boolean) {
    return Tile.toObject(includeInstance ?? false, this);
  }

  static toObject(includeInstance: boolean, msg: Tile) {
    var obj = {
      texture: jspb.Message.getFieldWithDefault(msg, 1, 0),
      priority: jspb.Message.getFieldWithDefault(msg, 2, 0)
    };

    return obj;
  }
}


