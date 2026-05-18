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


```typescript
export class Subscription {
  _id: ObjectId // Subscription ID (고유 값)
  userId: ObjectId // 사용자 ID
  planId: ObjectId // 가입한 플랜 ID
  scopeType: UserScope // 가입된 그룹
  scopeId: ObjectId // 그룹 ID
  startDate: Date // 구독 시작 날짜
  endDate: Date // 구독 종료 날짜
  status: SubscriptionStatus // 구독 상태
  autoRenew: boolean // 자동 갱신 여부
  createdAt: Date // 생성일
  updatedAt: Date // 수정일
  constructor(param: SubscriptionSchemaType) {
    Object.assign(this, param)
  }
}
```
