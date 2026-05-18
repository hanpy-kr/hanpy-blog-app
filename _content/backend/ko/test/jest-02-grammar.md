---
deployment: false
category: Backend
title: 'Unit Test(단위 테스트) - Jest 기초 정리'
summary: 'Jest로 단위테스트(Unit Test)를 하는 방법에 대해 알아 봅시다.'
lng: KOR
pageKey: unit_test_typescript_ko
publishedAt: 2024-10-10
---

# Unit Test(단위 테스트)

단위 테스트는 애플리케이션을 구성하는 하나의 기능이 올바르게 작동하는지를 독립적으로 테스트하는 것을 의미합니다. 개발자는 코드를 개발한 후에 함수나 모듈 단위로 테스트를 합니다. 이는 초기 단계에서 버그가 식별할 수 있기 때문에 버그 수정 비용을 절약하는 것이 가능합니다.

## Jest

> 기본적으로 Jest 문법에 대해 알아 봅시다.

### describe()

<br />

```typescript
describe('MyInitCode', () => {
  // ... 여기에 MyInitCode 관련 테스트 케이스를 작성 ...
})
```

<br />

- 테스트 케이스들을 그룹화하는데 사용됩니다.
- 첫 인자는 테스트 그룹의 명칭을 나타냅니다.
- 두 번째 인자에는 그룹안에서 실행될 테스트 케이스를 정의한 함수를 받습니다.

### it() test()

```typescript
it('should call the service method once', () => {
  // ... 여기에 해당 테스트 케이스를 검증하는 로직 작성 ...
})
```

<br />

```typescript
test('should call the service method once', () => {
  // ... 여기에 해당 테스트 케이스를 검증하는 로직 작성 ...
})
```

- it과 test는 동일한 기능을 수행하며 스타일의 차이가 있습니다.
- 실제 사용되는 테스트 케이스를 정의합니다.
- 첫 번째 인자로 해당 테스트 케이스에 대한 설명을 나타냅니다.
- 두 번째 인자에 테스트할 함수를 적어줍니다.

### beforeEach()

<br />

```typescript
beforeEach(() => {
  // ... 테스트 케이스 실행 전에 초기화 작업을 수행 ...
})
```

<br />

- 각 테스트 케이스가 실행되지 전 실행되는 함수를 정의합니다.

### afterEach()

각 테스트 케이스가 종료된 후 실행되는 함수를 정의합니다.

<br />

```typescript
afterEach(() => {
  // ... 테스트 케이스 실행 후 정리 작업을 수행 ...
})
```

<br />

### expect()

테스트 대상 값을 전달하며, 아래의 매처(matcher) 함수를 포함합니다.

<br />

- toBe()
- toEqual()
- toHaveLength()
- toContain()
- toBeTruthy()
- toBeFalsy()
- toBeGreaterThan()

## Jest 익숙해지기

### 예제 1. 시작해보기

#### 1.1. 숫자를 더하는 함수를 하나 만들어 봅시다. (sum.js)

<br />

```javascript
function sum(a, b) {
  return a + b
}
module.exports = sum
```

<br />

#### 1.2. 위 함수를 테스트하는 함수를 만들어 봅시다. (sum.test.js)

<br />

```javascript
const sum = require('./sum')
test('', () => {})
```

<br />

#### 1.3. 테스트 실행 시 결과값

```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

#### 1.4. Jest global API 사용하기

<br />

```javascript
// sum.test.ts
import { describe, expect, test } from '@jest/globals'
import { sum } from './sum'

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

<br />

### 예제 2. Matcher 사용해보기

Matcher를 사용하면 다양한 방법으로 테스트가 가능합니다. Jest 실행 시 실패한 모든 matcher를 추적하여 프린트 합니다.

#### 2.1. toBe

`toBe`는 객체나 원시 값을 엄격한 동등성 검사를 통해 비교합니다. 예상 값과 실제 값이 일치해야 테스트를 통과합니다.

<br />

