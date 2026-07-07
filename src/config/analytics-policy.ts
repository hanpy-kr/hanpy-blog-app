/**
 * 분석·광고 정책 메모 (플랜 3단계)
 *
 * 스크립트 삽입 위치
 * - 전 사이트 추적: [src/app/layout.tsx](src/app/layout.tsx) `<html>` 또는 `<body>` 직후
 * - 블로그 본문만: `(categories)` 레이아웃이 생기면 그 layout으로 제한 검토
 *
 * 도구 선택 (택일)
 * - GA4: gtag + G-XXXX, 주요 이벤트는 dataLayer 또는 gtag('event', …)
 * - Plausible/Umami: 초경량, 자체 호스팅 가능, 쿠키 부담 상대적으로 적음
 *
 * 이벤트 이름 규칙 예시
 * - outbound_link, newsletter_cta_click, post_scroll_75 (필요 시만)
 *
 * Google AdSense
 * - 이미 [src/app/layout.tsx]에서 로드 중. EU·영국 사용자 비중이 크면 TCF/동의 배너 등
 *   법무 검토 후 별도 CMP 연동 검토.
 */

export const ANALYTICS_POLICY_VERSION = 1
