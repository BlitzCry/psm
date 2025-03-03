import type Option from '../types/Option'

export default class OptionEntity implements Option {
  text: string
  isCorrect: boolean
  isSelected: boolean

  constructor({
    text,
    isCorrect,
    isSelected,
  }: {
    text: string
    isCorrect: boolean
    isSelected: boolean
  }) {
    this.text = text
    this.isCorrect = isCorrect
    this.isSelected = isSelected
  }

  static fromObject(option: Option) {
    return new OptionEntity({
      text: option.text,
      isCorrect: option.isCorrect,
      isSelected: option.isSelected,
    })
  }

  getText() {
    return this.text
  }

  getIsCorrect() {
    return this.isCorrect
  }

  select() {
    this.isSelected = true
  }

  unselect() {
    this.isSelected = false
  }
}
