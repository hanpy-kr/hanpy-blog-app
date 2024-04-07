import { atom } from 'recoil'

const i18nAtom = atom({
  key: 'currentLngAtom',
  default: {
    lng: 'KOR', // KOR | ENG
  },
})

export default i18nAtom
