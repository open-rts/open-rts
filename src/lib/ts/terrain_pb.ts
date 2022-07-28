import * as jspb from "google-protobuf";

export class Terrain extends jspb.Message {

  private static repeatedFields_ = [4, 5, 6];
  constructor(opt_data?: any) {
    super();
    jspb.Message.initialize(this, opt_data, 0, -1, Terrain.repeatedFields_, null);
  }


  getVersion(): number {
    return jspb.Message.getFieldWithDefault(this, 1, 0);
  }


  setVersion(value: number) {
    jspb.Message.setField(this, 1, value);
  }

  getPatchcount(): number {
    return jspb.Message.getFieldWithDefault(this, 2, 0);
  }

  setPatchcount(value: number) {
    jspb.Message.setField(this, 2, value);
  }

  getPatchsize(): number {
    return (jspb.Message.getFieldWithDefault(this, 3, 0));
  }

  setPatchsize(value: number) {
    jspb.Message.setField(this, 3, value);
  }

  getHeightsList(): number[] {
    return jspb.Message.getRepeatedFloatingPointField(this, 4);
  }

  setHeightsList(value) {
    return jspb.Message.setField(this, 4, value || []);
  }


  addHeights(value: number, index?: number) {
    return jspb.Message.addToRepeatedField(this, 4, value, index);
  }


  clearHeightsList() {
    return this.setHeightsList([]);
  }

  getTexturesList() {
    return jspb.Message.getField(this, 5);
  }

  setTexturesList(value) {
    return jspb.Message.setField(this, 5, value || []);
  }

  addTextures(value: string, index?: number) {
    jspb.Message.addToRepeatedField(this, 5, value, index);
  }


  clearTexturesList() {
    this.setTexturesList([]);
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
    var f = undefined;
    f = message.getVersion();
    if (f !== 0) {
      writer.writeUint32(
        1,
        f
      );
    }
    f = message.getPatchcount();
    if (f !== 0) {
      writer.writeUint32(
        2,
        f
      );
    }
    f = message.getPatchsize();
    if (f !== 0) {
      writer.writeUint32(
        3,
        f
      );
    }
    f = message.getHeightsList();
    if (f.length > 0) {
      writer.writePackedFloat(
        4,
        f
      );
    }
    f = message.getTexturesList();
    if (f.length > 0) {
      writer.writeRepeatedString(
        5,
        f
      );
    }
    f = message.tiles;
    if (f.length > 0) {
      writer.writeRepeatedMessage(
        6,
        f,
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
          let value1 = (reader.readUint32());
          msg.setVersion(value1);
          break;
        case 2:
          let value2 = reader.readUint32();
          msg.setPatchcount(value2);
          break;
        case 3:
          var value3 = reader.readUint32();
          msg.setPatchsize(value3);
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
      patchcount: jspb.Message.getFieldWithDefault(msg, 2, 0),
      patchsize: jspb.Message.getFieldWithDefault(msg, 3, 0),
      heightsList: (f = jspb.Message.getRepeatedFloatingPointField(msg, 4)) == null ? undefined : f,
      texturesList: (f = jspb.Message.getField(msg, 5)) == null ? undefined : f,
      tilesList: jspb.Message.toObjectList(msg.tiles,
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
          var value = (reader.readUint32());
          msg.setTexture(value);
          break;
        case 2:
          var value = (reader.readUint32());
          msg.setPriority(value);
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
    var f = undefined;
    f = message.getTexture();
    if (f !== 0) {
      writer.writeUint32(
        1,
        f
      );
    }
    f = message.getPriority();
    if (f !== 0) {
      writer.writeUint32(
        2,
        f
      );
    }
  }


  getTexture(): number {
    return (jspb.Message.getFieldWithDefault(this, 1, 0));
  }

  setTexture(value: number) {
    jspb.Message.setField(this, 1, value);
  }

  getPriority(): number {
    return (jspb.Message.getFieldWithDefault(this, 2, 0));
  }

  setPriority(value: number) {
    return jspb.Message.setField(this, 2, value);
  }

  toObject(includeInstance?: boolean) {
    return Tile.toObject(includeInstance, this);
  }

  static toObject(includeInstance: boolean, msg: Tile) {
    var obj = {
      texture: jspb.Message.getFieldWithDefault(msg, 1, 0),
      priority: jspb.Message.getFieldWithDefault(msg, 2, 0)
    };

    return obj;
  }
}


