# 출시 점검표 (세션 8)

`refactor/v2` → `main` 병합 전에, 그리고 Amplify `main` 배포가 끝난 뒤 hanpy-blog.com 에서 같은 항목을 확인한다.
자동 항목은 스크립트가 확인하고, 사람이 볼 항목은 아래 '수동'에 적는다.

| 실행 | 명령 |
| --- | --- |
| 로컬 | `pnpm build && pnpm start` 후 아래 4개 |
| CI(PR마다) | `.github/workflows/ci.yml`: 빌드 → 빌드 크기 → 사이드바 → URL → 출시 점검 → 화면 점검 |
| 운영 | GitHub Actions → **Release check** → Run workflow (`base_url` = https://hanpy-blog.com, GA ID를 넣으면 그 ID인지 확인) |

```bash
node scripts/check-sidebar.ts                                   # 빌드 후, 서버 불필요
node scripts/check-urls.ts --base http://127.0.0.1:3000          # urls.before.txt 261개
node scripts/check-release.ts --base http://127.0.0.1:3000 --expect-ga none
node scripts/check-ui.mjs --base http://127.0.0.1:3000           # Playwright 필요
```

## 자동 항목

| # | 항목 | 확인 방법 | 스크립트 |
| --- | --- | --- | --- |
| 1 | CI: 빌드 | Turbopack + 진짜 글꼴로 `pnpm build` | ci.yml |
| 2 | CI: 사이드바 비교 | `sidebar.before.json` 링크 214개가 자동 사이드바에 모두 있음, 시리즈 17묶음 편수 | check-sidebar |
| 3 | URL 261/261 | 예전 main 주소 248개 200(리다이렉트도 실패), 삭제 13개 404 | check-urls |
| 4 | 옛 주소 리다이렉트·404 | 없는 글·시리즈·태그·OG 이미지·`/series`·`/nextjs` 404, 404 화면 noindex·홈 링크, `/about/` → `/about` 308, 옛 메뉴 `/posts?category=` 200 | check-release |
| 5 | 운영 도메인 | `http://` → `https://`, `www.` → 맨 도메인 (`--live`) | check-release |
| 6 | sitemap.xml | 300개 이상, 모두 `https://hanpy-blog.com`, 중복 없음, lastmod 날짜, **모든 주소 200** | check-release |
| 7 | 사이트맵 화면 전체 | 제목 `… \| Hanpy Blog`, canonical = 자기 주소, h1 1개, noindex 없음, description 20자 이상(경고) | check-release |
| 8 | RSS | `/rss.xml` 한국어 글·`/en/rss.xml` 영어 글, `application/rss+xml`, `<language>`, `atom:link self`, 글 링크 모두 200 | check-release |
| 9 | robots.txt | 예전 Disallow 7개 그대로, `Allow: /`, `Sitemap:` | check-release |
| 10 | 메타태그 | 화면 종류 12개: title·description·canonical·`html lang`·og:*(이미지 200)·twitter:*·RSS 자동 발견·github.com 없음 | check-release |
| 11 | 구조화 데이터 | 글 BlogPosting(작성일·수정일·author, sameAs 없음)+BreadcrumbList, 홈 WebSite+Person, /about ProfilePage, 시리즈 ItemList, 모두 JSON 파싱 | check-release |
| 12 | 글 1개짜리 태그 | `noindex, follow`, 사이트맵에 없음 | check-release |
| 13 | 검색 인덱스 | `/search-index/ko.json` 200개 이상, `en.json` 1개 이상 | check-release |
| 14 | GA | `NEXT_PUBLIC_GA_ID` 없으면 스크립트 없음, 있으면 그 ID만 (`--expect-ga`) | check-release |
| 15 | 폰 390px | 사이트맵의 모든 화면에서 가로 스크롤 없음 | check-ui |
| 16 | 다크 모드 | 시스템 다크면 `html.dark`, 배경·본문·h1 대비 4.5:1 이상 (화면 10종, 라이트도 같이) | check-ui |
| 17 | 테마 버튼 | 라이트 → 다크, 새로 고침 뒤 유지 | check-ui |

## 수동 항목

| # | 항목 | 누가 | 언제 |
| --- | --- | --- | --- |
| M1 | Amplify `refactor/v2` 최신 빌드(#11 병합 3ec1f40 이후) 성공·화면 확인 — 배포 묶음 크기 제한 포함 | 사용자(Amplify 콘솔) | main 병합 전 |
| M2 | Amplify `main` 환경 변수 `NEXT_PUBLIC_GA_ID` (main에만, 넣은 뒤 다시 빌드) | 사용자 | main 배포 전후 |
| M3 | Amplify `main` 빌드 성공 | 사용자 | main 병합 후 |
| M4 | 운영 Release check 실행 결과 | Claude(Actions) | 배포 후 |
| M5 | Search Console·네이버 서치어드바이저 sitemap·RSS 제출, 리치 결과 테스트, GA4–AdSense 연동 | 사용자 | 배포 후 |

## 결과 기록

### refactor/v2 (3ec1f40 + 세션 8 수정), 2026-11-07 로컬

- 빌드·typecheck 통과, 정적 페이지 889개
- 사이드바 비교 빠진 링크 0 · URL 261/261(유지 248·삭제 13)
- 출시 점검 288항목 통과, 경고 1: `/infra/ko/kubernetes/_statefulset` 요약이 'Statefulset' 한 단어(본문은 외부 링크 한 줄) — 글 내용 문제
- 화면 점검 22항목 통과: 390px 374개 화면 가로 스크롤 0, 다크 본문 7.4:1·h1 15.1:1, 라이트 본문 5.2:1·h1 17.9:1, 테마 버튼 유지
- GA: 환경변수 없이 스크립트 0, `NEXT_PUBLIC_GA_ID=G-TEST12345` 빌드에서 홈·글·/en 모두 그 ID만. 소스·빌드 JS에 하드코딩된 측정 ID 없음
- **고친 것**: `/backend/ko`·`/series/ko`·`/tags/ko` 등 루트 레이아웃과 같은 단계의 화면 제목에 `| Hanpy Blog`가 빠짐 → `pageMetadata()`가 완성된 제목(`title.absolute`)을 넣음
- 빌드 크기(로컬 webpack): `.next/server` 184MB(prerender 108MB + Next 16 route-cache 70MB), static 7MB. Amplify 배포 묶음 제한은 M1로 확인
