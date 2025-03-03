import { defineStore } from 'pinia'
type Choice = {
  text: string
  correct: boolean
  chosen?: boolean
}

type Question = {
  question: string
  choices: Choice[]
  isCorrect: boolean
}

type QuestionsData = {
  scrum_quiz: Question[]
}

//@ts-expect-error Meh
import questions from './questions.js'
import type QuestionType from '../enum/QuestionTypes.js'
import QuestionEntity from '../entities/QuestionEntity.js'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    questions: questions
      .sort(() => Math.random() - 0.5) // Shuffle the array
      .slice(0, 80) // Pick the first 80 questions
      .map((question: QuestionType) => {
        return QuestionEntity.fromObject(question)
      }),
    currentQuestion: 0,
    answerStatuses: {},
    isQuizFinished: false,
  }),

  getters: {
    getCurrentQuestion(state) {
      return state.questions[state.currentQuestion]
    },

    getTestScore(state) {
      const rightQuestions = state.questions.reduce(
        (correct: number, question: { isCorrect: boolean }) => {
          if (question.isCorrect === true) {
            return correct + 1
          }

          return correct
        },
        0,
      )

      return Math.round((rightQuestions / state.questions.length) * 100)
    },

    getScoreMessage(state): string {
      const score = this.getTestScore

      if (score < 85) {
        return `Score: ${score}. You have failed.`
      }

      return `Score: ${score}. You have passed!`
    },
  },

  actions: {
    reset() {
      this.questions = questions.scrum_quiz
      this.currentQuestion = 0
      this.answerStatuses = {}
    },

    getQuestion(index: number) {
      return this.questions[index]
    },

    nextQuestion(answer: string[]) {
      this.validateAnswer(answer, this.currentQuestion)

      this.currentQuestion++

      if (this.currentQuestion >= this.questions.length) {
        this.isQuizFinished = true
      }
    },

    previousQuestion() {
      if (this.currentQuestion - 1 < 0) {
        this.currentQuestion = 0
      } else {
        this.currentQuestion--
      }
    },

    validateAnswer(answer: string[], questionNb: number) {
      this.questions[questionNb].choices = this.questions[questionNb].options.map((choice) => ({
        ...choice,
        chosen: answer.includes(choice.text),
      }))

      const correctChoices = this.questions[questionNb].options
        .filter((choice: Choice) => choice.correct)
        .map((choice: Choice) => choice.text)

      if (!answer.length) {
        this.questions[questionNb].empty_response = true
      } else {
        this.questions[questionNb].empty_response = false
      }

      this.questions[questionNb].isCorrect = this.areArraysEqual(correctChoices, answer)
    },

    areArraysEqual(arr1: unknown[], arr2: unknown[]) {
      if (arr1.length !== arr2.length) {
        return false
      }

      const sortedArr1 = arr1.slice().sort() // Creating a copy to avoid modifying the original array
      const sortedArr2 = arr2.slice().sort()

      return sortedArr1.every((value, index) => value === sortedArr2[index])
    },
  },
})
