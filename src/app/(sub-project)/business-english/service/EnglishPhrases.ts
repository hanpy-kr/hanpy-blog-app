import { businessPatterns } from '../const/sentence'
import { englishEnum, ItemType } from './types'

export class EnglishPhrases {
  construct() {}
  private BUSINESS_PATTERNS_CONTENT = businessPatterns

  private orderCounters: { [key in englishEnum]?: number } = {}

  private filterEnglishType(type: englishEnum) {
    switch (type) {
      case englishEnum.BUSINESS_PATTERN:
        return this.BUSINESS_PATTERNS_CONTENT

      default:
        throw Error('EXCEPTION : filterEnglishType fnc.')
    }
  }

  private getRandomContent(contents: ItemType[]) {
    const randomIndex = Math.floor(Math.random() * contents.length)
    return contents[randomIndex]
  }

  public getRandomSampleByType(type: englishEnum) {
    const contentItem = this.getRandomContent(this.filterEnglishType(type))

    return contentItem
  }

  public getOrderSampleByType(type: englishEnum): ItemType {
    const contents = this.filterEnglishType(type)
    if (this.orderCounters[type] === undefined) {
      this.orderCounters[type] = 0
    }
    const index = this.orderCounters[type]!
    const contentItem = contents[index]
    this.orderCounters[type] = (index + 1) % contents.length
    return contentItem
  }
}
