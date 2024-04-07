import { selector } from 'recoil'
import i18nAtom from './atom'

const i18nWithChanged = selector({
  key: 'i18nWithChanged',
  get: ({ get }) => get(i18nAtom),
  set: ({ set }, newLng) => {
    set(i18nAtom, newLng)
  },
})

export default i18nWithChanged
