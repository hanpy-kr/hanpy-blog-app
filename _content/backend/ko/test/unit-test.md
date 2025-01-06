---
deployment: true
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

### 3. Asynchronous Code

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

## reference

- https://jestjs.io/docs/getting-started

https://yuna-story.tistory.com/142
https://jestjs.io/docs/using-matchers