```typescript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
```

<br />

- `expect(2+2)`는 단순하게 객체 결과를 반환합니다.
- 이 코드에서의 matcher는 `.toBe(4)` 입니다.

##### `not`

`not`을 사용하면 matcher에 반대되는 값을 테스트 할 수 있습니다.

```typescript
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0)
    }
  }
})
```

#### 2.1. toEqual

`toEqual`은 객체 또는 배열의 속성 값들을 비교하여, 값이 일치하는 경우에 테스트를 통과하게 됩니다. 이는 `객체 내부 구조 와 속성 데이터 비교`에 적합힙니다. 이는 객체나 배열을 재귀적(recursively)으로 체크한다는 표현과 동일합니다.

<br />

```javascript
test('object assignment', () => {
  const data = { one: 1 }
  data['two'] = 2
  expect(data).toEqual({ one: 1, two: 2 })
})
```

<br />

toBe와 toEqual은 동등성 비교 메서드로 동일합니다. `toEqual`은 객체나 배열과 같은 복잡한 구조를 비교하고자 할 때 사용하며, `toBe`는 단순한 값의 동일성을 비교할 때 사용할 수 있습니다.

- TIP : toEqual은 undefined 속성이 무시 됩니다. 배열에 포함된 undefined나 객체 유형까지 체크하려면, `toStrictEqual`의 사용도 고려할 필요가 있습니다.

#### 2.2. not

`not`을 사용하면, matcher의 반대의 경우도 테스트가 가능합니다.

<br />

```javascript
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0)
    }
  }
})
```

<br />

#### 2.3. undefined, null, false

테스트 시 `undefined`, `null`과 `false`를 구별하거나, 구별하지 않기를 원하는 경우가 있습니다. 이러한 요구사항을 matcher를 통해 해결할 수 있습니다.

- `toBeNull` : only `null`
- `toBeUndefined` : only `undefined`
- `toBeDefined` : the opposite of `toBeUndefined`
- `toBeTruthy` : anything that an if statement treats as true
- `toBeFalsy` : anything that an if statement treats as false

<br />

```javascript
test('null', () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test('zero', () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})
```

<br />

위의 특성을 이해하고, 필요에 따라 적절한 matcher를 사용하면 됩니다.

#### 2.4. Numbers

숫자를 비교하는 Matcher은 아래와 같습니다.

<br />

```javascript
test('two plus two', () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4)
  expect(value).toEqual(4)
})
```

<br />

`toEqual`은 매우작은 반올림 오차에 따라 잘못된 결과값을 도출 할 수도 있습니다. 소수의 경우에는 `toEqual` 대신에 `toBeCloseTo`를 사용합니다.

<br />

```javascript
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3) // This works.
})
```

<br />

#### 2.5. Strings

string의 경우에는 toMatch를 사용하여 정규식을 사용 할 수있습니다.

<br />

```javascript
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/)
})

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/)
})
```

<br />

#### 2.6. Arrays and iterables

`toContain`을 활용하면, array나 iterable에 포함된 요소를 확인 할 수 있습니다.

<br />

```javascript
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
]

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk')
  expect(new Set(shoppingList)).toContain('milk')
})
```

<br />

#### 2.7. Exceptions

`toThrow`를 활용하면, 특정 함수가 Error를 전지는 것에 대하여 테스트하는 것이 가능합니다.

<br />

```javascript
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!')
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow()
  expect(() => compileAndroidCode()).toThrow(Error)

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK')
  expect(() => compileAndroidCode()).toThrow(/JDK/)

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/) // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/) // Test pass
})
```

<br />

### 예제 3. Asynchronous Code

#### 3.1. Promise

Jest에서 Promise가 반환되면, 작업이 완료 될 때까지 기다리게 됩니다. 이 때 Promise가 rejected가 반환되면 테스트는 Fail이 됩니다.

<br />

```javascript
test('the data is peanut butter', () => {
  return fetchData().then((data) => {
    expect(data).toBe('peanut butter')
  })
})
```

