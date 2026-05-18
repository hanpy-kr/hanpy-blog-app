---
deployment: false
category: Backend
title: 'ULID로 고유 식별자 생성하기 (Node.js 활용법)'
summary: 'UUID의 단점을 보완한 ULID(Universally Unique Lexicographically Sortable Identifier)의 개념과 실무 활용법을 Node.js 코드 예제와 함께 알아봅니다.'
pageKey: ulid\_guide
lng: KOR
publishedAt: 2025-04-17
tags: [Node.js, ULID, 식별자 생성, Backend]
---

# ULID로 고유 식별자 생성하기 (Node.js 활용법)

서비스를 개발하다 보면 데이터베이스의 각 객체에 고유한 식별자를 부여해야 할 상황이 자주 발생합니다. 전통적으로는 UUID가 널리 사용되지만, 정렬 불가능성과 낮은 인덱스 성능, 가독성 부족 등 여러 단점이 존재합니다. 이 문제를 해결하고자 등장한 것이 **ULID**(Universally Unique Lexicographically Sortable Identifier)입니다.

이 글에서는 ULID의 개념, 장단점, UUID와의 차이점, 그리고 Node.js 환경에서의 적용 방법을 실무 중심으로 정리합니다. 특히 MongoDB와 같이 문서 기반 데이터베이스에서 어떻게 효율적으로 활용할 수 있는지도 예제를 통해 함께 살펴보겠습니다.

---

## ULID란 무엇인가요?

ULID는 128비트 고유 식별자로, UUID와 동일한 유일성을 보장하면서도 여러 실용적인 장점을 제공합니다.

- **정렬 가능성 (Lexicographical Sortability)**: ULID는 생성 시간 기준으로 정렬이 가능하여 데이터의 순차 정렬 및 검색 성능을 향상시킵니다.
- **시간 기반 구조**: 상위 비트에 타임스탬프(48비트), 하위 비트에 무작위값(80비트)을 포함하여 유일성과 시간 기반 정렬을 동시에 달성합니다.
- **가독성 좋은 Base32 포맷**: ULID는 대소문자 혼동을 방지한 Crockford Base32를 사용하여 URL에 포함시키거나 CLI에서 확인하기에도 적합합니다.



예시 ULID: <codeline>01F8MECHZX3TBDSZ7XRADM79XV</codeline>



이러한 구조 덕분에 ULID는 로그, 이벤트 ID, 사용자 ID 등 다양한 영역에서 시간순 정렬이 중요한 상황에 유리합니다.

---

## UUID vs ULID: 무엇이 더 실무에 적합할까?

| 비교 항목           | UUID | ULID |
| ------------------- | ---- | ---- |
| 고유성 보장         | O    | O    |
| 생성 시간 기반 정렬 | X    | O    |
| DB 인덱스 성능      | 낮음 | 높음 |
| 문자열 가독성       | 낮음 | 높음 |
| URL/CLI 친화도      | 낮음 | 높음 |
| 타임스탬프 포함     | X    | O    |

UUID는 전통적이고 범용적인 식별자지만, 랜덤성 위주의 구조 때문에 시간 순 정렬이 불가능하고, MongoDB 등의 인덱싱에서 성능 저하를 유발할 수 있습니다. ULID는 이러한 단점을 보완하며, 특히 로그 수집 시스템이나 메시지 큐 등에서 시간 기반 정렬이 필요할 때 더 효과적입니다.

---

## Node.js에서 ULID 생성하기

Node.js에서는 <codeline>ulid</codeline> 패키지를 통해 손쉽게 ULID를 생성할 수 있습니다.

### 1. 패키지 설치

```bash
npm install ulid
```

### 2. 기본 생성 예시

```javascript
const { ulid } = require('ulid')

const id = ulid()
console.log(id) // 예: 01F8MECHZX3TBDSZ7XRADM79XV
```

### 3. 특정 시간 기반 생성

```javascript
const { ulid } = require('ulid')

const timestamp = Date.now()
const id = ulid(timestamp)
console.log(id) // 예: 과거 타임스탬프 기반 ULID
```

이처럼 <codeline>ulid(timestamp)</codeline> 형식은 과거 데이터 마이그레이션 또는 테스트 시 유용하게 활용됩니다.

---

## MongoDB에서 ULID 활용하기

MongoDB의 기본 <codeline>\_id</codeline> 필드는 ObjectId를 사용하지만, 이를 ULID로 대체하면 다음과 같은 이점이 있습니다:

- 데이터가 생성 순서대로 정렬되므로 인덱스의 효율이 높아집니다.
- 문자열 기반이기 때문에 클라이언트와 API 간 전송 시 유연성이 증가합니다.

```javascript
const mongoose = require('mongoose')
const { ulid } = require('ulid')

const schema = new mongoose.Schema({
  _id: { type: String, default: ulid },
  name: String,
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model('User', schema)
```

위 예제처럼 <codeline>\_id</codeline>를 ULID로 설정하면 자동 정렬이 가능하고, ObjectId의 복잡한 해석 없이도 시간 기반 처리가 직관적으로 이루어집니다.

---

## 실무에서 ULID 사용 시 유의할 점

- **정확한 시스템 시간 유지**: ULID는 타임스탬프 기반이기 때문에 시스템 시간이 오차나 역행할 경우 ID 충돌 가능성이 생길 수 있습니다.
- **분산 시스템에서의 시간 동기화**: 여러 노드가 동시에 ULID를 생성하는 구조라면 NTP 설정 등을 통해 타임 드리프트를 방지해야 합니다.
- **초당 대량 생성에 대비한 충돌 회피 전략**: ULID의 랜덤성은 매우 강력하지만, 초당 수만 건 이상의 생성이 필요한 경우 샤딩 키나 프리픽스를 결합하는 구조도 고려해야 합니다.

---

## ULID 활용 사례

- **로그 추적 ID**: 로그를 시간순으로 정렬 및 검색 가능하게 함
- **사용자 ID**: 가입 순서에 따른 정렬 및 세션 추적에 유리
- **파일명 및 경로**: 깔끔하고 추적 가능한 URL 구조 생성
- **트랜잭션/이벤트 ID**: 대규모 이벤트 흐름의 디버깅 및 분석 용이

ULID는 특히 이벤트 소싱, 데이터 스트리밍, 백엔드 API 설계 등에서 자연스럽게 녹여 쓸 수 있습니다.

---

## 마무리

ULID는 단순한 식별자 생성 도구가 아닙니다. 고유성과 정렬 가능성을 동시에 제공함으로써 시스템 설계 전반의 효율성을 높일 수 있는 실용적인 기술입니다. 특히 MongoDB와 같은 NoSQL 환경, 이벤트 기반 마이크로서비스 구조, 로그 기반 분석 시스템에서 UUID보다 훨씬 탁월한 선택이 될 수 있습니다.

Node.js에서는 <codeline>ulid</codeline> 패키지 하나로 바로 적용 가능하며, 기존 UUID 기반 구조에서 점진적으로 도입할 수도 있습니다. 이제는 UUID의 단점을 극복하고 ULID로 더 나은 데이터 흐름과 성능을 경험해보세요.

---

## 참고 문서

- [ULID GitHub 저장소](https://github.com/ulid/spec)
- [npm - ulid](https://www.npmjs.com/package/ulid)
- [MongoDB ObjectId 공식 문서](https://www.mongodb.com/docs/manual/reference/method/ObjectId/)
- [ULID vs UUID 성능 비교](https://www.linkedin.com/pulse/ulid-vs-uuid-which-one-use-your-database-kishore-bysani/)
