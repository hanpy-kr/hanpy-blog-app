---
deployment: false
category: Infra
title: 'Karpenter — Spot & On-Demand'
summary: 'Kubernetes 환경에서 Karpenter를 활용하여 Spot과 On-Demand 노드를 함께 운영하고, 비용 절감과 안정성을 동시에 확보하는 방법을 단계별로 알아봅시다.'
pageKey: karpenter_3_spot_ondemand
lng: KOR
publishedAt: 2025-09-10
tags: [Karpenter, Kubernetes, EKS, AWS, Spot, On-Demand, NodePool, NodeClass, 비용최적화]
---


클래스 / 함수 파일 분리 가이드


좋아요—한꺼번에 정리해서 드릴게요. (타이틀 추상화 + 다른 예시 + GWT 테스트 예시 + TS에서 클래스/함수형 선택 가이드 + “함수형 분리”의 의미 + utils vs 서비스/도메인 배치 기준)

# 더 추상화한 타이틀 (회원가입 말고 다른 예)

**“입력 → 도메인 → 영속 → 응답”의 일관된 처리 파이프라인**

* 예시: **결제 승인(Authorize Payment)**

  1. **입력 검증**: 금액, 통화, 결제수단 토큰, 상점ID 형식/범위 체크
  2. **도메인 실행**: 수수료 계산, 한도/리스크 규칙 평가, 승인 요청 생성(순수 로직)
  3. **영속**: 승인 엔티티 저장 / 이벤트 기록
  4. **응답 매핑**: 승인ID·상태·표시용 메시지로 DTO 변환 후 반환

이렇게 단계가 분리되어 있으면 테스트가 단순해지고(각 단계 각각 테스트), 설계 변경도 한정된 범위에서 일어납니다.

---

# Given–When–Then(Behavior) 스타일 TypeScript 테스트 예시

아래는 **결제 수수료 계산 및 승인 결정**을 순수 함수로 분리하고, 애플리케이션 서비스는 그걸 합성·오케스트레이션만 하도록 한 예시입니다. (Jest 기준)

```ts
// domain/fee.ts — 순수 도메인 함수
export type Money = { amount: number; currency: 'USD' | 'KRW' };
export function calculateFee(input: Money): Money {
  const rate = input.currency === 'USD' ? 0.029 : 0.030;
  return { amount: Math.round(input.amount * rate), currency: input.currency };
}

// domain/rules.ts — 순수 도메인 규칙
export function isWithinLimit(amount: number, limit: number) {
  return amount <= limit;
}

// app/PaymentService.ts — 애플리케이션 서비스(오케스트레이션)
export interface PaymentRepo {
  saveAuthorization(data: { amount: number; fee: number; currency: string }): Promise<{ id: string }>;
}

import { calculateFee } from '../domain/fee';
import { isWithinLimit } from '../domain/rules';

export class PaymentService {
  constructor(private repo: PaymentRepo, private limit: number) {}

  async authorize(amount: number, currency: 'USD' | 'KRW') {
    // 입력 검증(간단 예)
    if (amount <= 0) throw new Error('Invalid amount');

    // 도메인 실행
    const fee = calculateFee({ amount, currency });
    if (!isWithinLimit(amount, this.limit)) {
      return { approved: false as const, reason: 'LIMIT_EXCEEDED' };
    }

    // 영속
    const saved = await this.repo.saveAuthorization({ amount, fee: fee.amount, currency });

    // 응답 매핑
    return { approved: true as const, id: saved.id, total: amount + fee.amount, currency };
  }
}
```

```ts
// app/PaymentService.spec.ts — Given/When/Then 스타일
import { PaymentService, PaymentRepo } from './PaymentService';

describe('Payment authorization', () => {
  test('Given valid amount within limit, When authorize, Then it approves and returns total with fee', async () => {
    // Given
    const repo: PaymentRepo = {
      saveAuthorization: jest.fn().mockResolvedValue({ id: 'auth_123' }),
    };
    const service = new PaymentService(repo, /* limit */ 100_000);

    // When
    const result = await service.authorize(10_000, 'KRW');

    // Then
    expect(result.approved).toBe(true);
    expect(result.id).toBe('auth_123');
    // KRW fee = 3% → 300
    expect(result.total).toBe(10_000 + 300);
    expect(repo.saveAuthorization).toHaveBeenCalledWith({ amount: 10_000, fee: 300, currency: 'KRW' });
  });

  test('Given amount exceeds limit, When authorize, Then it denies without saving', async () => {
    // Given
    const repo: PaymentRepo = {
      saveAuthorization: jest.fn(),
    };
    const service = new PaymentService(repo, 50_000);

    // When
    const result = await service.authorize(60_000, 'KRW');

    // Then
    expect(result.approved).toBe(false);
    expect(result).toEqual({ approved: false, reason: 'LIMIT_EXCEEDED' });
    expect(repo.saveAuthorization).not.toHaveBeenCalled();
  });
});
```