<br />

위의 예시는 peaunt butter string을 return하면 테스트가 성공입니다.

#### 3.2. Async/Await

Promise 대신에 Async/Await를 사용하는 것도 가능합니다.

```javascript
test('the data is peanut butter', async () => {
  const data = await fetchData()
  expect(data).toBe('peanut butter')
})

test('the fetch fails with an error', async () => {
  expect.assertions(1)
  try {
    await fetchData()
  } catch (error) {
    expect(error).toMatch('error')
  }
})
```

<br />

- 위 코드는 비동기 호출을 테스트 하는 방식으로 결과 값이 peanut butter이면 성공입니다.
- expect.assertions(1) 는 expect가 한번 호출되어야한 다는 것을 명시하는 것으로, try/catch 에러를 잡는 구조에서 사용됩니다.
- try에서 fetchData를 호출 시 에러가 발생하면 catch로 넘어가며, 에러메시지를 expect로 검증하게 됩니다.

<br />

```javascript
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter')
})

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error')
})
```

<br />

- `expect(fetchData())`는 반환된 Promise를 직접 테스트하는 방법 입니다.
- `expect(fetchData()).resolves`는 resolved의 결과 값이 peanut butter인지를 검증합니다.
- `rejects.toMatch('error')`는 에러 메시지가 error와 일치하는지 확인합니다.
- 위와 같이 try/catch 없이도 Jest의 내장 메서드로 비동기 테스트가 가능합니다.
- 이는 Async/Await의 첫 번째 예시와 동일합니다.

당연한 이야기지만, async/await를 생략하면 promise를 반환하기전에 테스트가 종료 됩니다.

<br />

```javascript
test('the fetch fails with an error', () => {
  expect.assertions(1)
  return fetchData().catch((error) => expect(error).toMatch('error'))
})
```

<br />

- promise가 rejected되는 테스트인 경우에 catch를 사용합니다.
- `expect.assertions(1)`를 사용하여 추가적인 assertion이 발생하지 않는지 확인합니다.
- fetchData가 반환한 Promise에서 catch로 에러를 잡고, 에러 메시지를 검증합니다.
- 이 방식은 비동기 호출이 완료될 때까지 Jest가 테스트를 기다릴 수 있도록 return을 사용합니다.

위 3개의 await/async 방식을 비교해봅시다. 2번 방식이 Jest에서 추천되는 최신 스타일로, 코드가 간결하고 읽기 쉽습니다. 하지만, 1번은 에러 처리 흐름을 명시적으로 제어해야 하는 상황에서 유용하며, 3번은 오래된 스타일로, 최신 프로젝트에서는 잘 사용되지 않습니다.

#### 3.3. Callbacks

일반적인 callback 테스트는 Jest에서 작동되지 않습니다. `done`이라는 단일인자를 사용하여 Callback 테스트를 해야합니다. `done`이 실행되면 테스트가 끝나고, 실행되지 않는다면, Timeout error가 발생합니다.

<br />

```javascript
test('the data is peanut butter', (done) => {
  function callback(error, data) {
    if (error) {
      done(error)
      return
    }
    try {
      expect(data).toBe('peanut butter')
      done()
    } catch (error) {
      done(error)
    }
  }

  fetchData(callback)
})
```

<br />

- 위 코드 기준으로 expect에서 fail이 되면, 바로 아래 코드에서 `done()`은 실행되지 않습니다. 따라서 테스트를 확인하려면 expect를 try/catch로 내부에서 done을 실행할 수 있도록 해야합니다.
- jest에서는 메모리 누수 방지를 위해 done을 콜백으로 전달받아 promise를 반환하면 오류가 발생하니 주의합시다.

---

## Mock Functions (Mocking)

Unit Test에서는 실제 DB, API, 외부 서비스에 의존하지 않고 **테스트 대상 로직만 검증**하는 것이 중요합니다.
하지만 실제 구현을 그대로 호출하면 테스트가 느려지거나, 외부 환경에 따라 결과가 달라질 수 있습니다.

