# Hanpy-blog-app

## 개발

Node 22.18+, pnpm 10 (`corepack enable` 또는 `npm i -g pnpm@10.28.0`)

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # Content Collections가 _content/**/*.mdx 를 먼저 컴파일한 뒤 next build
pnpm typecheck
pnpm start -p 3000 & pnpm check:urls --base http://127.0.0.1:3000   # urls.before.txt 기준 URL 비교 (CI와 같음)
pnpm check:sidebar  # 빌드 후. sidebar.before.json 링크가 자동 사이드바에 모두 있는지·시리즈 편수 (CI와 같음, --series 로 시리즈 순서 출력)
```

- 글: `_content/{category}/{lng}/{sub}/.../{slug}.mdx` → `/{category}/{lng}/{sub}/.../{slug}` (카테고리·언어는 경로가 기준)
- 카테고리·서브카테고리: `src/config/taxonomy.ts` 한 곳에 이름·설명·아이콘·사이드바 그룹 순서를 적는다. 적은 순서가 화면 순서
  - 사이드바는 글 frontmatter `group`·`order`로 자동 생성(링크 문구 = title, 순서 = 서브카테고리 → 그룹 → order). 서브카테고리 첫 화면도 자동
  - 시리즈 안 순서도 사이드바 순서를 따른다
  - 공개 글이 0개인 카테고리·서브카테고리(예: `ai`)는 메뉴·홈·사이드바에서 숨는다
  - 새 서브카테고리·그룹은 글을 쓰기 전에 taxonomy에 먼저 추가 (등록 안 된 폴더·그룹이면 빌드가 멈춤)

### 글 frontmatter

```yaml
---
title: '글 제목'            # 페이지 h1·목록·검색에 쓰는 유일한 제목 (본문에는 # 제목을 쓰지 않음, 본문 제목은 ## 부터)
summary: '한두 문장 요약'    # 목록·description·OG
publishedAt: 2026-11-03     # YYYY-MM-DD. 미래 날짜면 그날까지 비공개
draft: true                 # 초안일 때만. 공개 글은 생략
group: 'Beginner'           # 사이드바 그룹 (공개 글 필수, taxonomy.ts 의 groups 중 하나)
order: 3                    # 그룹 안 순서 (공개 글 필수)
series: kubernetes          # 시리즈 id (선택, 순서는 사이드바 순서)
tags: [Kubernetes, Pod]     # 선택
---
```

형식이 틀리면(날짜 형식, 본문 `#`, 공개 글의 group·order·summary 누락, taxonomy에 없는 카테고리·서브카테고리·그룹) 빌드가 멈춥니다.
- 배포: AWS Amplify Hosting (`amplify.yml`, Node 22)

### 목록·시리즈·태그 (세션 7a)

| 주소 | 내용 |
| --- | --- |
| `/{category}/{lng}` | 카테고리: 서브카테고리 카드 · 시리즈 · 최근 글 |
| `/{category}/{lng}/{sub}` | 서브카테고리: 사이드바 순서 글 목록 (글 라우트 `[...segments]`가 세그먼트 하나짜리 주소를 처리) |
| `/series/{lng}`, `/series/{lng}/{id}` | 시리즈 목록, 시리즈 목차 |
| `/tags/{lng}`, `/tags/{lng}/{tag}` | 태그 전체, 태그별 글 (글 1개짜리 태그는 noindex·사이트맵 제외) |
| `/about` | 작성자 소개 (작성자 URL·JSON-LD Person url) |

- 시리즈 이름: `src/config/series.ts` (frontmatter `series`가 여기 없으면 빌드 중단). 글 순서는 사이드바 순서
- 글 페이지: 시리즈 상자(n/m, 목차) · 이전/다음 글 · 함께 읽을 글(같은 시리즈를 뺀 글 중 태그 겹침 많은 순 3개) · 태그 칩 링크
- 태그 주소: 소문자, 공백·특수문자 → `-` (`Node.js` → `/tags/ko/node-js`)
- 새 화면의 메타데이터는 `src/lib/page-metadata.ts`의 `pageMetadata()`로 (기본 OG·Twitter·RSS 링크 유지)

### 검색·영어·광고·앱 (세션 7b)

- 검색: 빌드 때 `/search-index/{lng}.json`(제목·요약·태그·소제목) → 브라우저에서 MiniSearch. 머리글 버튼·`/` 키·홈 검색 상자
- 영어: `/en` 홈, `/en/rss.xml`(영어 글), `/rss.xml`은 한국어 글만. 머리글 KO/EN은 짝이 있으면 그 화면, 없으면 언어 홈. 화면 문구는 `src/i18n`
- 광고: `<AdSlot placement="in-article" | "sidebar" />`, 단위 ID는 `src/config/site.ts`의 `AD_SLOTS`(비어 있으면 안 그림, 자동 광고는 그대로). 본문 중간은 빌드 때 가운데 `##` 앞(## 3개 이상인 글), 글 frontmatter `ads: false`면 둘 다 안 그림. 빈 자리 미리보기는 `NEXT_PUBLIC_AD_PREVIEW=1`
- 서브프로젝트: `src/config/apps.ts` → 홈 Projects·/about·sitemap

### SEO·분석 (세션 6)

- 사이트 전역 설정(사이트명·주소·작성자·GitHub·AdSense·기본 메타데이터): `src/config/site.ts`
- 페이지 제목은 `제목 | Hanpy Blog` (레이아웃 title 템플릿). 글은 summary → description, canonical, OG(article)·Twitter 카드
- 글별 OG 이미지: `/og/{글 경로}.png` (`src/app/og/[category]/[lng]/[...segments]/route.tsx`, next/og). 빌드 때 공개 글마다 정적 생성. 글꼴은 `assets/og/`(woff, README 참고)
- JSON-LD: 글 BlogPosting + BreadcrumbList, 홈 WebSite + Person (`src/lib/structured-data.ts`)
- `sitemap.xml`: lastmod = `updatedAt`(없으면 `publishedAt`), 같은 sub/slug의 다른 언어 글이 있으면 hreflang. `robots.txt`는 `src/app/robots.ts`
- GA4: 빌드 환경변수 `NEXT_PUBLIC_GA_ID`(예: Amplify 환경 변수, main 브랜치에만)가 있을 때만 스크립트를 넣는다. 코드에 ID를 적지 않는다

## code block

- carbon 이미지처럼 드레그 할 수 있는 css 적용
- https://blog.robbie.digital/posts/highlight-js highlignt 라이브러리 적용
- https://github.com/highlightjs/highlight.js/#custom-usage

## reference

- svg icon : https://www.svgrepo.com/svg/

## Tech Reference

- https://yozm.wishket.com/magazine/detail/2493/

##### 그래프

- https://velog.io/@eunjin/React-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B7%B8%EB%9E%98%ED%94%84%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%AA%A8%EC%9D%8C

## UI Reference

##### 블로그 UI

- https://next-blog-starter.vercel.app/posts/preview
