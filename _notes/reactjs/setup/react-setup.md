## 프로젝트 구성하기

1. Boilerplate

   > Create React App + Typescript

2. Rules

   > ESLint + Prettier

3. Style

   > SCSS

4. Package Manager
   > Yarn Berry (with. pnp)

왜 NPM 을 안쓰나요?

- 무겁고 복잡한 node_modules
- 비효율적인 의존성 설치
- 비효율적인 설치 ( 다른 버전의 패키지 중복 설치 )

## 시작하기

```bash
yarn create react-app invitation-app --template typescript
yarn create react-app my-app --template typescript

yarn dlx create-react-app project-name --template=typescript
```

###### create react-app

- 이부분을 보일러플레이트라고한다.
- 어느정도 환경 셋팅이 되어 바로 프로젝트를 시작할 수 있도록 한다.

#### node_module 삭제

> yarn berry를 사용할 것이기 때문에 삭제해준다.

#### Yarn Berry (PnP) 설정

1. yarn Berry - `$ yarn set version berry`
   : yarn berry사용을 위해 yarn 버전을 berry로 변경해준다.
   .yarn 생기고 .yarnrc.yml 파일도 생성되면 yarn berry가 잘 셋팅이 된거다.

2. Node linker 설정 - `NodeLinker:pnp`
   node_modele을 사용하지 않기 때문에 pnp를 사용한다고 명시적으로 적어준다.

- yarnrc.yml 폴더 안에, `nodeLinker: pnp` 을 넣어준다. (띄어쓰기 소문자 확인)

3. Yarn install - `$ yarn install`
   > install을 통해 yarn berry의 pnp환경으로 셋팅해준다.

- 설정한 패키지들을 설치해준다. 이때 node_module이 안생긴다.
  .yarn 폴어 안에 cache를 보면 필요한 설치 파일들이 생긴다.(zip 파일로 관리됨을 확인 할 수 있다.)

조금 더 보면, .pnp.cjs에서 위치와 의존성을 관리한다.

이제 아무 tsx 파일 열어보면, typescript가 깨진다.왜냐하면 캐시 폴더 안에 zip파일로 관리된다고 했는데, 이때 typescript도 zip파일 안에 있어서 그렇다. vscode는 아직 zip 파일을 해석 할 수 없다.

4. Yarn Berry 와 IDE 통합 - ZipFS Plugin 설치 (ZipFS - a zip file system)
   > vscode가 yarn이 만든 zip파일을 잘 해석할 수 있도록 extentions 설치

4-1. yarn dlx @yarnpkg/sdks vscode
yarn dlx @yarnpkg/sdks vscode
yarn dlx @yarnpkg/sdks vscode
설치했으면 위의 명령어를 입력하면 vscode에서 타입 스크립트 사용할 것인가 물어본다.
.vscode/settings.json가 생겼고, 획인해 보면 아래와 같다.

```json
{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

.yarn의 typescript를 읽어오겠다.

tsx 페이지 들어가서
commond + p 하고

> select typescript 선택하고
> yarn 안에 부분 누른다.

##### gitignore 설정

> https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored

```

# yarn zero install
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

안되서 고생을 했지만...
node 버전 16이면된다...ㅋㅋㅋㅋ

`yarn set version canary` ??

##### test

App.test.tsx 에서 toBeInTheDocument() method가 에러가 난다.

```
$ yarn remove @testing-library/jest-dom
지우고 다시 설치
$ yarn add -D @types/testing-library__jest-dom @testing-library/jest-dom
```

yarn start로 테스팅해보자.

> https://velog.io/@hejin8307/Typescript-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%83%9D%EC%84%B1-%EB%B0%8F-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95

### ESLint + Prettier 설정 + scss 설정

# extension 설치

- ESLint
- Prettier - Code formatter
  코드 포매팅을 도와준다. 뷰티 파이 같은 플러그인을 사용중이라면, 충돌날 수 도 있다.

##### ESLint 설치

1

```
$ yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-react eslint-config-react-app
```

> eslint prettier 관련 plugin과 config 파일을 설치하는 것을 알 수 있다.

2
config 설정 분리

3
yarn dlx @yarnpkg/sdks vscode

사실 아래와 같이 package.json파일을 보면 eslint 부분이 있다.

```
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
```

위 삭제하고, 이를 따로 분리하자.

.eslintrc.json 생성 후 아래 적자.

