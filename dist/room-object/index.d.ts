import { IRoomObject, IRoomUserObject, IQuestionObject } from "../types";
export declare class RoomObject implements IRoomObject {
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
        usersAnswered: IRoomUserObject[];
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
    private startQuestionTimer;
    setNextQuestion(): void;
    submitAnswer(userId: number, answer: string): void;
}
