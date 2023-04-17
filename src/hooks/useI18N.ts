import { withChanged } from '@/recoil/i18n'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { usePathname } from 'next/navigation'

export default function useI18N() {
  const pathname = usePathname()

  const currentLng = useRecoilValue(withChanged)
  const setCurrentLng = useSetRecoilState(withChanged)

  const detecteLngAndSetI18n = () => {
    if (currentLng.lng.length === 0 && navigator.language)
      setCurrentLng({ lng: navigator.language })

    // 세부 페이지 들어가면 등록
    if (pathname.includes('ko')) {
      setCurrentLng({ lng: 'ko' })
    } else if (pathname.includes('en')) {
      setCurrentLng({ lng: 'en' })
    }
  }

  const changeI18N = (lng: string) => {
    if (lng) setCurrentLng({ lng: lng })
  }

  return { detecteLngAndSetI18n, changeI18N }
}
