import { defineStore } from 'pinia'

import type Option from '../types/Option.js'
import QuestionEntity from '../entities/QuestionEntity'
import type QuestionType from '../enum/QuestionTypes'

//@ts-expect-error hehehe
import questions from './questions.js'

type Answer = string | string[]

export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: questions
      .sort(() => Math.random() - 0.5) // Shuffle the array
      .slice(0, 10) // Pick the first 80 questions
      .map((question: QuestionType) => {
        //@ts-expect-error hehehe
        return QuestionEntity.fromObject(question)
      }),

    isFinished: false,
    pointer: 0,

    correct: 0,
  }),

  getters: {},

  actions: {
    question(index?: number) {
      return this.questions[index ?? this.pointer]
    },

    next(answer: Answer) {
      const currentQuestion = this.question()
      let isCorrect = true

      currentQuestion.options.forEach((option: Option) => {
        if (Array.isArray(answer)) {
          if (answer.includes(option.text) && option.is_correct) {
            option.is_selected = true
          } else if (!answer.includes(option.text) && option.is_correct) {
            isCorrect = false
          } else {
            option.is_selected = false
          }
        } else {
          if (option.text === answer && option.is_correct) {
            option.is_selected = true
          } else if (option.text === answer && !option.is_correct) {
            isCorrect = false
            option.is_selected = false
          } else if (option.text !== answer && option.is_correct) {
            isCorrect = false
          }
        }
      })

      if (isCorrect) {
        this.correct++
      }

      this.pointer++
    },

    previous() {
      this.pointer--
    },

    submit() {
      this.isFinished = true
    },
  },
})
