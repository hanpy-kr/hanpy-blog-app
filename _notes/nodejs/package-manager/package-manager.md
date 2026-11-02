기본 컨셉은 짧게 짧게 많이 적는 컨셉

# npm

우리는 nodejs를 사용할 때 습관적으로 npm을 명령어를 사용하여 프로젝트를 생성하고 관리한다. 그리고 생성된 프로젝트에서 package.json파일을 참고하여 프로젝트를 진행한다. 그렇다면, 우리가 자연스럽게 사용하는 npm에 대해 조금 더 깊게 알아보는 시간을 가져볼까 한다.

https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fzirjw%2FbtrR9GQWQyo%2Fwsc5BBBWNXYrAdB0Do7ws1%2Fimg.png

<b>Build amazing things</b>

1. npm

위의 문구는 npm 공식 문서에 들어가면 나오는 말이다. npm은 node package manager의 줄임말로 nodejs의 패키지를 관리하는 도구라고 할 수 있다. 우리가 npm i <패키지명> 으로 다운 받는 패키지들은 오픈소스를 기반으로 한다. 따라서 우리가 만든 패키지 모듈도 npm에 올려서 다른 사람들이 사용할 수 있다.

NPM은 어떻게 탄생 했을까? NPM의 탄생 이유는 웹 자체의 global 한 특성이 하나의 이유라고 볼 수 있다. 웹 javascript의 경우 `<script>`를 이용해 bootstrap 같은 외부 javascript 파일을 CDN으로 가져오는 것이 가능하다. 그러나 이러한 파일들은 독립적인 scope를 가지지 않는다. 따라서 global인 전역 변수에 바인딩 되어(호이스팅) 코드가 중복되는 문제가 발생하여 원하는 동작을 하지 않거나, 기존에 돌아가던 기능도 돌아가지 않는 경우가 발생한다. 이러한 문제에 대한 해결을 모듈로써 해결하려는 시도가 있어왔고, 이러한 모듈을 모아서 관리할 수 있는 패키지 관리에 대한 기술발전이 이루어진 것이다. npm(node package manager)은 로그인이 필요 없이 명령어 한 줄로 패키지를 설치하고 바로 사용이 가능하다.

2. npm 명령어

개발자이고, nodejs를 사용한다면, 아래의 명령어는 한 번쯤 쳐봤을 것 같다.

```
$ npm install react
```

위의 명령어는 인증이나 회원가입이 필요 없이 react package를 받는 명령어라고 할 수 있다. 좀 더 정리하면 package를 받는 방식은 아래와 같다고 할 수 있다.

##### 2.1. package 설치하기

```
$ npm install <package>
$ npm i <package>
```

위 두 명령어는 동일한 명령어로 install 대신 i 만 쳐도 가능하다. install 명령어를 실행하면, package.json에 설치한 목록이 포함되고, Root Directory에 node_modules 폴더가 생기고, 그 내부에 패키지가 설치된다. 이때 설치된 패키지는 현재 만들고 있는 프로젝트 내에서 만 사용된다. 이를 지역 설치라 한다. 그렇다면, 한번 설치된 후에 내 컴퓨터 안의 모든 프로젝트에서 사용할 수 있게 설치하는 것을 전역 설치라고 하는데, 관련 명령어는 아래와 같다.

```
$ npm install -g <package>
$ npm i -g <package>
```

-g 옵션을 추가하면 지역이 아닌 전역으로 패키지가 설치된다.

위에서 우리가 npm으로 설치하면, package.json에 설치한 목록이 보인다고 했다. 그런데 package.json이 없어서 설치가 안 되는 경우도 있을 것이다. 무슨 말일까? package.json을 만들지 않았다면, 프로젝트 생성을 하지 않은 것이다. 여기서 우리는 프로젝트를 생성하는 방식에 대해 알아보자.

##### 2.2. 프로젝트 시작하기

```
$ npm init
$ npm init -y
```

위의 명령어를 치면 우리는 npm을 시작할 수 있는 package.json파일을 만들 수 있다. 쉽게 말하면, package.json파일을 기준으로 프로젝트를 만든다고 생각하면 된다. 그리고 package.json 파일 내부에 프로젝트와 관련된 정보들이 JSON형식으로 담겨있다. 조금 더 관련 정보를 알고 싶다면 공식문서를 참고하자. -y 없이 npm init만 치면 프로젝트에 관련된 정보를 치도록 세팅이 된다. 이런 거 없이 디폴트 값으로 바로 세팅을 하고 싶다면, -y를 추가해서 프로젝트를 생성하면 된다.

