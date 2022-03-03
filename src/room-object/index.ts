import { IRoomObject, IRoomUserObject, IQuestionObject } from "../types";

export class RoomObject implements IRoomObject {
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

  constructor(
    id: string,
    questions: IQuestionObject[],
    questionTimeLength?: number
  ) {
    this.id = id;
    this.code = "";
    this.questionTimeLength = questionTimeLength || 15000;
    this.users = [];
    this.started = false;
    this.questions = questions;
    this.currentQuestion = {
      number: 0,
      timeExpired: false,
      question: {
        category: "",
        type: "",
        difficulty: "",
        text: "",
        answers: [],
      },
      startTime: null,
      endTime: null,
      usersAnswered: [],
    };
    this.triviaToken = "";
    this.setRoomCode();
  }

  setRoomCode(): void {
    this.code = this.id
      .replace("-", "")
      .replace("_", "")
      .substring(0, 4)
      .toUpperCase();
  }

  startGame(): void {
    this.started = true;
  }

  joinGame(name: string): boolean {
    const userExists = this.users.filter((u) => u.name === name).length > 0;
    if (userExists) {
      return false;
    }
    this.users.push({
      name,
      id: this.users.length + 1,
      vip: this.users.length === 0,
      totalPoints: 0,
      currentAnswerPoints: 0,
    });
    return true;
  }

  getNewestUser = (): IRoomUserObject | null => {
    const userCount = this.users.length;
    if (userCount > 0) {
      return this.users[userCount - 1];
    }

    return null;
  };

  getUserById = (userId: number): IRoomUserObject => {
    return this.users.filter((u) => u.id === userId)[0];
  };

  calculateScore = (): number => {
    const difference =
      new Date().getTime() - this.currentQuestion.startTime!.getTime();
    return (10 - Math.round(difference / 1000)) * 100;
  };

  getCorrectAnswer = (): string => {
    return this.currentQuestion.question.answers.filter((a) => a.correct)[0]
      .option;
  };

  private startQuestionTimer = (): void => {
    const { endTime } = this.currentQuestion;
    const interval = setInterval(() => {
      if (new Date() >= endTime!) {
        this.currentQuestion.timeExpired = true;
        clearInterval(interval);
      }
    }, this.questionTimeLength + 1000);
  };

  setNextQuestion(): void {
    const questionNumber = this.currentQuestion.number + 1;
    const questionTime = new Date();
    this.currentQuestion = {
      number: questionNumber,
      question: this.questions[questionNumber - 1],
      startTime: questionTime,
      endTime: new Date(questionTime.getTime() + this.questionTimeLength),
      timeExpired: false,
      usersAnswered: [],
    };
    this.startQuestionTimer();
  }

  submitAnswer(userId: number, answer: string): void {
    const user = this.getUserById(userId);
    const score = this.calculateScore();
    const correctAnswer = this.getCorrectAnswer();
    if (answer === correctAnswer) {
      user.totalPoints += score;
    } else {
      user.totalPoints -= score;
    }
    user.currentAnswerPoints = score;
    this.currentQuestion.usersAnswered.push(user);
  }
}