이때 Jest의 **Mock 기능**을 사용하면 함수의 실제 구현을 실행하지 않고,
**의도한 결과만 반환하도록 설정**하여 테스트를 독립적이고 안정적으로 만들 수 있습니다.

### mockResolvedValue / mockRejectedValue

`mockResolvedValue`와 `mockRejectedValue`는 **Promise를 반환하는 비동기 함수**를 mocking할 때 사용됩니다.
주로 Service, Repository, 외부 API 호출과 같은 비동기 로직을 테스트할 때 활용됩니다.

* `mockResolvedValue` : Promise가 **성공(resolve)** 했을 때의 값을 지정
* `mockRejectedValue` : Promise가 **실패(reject)** 했을 때의 에러를 지정

이를 통해 실제 비동기 로직을 실행하지 않고도 **성공/실패 케이스를 각각 테스트**할 수 있습니다.

### mockResolvedValue

비동기 함수가 **정상적으로 값을 반환한 것처럼** 동작하게 만듭니다.

```typescript
jest.spyOn(userService, 'findUser')
  .mockResolvedValue({ id: 1, name: 'Tom' })
```

위 코드에서:

* `findUser`의 실제 구현은 실행되지 않습니다.
* `findUser()`를 호출하면 항상
  `Promise.resolve({ id: 1, name: 'Tom' })` 이 반환됩니다.
* DB 조회나 외부 호출 없이도 성공 케이스를 테스트할 수 있습니다.

```typescript
test('유저 정보를 정상적으로 반환한다', async () => {
  const user = await userService.findUser(1)
  expect(user.name).toBe('Tom')
})
```

이처럼 `mockResolvedValue`를 사용하면 **비즈니스 로직에만 집중한 테스트**가 가능합니다.

### mockRejectedValue

비동기 함수가 **에러를 발생시킨 것처럼** 테스트할 때 사용합니다.
예외 처리 로직이나 실패 시 동작을 검증할 때 유용합니다.

```typescript
jest.spyOn(userService, 'findUser')
  .mockRejectedValue(new Error('User not found'))
```

```typescript
test('유저가 존재하지 않으면 에러를 반환한다', async () => {
  await expect(userService.findUser(1))
    .rejects
    .toThrow('User not found')
})
```

이를 통해 try/catch 로직이나 에러 메시지 검증을 명확하게 테스트할 수 있습니다.

### mockResolvedValue vs mockReturnValue

`mockReturnValue`는 **동기 함수**에 사용되며, 반환 값을 그대로 리턴합니다.
Promise를 자동으로 생성하지는 않습니다.

```typescript
mockReturnValue(value)
// value를 그대로 반환

mockResolvedValue(value)
// Promise.resolve(value)를 반환
```

따라서 `async / await` 또는 Promise를 반환하는 함수에서는
`mockResolvedValue`를 사용하는 것이 올바른 선택입니다.

### jest.spyOn vs jest.fn()

Mock를 만들 때는 상황에 따라 `jest.spyOn`과 `jest.fn()`을 구분해서 사용합니다.

| 구분    | jest.spyOn            | jest.fn()   |
| ----- | --------------------- | ----------- |
| 대상    | 기존 객체의 메서드            | 새 mock 함수   |
| 원본 함수 | 존재함                   | 없음          |
| 기본 동작 | 원본 실행                 | 아무 동작 없음    |
| 주 용도  | 메서드 호출 감시, 부분 mocking | 의존성/콜백 mock |

* **이미 존재하는 메서드의 동작이나 반환값을 제어**하고 싶다면 `jest.spyOn`
* **완전히 가짜 함수나 의존성을 만들어야 한다면** `jest.fn()`을 사용합니다.

## reference

- https://jestjs.io/docs/getting-started

https://yuna-story.tistory.com/142
https://jestjs.io/docs/using-matchers