```json
{
  "extends": ["react-app", "react-app/jest", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

설치했던 플러그인을 넣어주자.
eslint / prettier가 겹치는 부분이 있어서 rules를 추가로 넣어준다. ex. "prettier/prettier": "error"

린트는 코드 규직.

프리티어는 이쁘게 만들어 주는 것
.prettierrc

```json
{
  "useTabs": false,
  "printWidth": 80,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "lf",
  "semi": false,
  "arrowParens": "always"
}
```

세미클론 안쓴다.
80정도 넘어가면 줄바꿈
쌍따움표 안쓴다 뭐 이런 내용이다.

커멘드 + 쉼표(,) 눌러보자. 그리고 페이지 넘기는 것 같은 거 눌러보자.
settings.json에 아래 내용 추가하면, 저장할때마다 린트 작동한다.

```json
{
  ...
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint" : true
  }
  ...
}
```

아래 부분을 추가하면 파일을 lf로 만들어진다. (prettier에도 lf를 설정해 두었다.)
기본적으로 vscode 아래 상태창을 보면 lf가 적혀있다.
윈도우는 CRLF로 파일을 만들기 때문에, 위도우인 경우는 아래 내용도 settings.json에 추가해 주자.

```json
{
  ...
  "files.eol": "\n"
  ...
}
```

```
$ yarn dlx @yarnpkg/sdks vscode
```

설정한 부분 잘 읽을 수 있도록 셋팅해 준다.

package.json 추가

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\"",
    "lint:fix": "eslint --fix \"src/**/*.{js,jsx,ts,tsx}\""
  },
```

lint - src 내부 폴더의 모든 파일을 검사
lint:fix - src 내부 폴더의 모든 파일을 검사해서 포매팅 맞춰준다

### eslint/prettier 현업

- 매번 셋팅하기 귀찮으니, 아래 기본 배이스에 rules만 추가해서 쓴다.
  패키지화 해서 많이 쓴다.

