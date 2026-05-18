---
deployment: false
category: Backend
title: 'SHA-256 해시로 안전한 파일명 만들기 (Node.js 고유 파일명 전략)'
summary: 'SHA-256 해시를 활용해 업로드 파일의 유일성과 보안성을 확보하는 방법을 Node.js로 구현하는 실전 예제와 함께 알아봅니다.'
pageKey: sha256\_filename\_unique\_guide
lng: KOR
publishedAt: 2025-04-17
tags: [Node.js, SHA-256, 해시, 파일명 충돌 방지, 보안, Backend]
---

# SHA-256 해시로 안전한 파일명 만들기 (Node.js 고유 파일명 전략)

파일 업로드 시스템에서 가장 중요한 요소 중 하나는 **파일명 유일성**입니다. 특히, 보안과 데이터 무결성을 강화해야 하는 환경에서는 단순히 중복만 방지하는 것을 넘어, 예측이 어려운 파일명 구조가 필요합니다.

이때 SHA-256은 매우 유용한 선택이 됩니다. 이번 글에서는 **SHA-256 해시를 활용해 안전하고 유일한 파일명을 생성**하는 방법을 Node.js 코드 예제와 함께 살펴보겠습니다.

---

## SHA-256이란?

SHA-256은 'Secure Hash Algorithm 256-bit'의 약자로, **256비트(64자리) 고정 길이의 해시값을 생성하는 함수**입니다. SHA-2 계열에 속하며, 보안성이 매우 높아 디지털 서명, 인증서, 블록체인 등에서도 광범위하게 활용됩니다.

같은 입력에 대해서는 항상 동일한 해시를 생성하지만, 입력값이 조금만 달라져도 전혀 다른 결과가 나오는 특성을 지닙니다.

---

## 왜 SHA-256을 파일명에 쓰는가?

- 해시 길이가 길고 복잡해 **예측이 매우 어렵고 충돌 가능성이 극히 낮음**
- 보안성이 뛰어나기 때문에, 업로드된 파일명을 통해 원본 정보가 노출되지 않음
- 동일한 입력으로 동일한 결과가 생성되어 **정확한 중복 검증이 가능**
- 파일 내용 기반의 해시 생성으로 **파일 무결성 확인도 가능**

---

## Node.js에서 SHA-256 해시 생성하기

```js
const crypto = require('crypto')

function generateSHA256Hash(input) {
  return crypto.createHash('sha256').update(input).digest('hex')
}

const originalName = 'user_avatar.jpg'
const timestamp = Date.now()
const hashName = generateSHA256Hash(originalName + timestamp)
console.log(`${hashName}.jpg`) // 결과: a3b1f3...jpg
```

---

## 확장자 유지한 유일한 파일명 생성

```js
const path = require('path')

function createSHA256Filename(originalName) {
  const ext = path.extname(originalName)
  const base = path.basename(originalName, ext)
  const timestamp = Date.now()
  const hash = generateSHA256Hash(base + timestamp)
  return `${hash}${ext}`
}

console.log(createSHA256Filename('document.pdf'))
```

---

## 실전 예제: multer에서 SHA-256을 활용한 파일명 지정

```js
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext)
    const timestamp = Date.now()
    const hash = crypto
      .createHash('sha256')
      .update(base + timestamp)
      .digest('hex')
    cb(null, `${hash}${ext}`)
  },
})

const upload = multer({ storage })
```

이 설정을 통해 사용자 파일명이 서버에 직접 노출되지 않으며, 보안성과 유일성을 동시에 확보할 수 있습니다.

---

## SHA-256 vs MD5 비교 요약

- MD5: 빠르고 짧은 해시, 일반적인 중복 방지에 적합 (128비트)
- SHA-256: 보안성이 높고 해시 충돌 가능성이 매우 낮음 (256비트)
- 일반 웹에서는 MD5도 충분하지만, 보안 또는 신뢰성이 필요한 시스템에서는 SHA-256 추천

---

## 마무리

SHA-256은 단순히 중복을 방지하는 수준을 넘어, **파일 보안성과 무결성 확보**에 있어 매우 효과적인 도구입니다. Node.js의 <codeline>crypto</codeline> 모듈을 사용하면 쉽게 해시 기반 파일명을 생성할 수 있고, 파일 저장 시스템의 안정성과 신뢰도를 높일 수 있습니다.

특히 사용자의 원본 파일명이 노출되면 안 되는 경우에는 SHA-256 해시 기반의 파일 저장 방식이 강력한 대안이 됩니다.

---

## 참고 문서

- [Node.js 공식 문서 - crypto](https://nodejs.org/api/crypto.html)
- [SHA-2 설명 - Wikipedia](https://ko.wikipedia.org/wiki/SHA-2)
