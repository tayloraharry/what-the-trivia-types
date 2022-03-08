import { RoomStatus } from "../../room-object";
import { IRoomObject } from "../../types";

export const getEmptyRoom = (): IRoomObject => {
  return {
    id: "",
    code: "",
    questionTimeLength: 15000,
    users: [],
    started: false,
    status: RoomStatus.Waiting,
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
