import { IRoomObject, IRoomUserObject, IQuestionObject } from "../types";
export declare enum RoomStatus {
    Waiting = "waiting",
    Rules = "rules",
    Question = "question",
    CurrentScore = "currentScore",
    FinalScore = "finalScore"
}
export declare class RoomObject implements IRoomObject {
    id: string;
    code: string;
    status: RoomStatus;
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
    triviaToken?: string;
    constructor(id: string, questions: IQuestionObject[], questionTimeLength?: number);
    setRoomCode(): void;
    startGame(): void;
    joinGame(name: string): boolean;
    getNewestUser: () => IRoomUserObject | null;
    getUserById: (userId: number) => IRoomUserObject;
    calculateScore: () => number;
    getCorrectAnswer: () => string;
    private allUsersAnswered;
    setNextQuestion(): void;
    submitAnswer(userId: number, answer: string): void;
    expireCurrentQuestion(): void;
}
