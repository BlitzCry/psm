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
      .slice(0, 80) // Pick the first 80 questions
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
        const isSelected = Array.isArray(answer)
          ? answer.includes(option.text)
          : option.text === answer

        option.is_selected = isSelected

        if ((isSelected && !option.is_correct) || (!isSelected && option.is_correct)) {
          isCorrect = false
        }
      })

      if (isCorrect) {
        this.correct++
        this.question().is_correct = isCorrect
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
