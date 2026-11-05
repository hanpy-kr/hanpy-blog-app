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