최근에 아래와 같이 한 줄의 명령어로 바로 프로젝트를 실행할 수 있도록 기본 세팅을 해주는 기능을 제공한다. 이는 react에서 build tool에 최적화된 라이브러리를 자동으로 다 설정하여 같이 설치해준다. 공식문서에서는 이렇게 설명한다.

Create React App lets you focus on code, not build tools.

```
$ npx create-react-app my-app
```

초입자의 기준으로 위의 명령어를 한 번에 쳐서 시작하는 것이 편하고, 위의 명령어를 치면 자연스럽게 package.json이 딸려오기 때문에 package.json에 대한 중요성을 간과하는 경우가 많다. 정리해서 결론만 말하면, 프로젝트는 package.json에서 시작된다. 그리고 npm을 사용하는 하나의 프로젝트의 기준은 package.json이 root directory라고 할 수 있다.

##### 2.3. --save-dev 패키지 설치하기

typescript를 사용한다고 해보자. typescript는 개발단계만 필요하지, 배포 단계에서는 필요 없다. 기본적으로 개발에 필요한 패키지를 배포 시에도 같이 설치한다면, 매우 비효율적이다. 따라서 개발에 필요한 패키지와 배포 운영에 필요한 패키지를 분리할 필요가 있어 보인다. 개발단계에서만 필요한 패키지는 아래와 같이 설치하자.

$ npm install --save-dev <package>
$ npm install -D <package>

그러면 devDependencies에 저장이 된다. 이때 --save-dev와 -D는 같은 명령어이다. 패키지 설치 시 버전 관리에 대해 조금 더 알아보는 시간을 가져보자.

---

# 의존성 관리

> npm을 통해 설치를 진행하면 package.json의 dependencies에 설치한 패키지들이 들어가는 것을 알 수 있다. 이러한 dependencies 뿐만 아니라 devDependencies와 peerDependencies, peerDependenciesMeta도 같이 알아보고자 한다.

3. package.json의 dependencies
   간단히 정리를 해보면, npm init로 프로젝트를 생성하면 package.json파일이 생성된다. 그리고 npm i로 패키지를 다운로드하면 다운로드한 패키지의 이름과 버전이 명시되어 dependencies 내부에 포함된다.

dependencies {
"mongodb": "^4.11.0",
"mongoose": "^6.7.0",
"next": "12.2.5",
}

dependencies 내부에는 프로젝트 구동 시 필요한 패키지들만 포함이 되고, 개발 시 필요한 패키지들은 아래의 devDependencies에 포함이 된다. 내부를 조금 더 자세히 보면 왼쪽이 패키지의 이름이고, 오른쪽이 숫자가 들어가 있음을 알 수 있다.

mongodb의 버전("^4.11.0")을 보면 ^와 , 4, 11, 0 이 나타나는 것을 확인할 수 있다. ^는 캐럿이라 부르고, 그 뒤에 나오는 버전은 순서대로 Major 버전, Minor 버전, Patch 버전이라고 부른다. 각각의 버전에 대한 특징은 다음과 같다. 당연하게도 무언가가 업그레이드된다면, 버전이 올라가게 된다. 그리고 업그레이드되는 버전의 정도에 따라 다음과 같이 버전 구분을 할 수 있다. 이전 버전과 호환되지 않는 변경사항이 생기면, Major버전이 올라간다. 그리고 이전 버전과 호환 가능한 버전인 경우는 Minor버전이 증가된다. Patch버전은 기능에 대한 버전이 변경되었을 때 증가한다고 할 수 있다.

^(캐럿)은 패키지 재인스톨 시 동일한 Major 내에서 Minor의 버전이업그레이드된 것이있다면, Minor 버전이 자동으로업그레이드되게 한다. 잘 안쓰이긴하지만, 캐럿 말고 ~(틸트)도 가끔 사용한다. ~를 ^ 대신 붙여주면, Minor버전 내에서 Patch버전이업그레이드된것이 있다면, 재 인스톨 시 업데이트를 시켜주는 것이라 생각하면 된다.

4. devDependencies
   기본적으로 devdependencies는 배포에 필요하지 않지만, 개발 시에 필요한 패키지들을 넣어두는 곳이다. 만약 다른 사용자가 내가 만든 패키지를다운로드하여서사용한다고 해보자. 이때, 다른 사용자는 우리가 개발 시 사용했던 패키지나 테스트 도구를 사용하거나 필요하지 않을 것이다. 이러한 패키지를 분리하기 위해 사용하는 것이 devDependencies라고 할 수 있다.

