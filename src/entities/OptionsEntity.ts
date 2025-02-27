import type Option from '../types/Option'
import type Options from '../types/Options'
import OptionEntity from './OptionEntity'

export default class OptionsEntity implements Options {
  options: Option[] = []

  constructor(options: Option[]) {
    this.options = options
  }

  static fromObject(options: Options) {
    const entityOptions = []

    for (const option of options) {
      entityOptions.push(new OptionEntity(option))
    }

    return new OptionsEntity(entityOptions)
  }
}
