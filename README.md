# Hanpy-blog-app

## 개발

Node 22.18+, pnpm 10 (`corepack enable` 또는 `npm i -g pnpm@10.28.0`)

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # Content Collections가 _content/**/*.mdx 를 먼저 컴파일한 뒤 next build
pnpm typecheck
pnpm start -p 3000 & pnpm check:urls --base http://127.0.0.1:3000   # urls.before.txt 기준 URL 비교 (CI와 같음)
```

- 글: `_content/{category}/{lng}/{sub}/.../{slug}.mdx` → `/{category}/{lng}/{sub}/.../{slug}`
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
