import type QuestionType from '../enum/QuestionTypes'
import type Option from '../types/Option'
import type Question from '../types/Question'
import OptionEntity from './OptionEntity'

export default class QuestionEntity implements Question {
  question: string
  type: QuestionType
  options: Option[]

  constructor(question: string, type: QuestionType, options: Option[]) {
    this.question = question
    this.type = type
    this.options = options
  }

  static fromObject(question: Question) {
    const options: Option[] = []

    question.options.forEach((option: Option) => options.push(OptionEntity.fromObject(option)))

    return new QuestionEntity(question.question, question.type, options)
  }
}