5. peerDependencies
   기본적으로 peerDependency에 관련된 글에 관심을 가진다면, 버전 관리와 종속성에 대한 고민을 해봤을 것이다. 종속성에 관련된 이야기는 다른 글에서 이야기하고, 여기서는 peerDependencies 자체에 집중에서 설명해 보겠다. 아래의 경우를 보자.

HANPY라는 프로젝트를 구현 중이다.
npm i <패키지> 명령어로 특정 기능을 구현하기 위해 han 4.4.2 패키지와 py 3.2.7 패키지를 다운로드하였다.
에러가 발생하여 찾아보니, han 4.4.2 패키지를 작동하기 위해서는 py 1.3.2 패키지가 내부에 설치되어 있었다.
py 3.2.7 패키지와 py 1.3.2 패키지가 충돌하여 오류가 발생한 것을 알았다.

이렇게 프로젝트 내에서 다른 패키지들을 다운로드하여 사용할 때, 버전이 많이 다른 패키지의 경우에 충돌이 나서 오류가 나는 경우가 있다. 이러한 경우, 패키지를 설치 시 하나의 버전만 다운로드할 수 있도록 해야 한다. (물론, 위의 예의 경우는 버전 차이가 크므로 특정 기능을 구현할 수 있는 다른 패키지를 찾는 게 좋아 보인다....) 이 경우 해결책은 특정 버전이 아닌 경우, 설치를 못하게 막는 기능을 가진 peerDependencies를 사용하여 사전에 에러를 방지하면 된다. 즉, peerDependency의 포인트는 peerDependencies 내부에 적은 패키지의 버전 외의 다른 패키지를 사용하면 오류가 발생한다는 것이다.

"peerDependencies": {
"react": "^16.8 || ^17.0 || ^18.0",  
 },

위의 코드는 react의 버전이 16.8, 17.0, 18.0에 포함된 버전만 설치를 허용한다는 이야기이다. 당연한 이야기지만, 버전 명시를 유연하기 하지 않으면 설치만 하면 에러가 발생할 것이다. 위의 경우로 ^(캐럿)이 포함되어 유현하게 작성된 것을 확인할 수 있다. 관련된 버전 명시하는 방식은 아래와 같이 다양하게 사용 가능하다. (npm 공식문서 참고)

{
"dependencies": {
"foo": "1.0.0 - 2.9999.9999",
"bar": ">=1.0.2 <2.1.2",
"baz": ">1.0.2 <=2.3.4",
"boo": "2.0.1",
"qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
"asd": "http://asdf.com/asdf.tar.gz",
"til": "~1.2",
"elf": "~1.2.3",
"two": "2.x",
"thr": "3.3.x",
"lat": "latest",
"dyl": "file:../dyl"
}
}

그리고 추가적으로 peerDependencies에 포함된 패키지들이 아직 설치가 되어 있지 않더라도 경고 메시지가 발생한다. 그러나 아래의 peerDependenciesMeta을 추가하면, 경고 메시지가 발생하지 않는다.

6. peerDependenciesMeta
   {
   "name": "HANPY",
   "version": "3.1.6",
   "peerDependencies": {
   "han-kong": "1.1"
   },
   "peerDependenciesMeta": {
   "han-kong": {
   "optional": true
   }
   }
   }

언급했던 것과 같이, 만약 han-kong을 설치하지 않으면 프로젝트에서 경고 메시지를 준다. 그러나 peerDependenciesMeta에 optional을 true라고 주면, 설치하지 않아도 아무런 경고 메시지를 주지 않는다. 이름 그대로 peerDependenciesMeta는 peerDependencies의 메타 정보를 담고 있다고 보면 된다. 좀 더 세부 정보는 npm Docs에서 참고 가능하다.

7. resolutions
   package.json에는 resolutions라는 값이 있다. peerDependencies와 비슷하지만 다른점이 있어 추가로 작성해본다. 내가 사용하고 있는 하위 버전의 package 버전을 고정하고 싶을 때, 사용한다. 예들들어 나는 han이라는 패키지를 사용하고 있다. 그리고 han이라는 패키지는 py라는 패키지를 이용해서 만들었다. 최근 py 1.3.2 패키지가 py 1.4.0으로 버전 업그레이드를 했는데, 오류가 크게 발생해서 han이라는 패키지도 돌아가지 않는다면, py패키지 버전을 py 1.3.2로 고정을 해야할 필요성이 생긴다. 이떄 아래와 같이 사용한다.

"resolutions": {
"han/py": "1.3.2"
}

간단히 말해서, 하위 패키지의 버전을 유지할 이유가 생겼다면 resolutions를 사용해서 하위 버전을 고정하면 된다.

--

# yarn

---

# yarn berry
