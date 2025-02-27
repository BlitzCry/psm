import type QuestionType from '../enum/QuestionTypes'
import type Option from './Option'

export default interface Question {
  question: string
  type: QuestionType
  options: Option[]
}
