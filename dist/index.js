"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyRoom = exports.RoomStatus = exports.RoomObject = void 0;
//classes
var room_object_1 = require("./room-object");
Object.defineProperty(exports, "RoomObject", { enumerable: true, get: function () { return room_object_1.RoomObject; } });
Object.defineProperty(exports, "RoomStatus", { enumerable: true, get: function () { return room_object_1.RoomStatus; } });
//utils
var room_1 = require("./utils/room");
Object.defineProperty(exports, "getEmptyRoom", { enumerable: true, get: function () { return room_1.getEmptyRoom; } });