```json
{
  "extends": ["react-app", "react-app/jest", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

아래는 예시

```
https://github.com/titicacadev/triple-config-kit
```

## Craco Alias 설정

> `import App from "../../../../App.js"` 멈춰!
> 경로 깊을 때 @ 를 쓰는 것을 알리안스 라고 한다. 이떄 react 설정을 변경해 줘야하는데, 과정이 복잡해서 Craco를 사용한다.
> Craco는 Create-React-App Configuration Override의 약어로, CRA에 config 설정을 덮어쓰기 위한 패키지이다.

https://craco.js.org 들어가서 Get start 확인하자. 또한 craco로 바벨 타입스트립트 웹펙 설정도 쉽게 변경가능하다.

```bash
$ yarn add -D @craco/craco
$ yarn add -D craco-alias
```

##### tsconfig.paths.json 정의

```
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@components/*": ["src/components/*"]
        }
    }
}
```

##### craco.config.js 정의

```
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json'
      }
    }
  ]
}
```

- 경로를 tsconfig를 바라보게 한다.

##### Tsconfig 에 tsconfig.paths.json extends 시키기

> tsconfig에서 path를 모르니 paths.json을 확장해준다.

- include에 포함해주면 타이핑도 잘 된다.

```
{
  "extends": "./tsconfig.paths.json",
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "tsconfig.paths.json"]
}

```

##### scss

- scss는 css의 기능을 확장시켜주는 도구이다.

css의 모든 기능을 포함하고 있고, 변수, 믹스인, 상속과 같은 추가적인 기능들을 제공하여 코드의 재사용성을 높이고 유지보수를 용이하게 만들어 준다.

##### 설치

- classnames 기반으로 작성을 할거다.
- 따로 우선순위를 정하지 않더라도 `classNames` 안에서 우선순위를 관리해 줘서 편하다.

```bash
$ yarn add classnames sass
```

##### 폴더 생성

`/src/scss` 라는 스타일을 모아둘 폴더를 만들어준다.

1. 먼저 global.scss를 만들고 index.tsx에서 불러온다.

```scss
@charset "utf-8";

:root {
  --red: #ea7664;
  --black: #544f4f;
  --brown: #89757a;
  --beige: #f6f5f5;
}
```

아래 넣어야 전체 영역에 css가 포함된다.

```tsx
import "./scss/global.scss";
```

이제 적용 해보면 된다.

src/App.module.scss

```scss
.container {
  background-color: var(--red);
}
```

```tsx
import React from "react";
import logo from "./logo.svg";
import "./App.css";

import classNames from "classnames/bind";

import styles from "./App.module.scss";

const cx = classNames.bind(styles); // 우선순위 안따져도 스코프를 관리해준다.

function App() {
  return (
    <div className={cx("container")}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

### Json-Server

# Json Server

Json Server 는 JSON파일을 이용하여 Rest API 서버를 빠르고 간단하게 생성하기 위한 도구이다.
Json server를 이용하면 JSON파일을 데이터베이스처럼 동작하게 할 수 있고, HTTP메서드를 활용하여 데이터에 접근하고 수정 할 수 있는 api를 만들 수 있다.

ex : https://github.com/typicode/json-server

#### 실습

우선 문서와 같이, global로 저장하지 않는다. 왜냐하면 수동으로 업데이트를 해야하는 불편함이 생긴다. 따라서 로컬호 한다.

global에 설치를 하면, pc의 메모리를 먹기도하고 설치 당시의 버전으로 고정이 된다. 버전을 업데이트 하려면 수동으로 해줘야하므로 버전관리가 힘들어진다.

```
yarn add -D json-server
```

`db.json` 파일 생성

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

세개의 리소스로 api가 만들어진다

package.json에 script 추가하자.

> 그냥 실행하면 포트 겹친다. 조심하자.

```json
{
  "script": {
    "dev:db": "json-server db.json --port=8888"
  }
}
```

위는 실시간으로 반영이 안된다. 아래와 같이 **--watch**를 넣어주면 db.json 변경하면 서버 재시작 없이 반영이 된다.

```json
{
  "script": {
    "dev:db": "json-server --watch db.json --port=8888"
  }
}
```

실행해보면 된다.

- filter test 해보자.
- pagination test 해보자.

test 시 브라우저에서 확인이 힘들다면, JSON Formatter라는 json extension을 설치해 주자.

```
{
  "wedding": {
    "id": 0,
    "date": "2023-08-27T13:00:00",
    "location": {
      "lat": 37.28163212324522,
      "lng": 127.0303329958705,
      "name": "노블레스 웨딩컨벤션 7층 컨벤션홀",
      "address": "경기도 수원시 팔달구 우만동 팔달문로 128\n수원 노블레스 웨딩컨벤션",
      "link": "https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=,,506715,1050669&rt1=&rt2=%EC%88%98%EC%9B%90%EB%85%B8%EB%B8%94%EB%A0%88%EC%8A%A4%EC%9B%A8%EB%94%A9%EC%BB%A8%EB%B2%A4%EC%85%98&rtIds=,9846217",
      "waytocome": {
        "metro": [
          "셔틀버스 운행 → 분당선 수원시청역 5번출구 수시운행"
        ],
        "bus": [
          "수원역(4번출구) → 동수원병원 하차10, 11-1, 37, 720-2, 83-1 (약 20분)",
          "수원종합버스터미널 → 수병원 하차300, 300-1, 82-1, 80, 88 (약 20분)",
          "서수원시외버스터미널 → 동수원병원 하차11-1, 37, 61, 62-1 (약 30분)",
          "망포역 (4번출구) → 동수원병원 하차62-1, 61 (약 30분)",
          "용인시(용인대입구삼거리) → 동수원병원 하차10, 10-5, 66 (약 1시간)",
          "범계역(범계사거리), 오산역(오산터미널맞은편) → 수병원 하차300 (약 50분)",
          "잠실역(4번출구) → 월드컵경기장 하차1007-1 (약 1시간 20분)",
          "사당역(4번출구) → 월드컵경기장 하차7000, 7001 (약 1시간)",
          "강남역(7번출구) → 월드컵경기장 하차3002, 3007, 3008 (약 1시간)"
        ]
      }
    },
    "groom": {
      "name": "류우선",
      "account": {
        "bankName": "신한",
        "accountNumber": "110-356-123433",
        "kakaopayLink": "https://qr.kakaopay.com/Ej8HNpNJZ"
      },
      "phoneNumber": "01045532323",
      "parents": [
        {
          "name": "류영만",
          "account": {
            "bankName": "농협",
            "accountNumber": "233331-51-061400"
          },
          "phoneNumber": "01053242422"
        },
        {
          "name": "봉미선",
          "account": {
            "bankName": "농협",
            "accountNumber": "352-1252-4559-90"
          },
          "phoneNumber": "01054912252"
        }
      ]
    },
    "bride": {
      "name": "이지혜",
      "account": {
        "bankName": "농협",
        "accountNumber": "352-0952-4669-11"
      },
      "phoneNumber": "01022345124",
      "parents": [
        {
          "name": "이훈이",
          "account": {
            "bankName": "카카오뱅크",
            "accountNumber": "3333-1112-11932"
          },
          "phoneNumber": "01024333423"
        },
        {
          "name": "정유리",
          "account": {
            "bankName": "국민",
            "accountNumber": "222-19-8842-472"
          },
          "phoneNumber": "01099928884"
        }
      ]
    },
    "message": {
      "intro": "가장 진실된 것으로\n가장 당신을 위한 생각으로\n나의 마음을 가득 채워가고 싶다\n참 작은 마음이지만\n당신을 위한 것 중 가장 작은 것일지라도\n당신이 허락해준다면\n나 내 온 마음 그것이라 하겠다.\n\n이경선, <마음>",
      "invitation": "소중한 분들을 초대합니다\n살랑이는 바람결에\n사랑이 묻어나는 계절입니다.\n여기 곱고 예쁜 두 사람이 사랑을 맺어\n인생의 반려자가 되려 합니다.\n새 인생을 시작하는 이 자리에 오셔서\n축복해 주시면 감사하겠습니다."
    },
    "galleryImages": [
      "wedding_01",
      "wedding_02",
      "wedding_03",
      "wedding_04",
      "wedding_05",
      "wedding_06",
      "wedding_07",
      "wedding_08",
      "wedding_09",
      "wedding_10",
      "wedding_11",
      "wedding_12"
    ],
    "attendCount": 0
  }
}

```
