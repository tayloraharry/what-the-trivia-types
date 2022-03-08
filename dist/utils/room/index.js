"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyRoom = void 0;
const room_object_1 = require("../../room-object");
const getEmptyRoom = () => {
    return {
        id: "",
        code: "",
        questionTimeLength: 15000,
        users: [],
        started: false,
        status: room_object_1.RoomStatus.Waiting,
        questions: [],
        currentQuestion: {
            number: 0,
            question: {
                category: "",
                type: "",
                difficulty: "",
                text: "",
                answers: [],
            },
            usersAnswered: [],
            timeExpired: false,
            startTime: null,
            endTime: null,
        },
    };
};
exports.getEmptyRoom = getEmptyRoom;
