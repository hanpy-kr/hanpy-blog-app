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
eslint / prettier가 겹치는 부분이 있어서 rules를 추가로 넣어준다.

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

$ yarn dlx @yarnpkg/sdks vscode
설정한 부분 잘 읽을 수 있도록 셋팅해 준다.

package.json 추가

```
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
