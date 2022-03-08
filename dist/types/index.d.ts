export interface IAnswerObject {
    option: string;
    text: string;
    correct: boolean;
}
export interface IQuestionObject {
    category: string;
    type: string;
    difficulty: string;
    text: string;
    answers: IAnswerObject[];
}
export interface IRoomUserObject {
    name: string;
    id: number;
    vip: boolean;
    totalPoints: number;
    currentAnswerPoints: number;
}
export interface IRoomObject {
    id: string;
    code: string;
    questionTimeLength: number;
    users: IRoomUserObject[];
    started: boolean;
    questions: IQuestionObject[];
    currentQuestion: {
        number: number;
        timeExpired: boolean;
        question: IQuestionObject;
        usersAnswered: number[];
        startTime: Date | null;
        endTime: Date | null;
    };
    triviaToken?: string | null;
}
export interface IJoinRoomObject {
    roomCode: string;
    name: string;
}
export interface IUserJoinedObject {
    successful: boolean;
    room: IRoomObject;
}
