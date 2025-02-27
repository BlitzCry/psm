import type Option from '../types/Option'

export default class OptionEntity implements Option {
  text: string
  is_correct: boolean
  is_selected: boolean

  constructor({
    text,
    is_correct,
    is_selected,
  }: {
    text: string
    is_correct: boolean
    is_selected: boolean
  }) {
    this.text = text
    this.is_correct = is_correct
    this.is_selected = is_selected
  }

  static fromObject(option: Option) {
    return new OptionEntity({
      text: option.text,
      is_correct: option.is_correct,
      is_selected: option.is_selected,
    })
  }

  getText() {
    return this.text
  }

  getIsCorrect() {
    return this.is_correct
  }

  select() {
    this.is_selected = true
  }

  unselect() {
    this.is_selected = false
  }
}
