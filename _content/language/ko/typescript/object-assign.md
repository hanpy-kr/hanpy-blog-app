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
