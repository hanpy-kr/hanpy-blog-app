// 본문 중간 광고 자리 (세션 7b): 빌드 때 MDX 문서 가운데쯤의 ## 제목 앞에 <AdSlot placement="in-article" />를 넣는다
// - ## 제목이 3개 이상인 글만 (짧은 글에는 넣지 않음). 위치 = ## 제목 중 가운데 것 앞
// - frontmatter ads: false 인 글은 글 페이지가 AdSlot을 빈 컴포넌트로 바꿔 그리지 않는다
// - 실제로 그릴지는 <AdSlot>이 정한다 (광고 단위 ID가 없으면 아무것도 그리지 않음)
// 다른 파일을 import 하지 않는다 (content-collections.ts 가 읽음)

type Node = { type: string; depth?: number; children?: Node[] } & Record<string, unknown>

export const AD_SLOT_MIN_H2 = 3

export default function remarkAdSlot() {
  return (tree: Node) => {
    const children = tree.children ?? []
    const h2 = children.flatMap((n, i) => (n.type === 'heading' && n.depth === 2 ? [i] : []))
    if (h2.length < AD_SLOT_MIN_H2) return
    const at = h2[Math.floor(h2.length / 2)]
    children.splice(at, 0, {
      type: 'mdxJsxFlowElement',
      name: 'AdSlot',
      attributes: [{ type: 'mdxJsxAttribute', name: 'placement', value: 'in-article' }],
      children: [],
    })
  }
}
