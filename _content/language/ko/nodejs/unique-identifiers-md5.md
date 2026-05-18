---
deployment: false
category: Backend
title: 'MD5 해시로 유일한 파일명 만들기 (Node.js 파일 저장 전략)'
summary: '동일한 파일명이 덮어쓰이지 않도록 MD5 해시를 활용해 고유한 파일명을 생성하는 방법과 실전 예제를 Node.js로 구현해봅니다.'
pageKey: md5\_filename\_unique\_guide
lng: KOR
publishedAt: 2025-04-17
tags: [Node.js, 파일명 충돌 방지, 해시, md5, 파일 업로드, Backend]
---

# MD5 해시로 유일한 파일명 만들기 (Node.js 파일 저장 전략)

웹 애플리케이션에서 파일 업로드 기능을 제공할 때 흔히 발생하는 문제가 있습니다. 바로 **동일한 이름을 가진 파일이 여러 번 업로드되는 상황**입니다. 예를 들어 `resume.pdf`라는 이름의 파일이 여러 번 업로드되면 이전 파일이 덮어쓰기 되거나, 덮어쓰지 않기 위해 복잡한 이름 변경 로직을 따로 구현해야 하는 번거로움이 생깁니다.

이러한 문제를 깔끔하게 해결하는 방법 중 하나는 해시(Hash)를 이용해 **파일 이름을 고유하게 생성하는 전략**입니다. 그중에서도 이번 글에서는 널리 알려진 해시 알고리즘 중 하나인 \*\*MD5(Message Digest Algorithm 5)\*\*를 활용하여 파일명을 유일하게 만들고, 실무에서 바로 사용할 수 있도록 Node.js를 활용한 예제를 단계별로 소개합니다.

---

## MD5 해시란?

MD5는 입력값(문자열, 파일 등)에 대해 항상 고정된 길이(128비트)의 해시 값을 출력하는 알고리즘입니다. 입력 데이터가 조금만 달라져도 해시 결과는 완전히 달라지는 특성이 있으며, 같은 입력값에 대해서는 언제나 같은 결과를 반환합니다.

비록 오늘날에는 보안 용도로는 적합하지 않지만, 여전히 다음과 같은 목적으로 널리 사용됩니다:

- 캐시 키 생성
- 중복 데이터 식별
- 파일 무결성 검사
- 유일한 파일명 생성 등

실제로 MD5는 속도가 빠르고 구현이 간단해, 중복 파일명을 방지하거나 내부용 ID 생성에 이상적인 선택입니다.

---

## 왜 MD5를 파일명에 쓰는가?

해시 알고리즘은 어떤 데이터든 고정된 형식으로 변환해주기 때문에, 이를 파일 이름에 활용하면 다음과 같은 장점이 있습니다:

- **덮어쓰기 방지**: 동일한 파일명을 가진 파일을 여러 번 업로드해도 서로 다른 해시값으로 저장되므로 덮어쓰는 문제가 발생하지 않습니다.
- **원본 이름 은닉**: 사용자 파일명을 숨길 수 있어, 내부 파일 관리 보안이 강화됩니다.
- **정규화된 형식 유지**: 해시값은 일정한 길이의 알파벳+숫자 조합이기 때문에, 경로 관리 및 파일시스템 정리에 용이합니다.
- **중복 파일 탐지 응용**: 해시값을 기반으로 동일한 파일 내용이 여러 번 업로드되었는지 판단할 수도 있습니다.

---

## Node.js에서 MD5 해시 생성하기

Node.js에서는 기본 내장 모듈인 <codeline>crypto</codeline>를 이용해 간단하게 MD5 해시를 생성할 수 있습니다.

```javascript
const crypto = require('crypto')

function generateMD5Hash(input) {
  return crypto.createHash('md5').update(input).digest('hex')
}

const originalName = 'example.png'
const timestamp = Date.now()
const hashName = generateMD5Hash(originalName + timestamp)
console.log(`${hashName}.png`)
```

이 예제처럼 \*\*원본 파일명과 현재 시각(timestamp)\*\*을 결합해 해시를 생성하면, 매번 고유한 파일명을 만들 수 있습니다. 동일한 이름의 파일이 연속으로 업로드되더라도 해시값이 달라지므로 파일 간 충돌이 발생하지 않습니다.

---

