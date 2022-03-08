"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomObject = void 0;
class RoomObject {
    constructor(id, questions, questionTimeLength) {
        this.getNewestUser = () => {
            const userCount = this.users.length;
            if (userCount > 0) {
                return this.users[userCount - 1];
            }
            return null;
        };
        this.getUserById = (userId) => {
            return this.users.filter((u) => u.id === userId)[0];
        };
        this.calculateScore = () => {
            const difference = new Date().getTime() - this.currentQuestion.startTime.getTime();
            return (10 - Math.round(difference / 1000)) * 100;
        };
        this.getCorrectAnswer = () => {
            return this.currentQuestion.question.answers.filter((a) => a.correct)[0]
                .option;
        };
        this.startQuestionTimer = () => {
            const { endTime } = this.currentQuestion;
            const interval = setInterval(() => {
                if (new Date() >= endTime) {
                    this.currentQuestion.timeExpired = true;
                    clearInterval(interval);
                }
            }, this.questionTimeLength + 1000);
        };
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
    setRoomCode() {
        this.code = this.id
            .replace(/[\W_]+/g, ' ')
            .substring(0, 4)
            .toUpperCase();
    }
    startGame() {
        this.started = true;
    }
    joinGame(name) {
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
    setNextQuestion() {
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
    submitAnswer(userId, answer) {
        const user = this.getUserById(userId);
        const score = this.calculateScore();
        const correctAnswer = this.getCorrectAnswer();
        if (answer === correctAnswer) {
            user.totalPoints += score;
        }
        else {
            user.totalPoints -= score;
        }
        user.currentAnswerPoints = score;
        this.currentQuestion.usersAnswered.push(user);
    }
}
exports.RoomObject = RoomObject;
