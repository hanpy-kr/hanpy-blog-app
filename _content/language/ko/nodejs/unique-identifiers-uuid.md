---
deployment: false
category: Backend
title: 'UUID로 유일한 파일명 만들기 (Node.js 파일 업로드 전략)'
summary: 'Node.js에서 UUID를 활용해 파일명을 안전하게 고유화하고, 파일명 충돌을 방지하는 전략을 실전 예제와 함께 알아봅니다.'
pageKey: uuid\_filename\_unique\_guide
lng: KOR
publishedAt: 2025-04-17
tags: [Node.js, UUID, 파일명 충돌 방지, 파일 업로드, Backend]
---

# UUID로 유일한 파일명 만들기 (Node.js 파일 업로드 전략)

사용자가 웹 서비스를 통해 파일을 업로드할 때, 같은 이름의 파일을 여러 번 올리면 기존 파일이 덮어써지거나 충돌 문제가 생길 수 있습니다. 이 문제를 해결하는 가장 직관적인 방법은 파일명을 **UUID(범용 고유 식별자)** 기반으로 저장하는 것입니다.

이번 글에서는 UUID란 무엇인지, 어떻게 Node.js 환경에서 파일명을 UUID로 변환하는지, 그리고 실제 업로드 처리 시 어떻게 적용하는지 자세히 살펴보겠습니다.

---

## UUID란?

UUID는 "Universally Unique Identifier"의 약자로, **전 세계적으로 유일한 문자열을 자동으로 생성**하는 규칙입니다. 대부분의 경우 **UUID v4** 버전이 사용되며, 랜덤 기반으로 만들어집니다.

예시 UUID: <codeline>f47ac10b-58cc-4372-a567-0e02b2c3d479</codeline>

이러한 식별자는 충돌 가능성이 거의 없기 때문에 **파일, 세션, 사용자 ID, DB 키 등 유일성이 필요한 곳에서 매우 널리 사용**됩니다.

---

## Node.js에서 UUID 생성하기

Node.js에서는 [`uuid`](https://www.npmjs.com/package/uuid) 패키지를 통해 UUID를 손쉽게 생성할 수 있습니다.

### 설치

```bash
npm install uuid
```

### 사용 예제

```js
const { v4: uuidv4 } = require('uuid')

const id = uuidv4()
console.log(id) // 예: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

---

## UUID를 활용한 파일명 생성

업로드되는 파일의 원래 이름은 사용자에 따라 중복될 수 있으므로, 파일의 **확장자는 유지하면서** 이름만 UUID로 대체하는 것이 일반적인 방법입니다.

```js
const path = require('path')
const { v4: uuidv4 } = require('uuid')

function createUUIDFilename(originalName) {
  const ext = path.extname(originalName) // ex) '.jpg', '.pdf'
  const uuid = uuidv4()
  return `${uuid}${ext}`
}

console.log(createUUIDFilename('photo.jpg')) // f47ac10b-...jpg
```

---

## multer와 함께 적용하는 실전 예제

파일 업로드를 처리하는 대표적인 미들웨어인 `multer`를 사용할 경우, UUID 파일명을 자동으로 설정하려면 아래처럼 작성합니다.

```js
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) // 파일 확장자 유지
    const uuid = uuidv4()
    const uniqueName = `${uuid}${ext}`
    cb(null, uniqueName) // 고유한 파일명으로 저장
  },
})

const upload = multer({ storage })
```

이 설정을 통해 사용자가 어떤 이름으로 업로드하든 간에 서버에 저장되는 파일명은 항상 고유한 UUID로 변경됩니다. 예를 들어 `resume.pdf`라는 이름으로 업로드해도 서버에는 `d8e6f...fa7b.pdf`처럼 저장됩니다.

---

## 마무리

UUID를 기반으로 파일명을 설정하면 다음과 같은 장점이 있습니다:

- **파일명 충돌을 방지**하여 안정적인 파일 업로드 환경을 구성할 수 있음
- **원본 파일명을 노출하지 않아 보안성을 높일 수 있음**
- **속도와 효율성 모두 뛰어난 고유 식별자 생성 방식**

간단한 구현만으로도 서버 파일 저장의 안정성과 확장성을 확보할 수 있으므로, 업로드 기능이 필요한 서비스에서는 UUID 전략을 적극 고려해볼 수 있습니다.

---

## 참고 문서

- [uuid NPM 패키지](https://www.npmjs.com/package/uuid)
- [UUID 명세 (RFC 4122)](https://datatracker.ietf.org/doc/html/rfc4122)
