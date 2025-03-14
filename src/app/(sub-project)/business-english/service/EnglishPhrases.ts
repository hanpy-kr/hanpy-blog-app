import { englishEnum, ItemType } from './types'

export class EnglishPhrases {
  construct() {}
  private BUSINESS_PATTERNS_CONTENT = businessPatterns

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

  public getOrderSampleByType() {}
}

const businessPatterns: ItemType[] = [
  {
    id: 'BUSINESS_SENTENCE_1',
    en: 'Please, click on the `Submit` button to finalize your application.',
    ko: '신청을 완료하려면 `제출` 버튼을 클릭하십시오.',
  },
  {
    id: 'BUSINESS_SENTENCE_2',
    en: 'Please, join the upcoming project discussion on Zoom.',
    ko: 'zoom에서 예정된 프로젝트 토론에 참여하십시오.',
  },
  {
    id: 'BUSINESS_SENTENCE_3',
    en: 'Don`t be late for our team`s virtual brainstorming session this afternon.',
    ko: '오늘 오후 우리 팀의 가상 브레인스토밍 세션에 늦지 마세요.',
  },
  {
    id: 'BUSINESS_SENTENCE_4',
    en: 'I will be attending the marketing strategy discussion at 3 PM today',
    ko: '오늘 오후 3시에 열리는 마케팅 전략 토론회에 참석하겠습니다.',
  },
  {
    id: 'BUSINESS_SENTENCE_5',
    en: 'It is about the budget for the upcoming quarter.',
    ko: '다가오는 분기의 예산에 관한 것입니다.',
  },
  {
    id: 'BUSINESS_SENTENCE_6',
    en: 'There are issues about the project timeline that we need to discuss.',
    ko: '우리가 논의해야 할 프로젝트 일정에 대한 문제가 있습니다.',
  },
  {
    id: 'BUSINESS_SENTENCE_7',
    en: 'Welcome to today`s virtual team meeting.',
    ko: '오늘의 가상 팀 회의에 오신 것을 환영합니다.',
  },
  {
    id: 'BUSINESS_SENTENCE_8',
    en: 'Please update us on the progress of the project',
    ko: '프로젝트 진행 상황을 업데이트해 주십시오.',
  },
  {
    id: 'BUSINESS_SENTENCE_9',
    en: 'Please be mindful of the time, as we have a lot to cover in this meeting.',
    ko: '이 회의에서 다룰 내용이 많으므로 시간에 유의하십시오.',
  },
  {
    id: 'BUSINESS_SENTENCE_10',
    en: 'Before we start, can everyone hear me clearly?',
    ko: '시작하기 전에 모두 내 말을 잘 들을 수 있나요?',
  },
  {
    id: 'BUSINESS_SENTENCE_11',
    en: 'Can you see my screen now?',
    ko: '지금 제 회면이 보이나요?',
  },
  {
    id: 'BUSINESS_SENTENCE_12',
    en: 'The meeting is going to last about 45 minutes, so let`s make sure we stay focused.',
    ko: '회의는 약 45분 동안 진행될 예정이므로 집중하도록 합시다.',
  },
  {
    id: 'BUSINESS_SENTENCE_13',
    en: 'Don`t hesitate to speak up if you have any questions.',
    ko: '질문이 있으면 주저하지 말고 말하십시오.',
  },
  {
    id: 'BUSINESS_SENTENCE_14',
    en: 'Let me share my screen so you can see the presentation.',
    ko: '프레젠테이션을 볼 수 있도록 내 화면을 공유하겠습니다.',
  },
  {
    id: 'BUSINESS_SENTENCE_15',
    en: 'Would you mind if we move on to the next agenda item?',
    ko: '다음 안건으로 넘어가도 될까요?',
  },
  {
    id: 'BUSINESS_SENTENCE_16',
    en: 'Could I interrupt you for a quick clarification on that point?',
    ko: '그 점에 대해 간단히 설명해드리기 위해 잠시 종단해도 될까요?',
  },
  {
    id: 'BUSINESS_SENTENCE_17',
    en: 'We don`t seem to have everyone on the call yet.',
    ko: '아직 모든 사람이 통화에 참여하지 않은 것 같습니다.',
  },
  {
    id: 'BUSINESS_SENTENCE_18',
    en: 'Can we go back to the previous slide for a moment?',
    ko: '잠시 이전 슬라이드로 돌아가도 될까요?',
  },
  {
    id: 'BUSINESS_SENTENCE_19',
    en: 'Have you considered incorporating more visuals in your presentation?',
    ko: '프리젠테이션에 더 많은 시각적 요소를 통합하는 것을 고려해 보셨습니까?',
  },
  {
    id: 'BUSINESS_SENTENCE_20',
    en: 'I`m confused about the next steps in this project.',
    ko: '이 프로젝트의 다음 단계에 대해 혼란스럽습니다.',
  },
  {
    id: 'BUSINESS_SENTENCE_21',
    en: 'Could you provide me with an update on the project status?',
    ko: '프로젝트 상태에 대한 업데이트를 제공해 주시겠습니까?',
  },
]