## 확장자는 어떻게 처리할까?

파일 확장자는 파일의 용도를 판별하는 데 중요하므로, 해시 생성 시에는 확장자를 제외하고 해시를 만든 뒤, 마지막에 다시 확장자를 붙이는 방식을 사용합니다.

```javascript
const path = require('path')

function createUniqueFilename(original) {
  const ext = path.extname(original)
  const base = path.basename(original, ext)
  const hash = generateMD5Hash(base + Date.now())
  return `${hash}${ext}`
}

console.log(createUniqueFilename('resume.pdf'))
```

이렇게 하면 원본 파일이 PDF든 JPG든 관계없이 원래의 확장자를 유지하면서 유일한 이름으로 저장됩니다.

---

## 실전 예제: multer로 파일 업로드 시 해시 적용하기

Node.js에서 가장 많이 쓰이는 파일 업로드 미들웨어는 <codeline>multer</codeline>입니다. 아래는 <codeline>multer</codeline>를 설정할 때 해시 기반 파일명을 적용하는 예제입니다.

```javascript
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext)
    const timestamp = Date.now()
    const hash = crypto
      .createHash('md5')
      .update(base + timestamp)
      .digest('hex')

    cb(null, `${hash}${ext}`)
  },
})

const upload = multer({ storage })
```

이 코드를 Express 라우터에 연결하면 사용자가 `profile.png`, `document.docx` 등을 업로드할 때마다 서버 디렉토리에는 충돌 없는 유일한 파일명으로 저장됩니다.

예시 저장 파일명:

- `c30b2a6cf112aa390b0e6a3e3bb55bc4.png`
- `8e9df90f403202ad7d04b18a8415cfb0.docx`

---

## 보완 팁: 파일 내용 기반 해시 사용하기

파일명이 아닌 **파일 내용 자체를 기반으로 해시를 생성**하면, 동일한 파일이 여러 번 업로드되었는지도 탐지할 수 있습니다. 다음은 파일 스트림을 이용한 예제입니다.

```javascript
function generateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5')
    const stream = fs.createReadStream(filePath)

    stream.on('data', (data) => hash.update(data))
    stream.on('end', () => resolve(hash.digest('hex')))
    stream.on('error', reject)
  })
}
```

이 방식을 사용하면 중복 업로드 방지나 캐시 무결성 검증에도 응용할 수 있습니다.

---

## 주의할 점

- **보안용 해시로 MD5는 권장되지 않습니다.** 비밀번호 저장, 암호화 키 생성 등에는 SHA-256 이상급 또는 bcrypt, argon2를 사용해야 합니다.
- **해시 입력값 조합 주의**: 같은 이름의 파일이 같은 시간에 업로드될 경우 충돌 위험이 존재합니다. 필요 시 <codeline>Math.random()</codeline> 혹은 UUID를 추가 조합하세요.
- **파일시스템 한도 고려**: 너무 많은 파일이 한 디렉토리에 저장될 경우 성능 저하가 발생할 수 있으므로, 해시값 일부를 폴더명으로 사용하는 계층 구조도 고려해볼 수 있습니다.

---

## 마무리

MD5 해시를 활용한 파일명 유일화는 간단하면서도 매우 강력한 전략입니다. 파일 업로드 시스템에서 **중복 방지, 관리 효율, 예측 가능한 구조**를 동시에 달성할 수 있기 때문입니다. Node.js에서 제공하는 <codeline>crypto</codeline> 모듈만으로도 충분히 구현이 가능하며, <codeline>multer</codeline>와 결합하면 실무 적용까지 매우 수월합니다.

향후에는 UUID나 SHA-256, 또는 파일 콘텐츠 기반 해시와 조합하여 더 강력하고 안전한 파일 관리 전략을 구축할 수 있습니다. 지금 운영 중인 업로드 시스템에도 MD5 해시 전략을 한번 적용해보세요.

---

## 참고 문서

- [Node.js 공식 문서 - crypto](https://nodejs.org/api/crypto.html)
- [MD5 설명 - Wikipedia](https://ko.wikipedia.org/wiki/MD5)
- [multer 공식 GitHub](https://github.com/expressjs/multer)
- [SHA-256 vs MD5 비교](https://www.geeksforgeeks.org/difference-between-md5-and-sha256-algorithm/)
