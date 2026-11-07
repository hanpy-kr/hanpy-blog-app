// 구조화 데이터(JSON-LD) <script>. 글 제목 등에 '</script>'가 들어가도 깨지지 않게 '<'를 이스케이프한다
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
