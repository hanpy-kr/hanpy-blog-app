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


# Jest


# Jest 기본 구조: `describe` / `it` / `expect`

## 1. describe

```ts
describe('UserService', () => { ... });
```

* **테스트 묶음(그룹)**을 만드는 함수입니다.
* 보통 **테스트 대상 클래스나 모듈 이름**으로 감싸서, 어떤 기능을 검증하는지 논리적으로 구분합니다.
* 예를 들어 `UserService` 관련 테스트들을 한 그룹으로 묶는 역할.

📌 예시 출력:

```
UserService
  ✓ 회원 가입 시 유효한 ID가 반환된다
```

---

## 2️. it

```ts
it('회원 가입 시 유효한 ID가 반환된다', () => { ... });
```

* 실제 **테스트 케이스 하나를 정의**하는 부분입니다.
* 사람이 읽을 수 있는 문장처럼 작성하는 게 관례입니다.
* “이 기능이 이렇게 동작해야 한다”를 설명하는 자연어 문장이라고 생각하면 됩니다.

즉,

> “UserService의 회원가입 기능을 실행했을 때, 유효한 ID가 반환되어야 한다”

를 코드로 표현한 거예요.

---

## 3 expect(...) 구문들

Jest에서 `expect`는 결과를 검증(Assertion) 하는 함수입니다. 테스트 대상 코드가 예상대로 동작했는지를 확인합니다.

### 기본 값 비교

| 구문                | 설명                                     | 예시                                             |
| ----------------- | -------------------------------------- | ---------------------------------------------- |
| `toBe(value)`     | 원시값(숫자, 문자열, 불리언 등)이 정확히 일치하는지 (`===`) | `expect(a).toBe(3)`                            |
| `toEqual(obj)`    | 객체나 배열의 값이 동일한지 (깊은 비교)                | `expect(user).toEqual({ id: 1, name: 'Tom' })` |
| `toBeTruthy()`    | 값이 truthy(참처럼 평가)인지                    | `expect(result).toBeTruthy()`                  |
| `toBeFalsy()`     | 값이 falsy(거짓처럼 평가)인지                    | `expect(flag).toBeFalsy()`                     |
| `toBeNull()`      | 값이 `null`인지                            | `expect(value).toBeNull()`                     |
| `toBeUndefined()` | 값이 `undefined`인지                       | `expect(result).toBeUndefined()`               |


### 숫자 비교

| 구문                          | 설명         | 예시                                        |
| --------------------------- | ---------- | ----------------------------------------- |
| `toBeGreaterThan(n)`        | 값이 n보다 큰지  | `expect(score).toBeGreaterThan(0)`        |
| `toBeGreaterThanOrEqual(n)` | n 이상인지     | `expect(count).toBeGreaterThanOrEqual(1)` |
| `toBeLessThan(n)`           | 값이 n보다 작은지 | `expect(age).toBeLessThan(100)`           |
| `toBeLessThanOrEqual(n)`    | n 이하인지     | `expect(time).toBeLessThanOrEqual(10)`    |


### 객체 & 배열 비교

| 구문                                      | 설명                        | 예시                                                             |
| --------------------------------------- | ------------------------- | -------------------------------------------------------------- |
| `toContain(item)`                       | 배열/문자열이 특정 요소를 포함하는지      | `expect(list).toContain('apple')`                              |
| `toHaveLength(n)`                       | 배열·문자열의 길이가 n인지           | `expect(items).toHaveLength(3)`                                |
| `toHaveProperty(key, value?)`           | 객체에 특정 프로퍼티가 존재하는지        | `expect(user).toHaveProperty('id')`                            |
| `toEqual(expect.objectContaining(obj))` | 객체가 특정 속성들을 포함하는지 (부분 비교) | `expect(user).toEqual(expect.objectContaining({ id: 1 }))`     |
| `toEqual(expect.arrayContaining(arr))`  | 배열이 특정 요소들을 포함하는지 (부분 비교) | `expect(tags).toEqual(expect.arrayContaining(['hot', 'new']))` |
| `toBeInstanceOf(Class)`                 | 특정 클래스의 인스턴스인지            | `expect(user).toBeInstanceOf(User)`                            |


### 문자열 & 예외 비교

| 구문                    | 설명                 | 예시                                           |
| --------------------- | ------------------ | -------------------------------------------- |
| `toMatch(regex)`      | 문자열이 정규식 패턴과 일치하는지 | `expect(email).toMatch(/@/)`                 |
| `toThrow()`           | 함수가 예외를 던지는지       | `expect(() => fn()).toThrow()`               |
| `toThrowError('msg')` | 특정 에러 메시지가 발생하는지   | `expect(() => fn()).toThrowError('Invalid')` |


### Mock 함수 검증

| 구문                              | 설명                     | 예시                                            |
| ------------------------------- | ---------------------- | --------------------------------------------- |
| `toHaveBeenCalled()`            | Mock 함수가 호출되었는지        | `expect(mockFn).toHaveBeenCalled()`           |
| `toHaveBeenCalledTimes(n)`      | Mock 함수가 n번 호출되었는지     | `expect(mockFn).toHaveBeenCalledTimes(1)`     |
| `toHaveBeenCalledWith(...args)` | Mock 함수가 특정 인자로 호출되었는지 | `expect(mockFn).toHaveBeenCalledWith('a', 1)` |
| `toHaveReturned()`              | 함수가 반환을 완료했는지          | `expect(mockFn).toHaveReturned()`             |
| `toHaveReturnedWith(value)`     | 함수가 특정 값을 반환했는지        | `expect(mockFn).toHaveReturnedWith(42)`       |

---

### 참고
- `toBe` vs `toEqual`
  - `toBe`: 원시값 비교 (`===`)
  - `toEqual`: 객체/배열 구조 비교 (깊은 비교)
expect.objectContaining()
부분 일치(Partial Match)에 유용합니다.
Mock 함수 관련 매처는 Jest의 jest.fn() 또는 jest.mock()으로 만든 함수에서만 동작합니다.

---