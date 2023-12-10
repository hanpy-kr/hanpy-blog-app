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
