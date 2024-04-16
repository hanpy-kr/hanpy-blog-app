import { atom } from 'recoil'

const i18nAtom = atom({
  key: 'currentLngAtom',
  default: {
    lng: 'ko', // ko | en
  },
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window == 'undefined') return
      const savedData = sessionStorage.getItem('currentLngAtom')
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData))

      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      onSet((newValue, _, isReset) => {
        isReset
          ? sessionStorage.removeItem('currentLngAtom')
          : sessionStorage.setItem('currentLngAtom', JSON.stringify(newValue))
      })
    },
  ],
})

export default i18nAtom