---

# “보통 TS에서 클래스가 일반적?” — 짧은 판단 가이드

* **백엔드 프레임워크(NestJS 등)**: DI/데코레이터 기반이라 **클래스 중심**이 자연스럽습니다(서비스, 리포지토리, 컨트롤러).
* **도메인 규칙/계산/검증**: **클래스에 묶을 필요 없음**. 부작용 없는 **순수 함수**로 두면 테스트와 재사용이 좋아집니다.
* **프런트/유틸 연산, 데이터 변환**: 함수형으로 모듈화가 간결합니다.
* 결론: **오케스트레이션/상태·리소스 경계**는 클래스(서비스, 어댑터), **핵심 규칙/계산**은 함수—이 혼합이 실무에서 가장 깔끔합니다.

---

# “함수형으로 분리”의 의미

* **클래스 안의 메서드로 만들자는 뜻이 아님**.
* I/O(네트워크/DB/시간)에 의존하지 않는 **순수 함수**로 도메인 규칙·계산·검증을 **클래스 밖 독립 모듈**에 두자는 뜻입니다.
* 이렇게 하면

  * 테스트: 인자 → 결과만 검증 (Mock 최소화)
  * 재사용: 다른 서비스에서도 쉽게 사용
  * 리팩토링: 호출부만 바꿔도 규칙은 그대로 유지

> 필요한 경우 “값 객체(Value Object)”로 캡슐화(예: `Money`, `Email`)하는 건 좋습니다. 그래도 그 내부 로직은 가능하면 순수하게 유지하세요.

---

# utils vs 서비스/도메인 근처에 두기?

**원칙: “가능한 한 가까운 곳에(co-locate), 범용이면 나중에 올려라.”**

* **도메인 전용 규칙/계산/검증**:
  `features/payments/domain/*` 같은 **도메인 폴더**에 둡니다.
  예:

  ```
  /features/payments/
    app/PaymentService.ts          // 오케스트레이션(클래스)
    domain/calculateFee.ts         // 순수 함수
    domain/rules.ts                // 순수 함수(한도, 리스크)
    domain/types.ts                // Money, PaymentMethod 등
    infra/PaymentRepoPrisma.ts     // DB 어댑터
  ```
* **여러 도메인에서 반복되는 로직이 실제로 발생**할 때만

  * **공용 라이브러리 레벨**로 승격: `shared/validation/*`, `shared/money/*`
  * 이름은 `utils`처럼 포괄적으로 두지 말고 **의미 있는 네이밍**을 사용하세요(예: `shared/validation/isEmail.ts`).
* **안티패턴**: 처음부터 `utils/`에 마구 담기. (의존 방향·경계가 모호해지고 순환 참조·암묵적 Coupling이 늘어납니다.)

### 빠른 결정 체크리스트

* **이 함수가 결제 이외에 쓰일 가능성 ≥ 2곳?** → `shared/*` 후보
* **결제 도메인의 용어/규칙을 직접 참조?** → `features/payments/domain/*` 고정
* **DB·네트워크 접근?** → 도메인 함수가 아니라 **앱/인프라 레이어**로

---

# 요약

* 타이틀은 **“입력 → 도메인 → 영속 → 응답의 일관된 처리 파이프라인”**처럼 더 추상화하세요.
* TDD에서는 그 파이프라인 각 단계가 테스트 단위가 됩니다(작고 빠른 테스트).
* TS에서는 **서비스=클래스**, **규칙/계산/검증=순수 함수**로 분리하는 혼합 전략이 실무 친화적.
* 함수는 **도메인 폴더에 먼저 공존**시키고, **중복이 명확해지면** `shared/`로 올리세요. `utils/` 남발은 지양!

필요하시면 위 구조를 NestJS/Express/Next.js 각각에 맞춘 폴더 템플릿으로도 바로 정리해드릴게요.
