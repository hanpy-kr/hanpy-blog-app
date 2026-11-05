// 화면 표시용 서식. 클라이언트 컴포넌트에서도 쓰므로 다른 모듈을 import 하지 않는다

/** `2025-5-20`·`2025-05-20` → `2025.05.20` */
export function formatDate(date: string): string {
  const [y, m, d] = date.split('-')
  return d ? `${y}.${m.padStart(2, '0')}.${d.padStart(2, '0')}` : date
}
