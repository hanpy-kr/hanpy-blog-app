##### 이미지 제거

```bash
$ docker rmi my-app:v1
```

##### tar 압축

> $ docker save -o [OUTPUT-FILE] IMAGE

```bash
$ docker save -o my-app-v1.tar my-app:v1
```

##### 이미지 압축파일(tar)에서 불러오기

> $ docker load -i [INPUT-FILE]

```bash
docker load -i my-app-v1.tar
```

위 명령어 셋팅 시 tar > image로 변경. 아래 조회 명령어로 확인가능하다.

##### image 확인

```bash
$ docker images
```

```bash

```

# 컨테이너

- 컨테이너는 컴퓨터 내에 특정 시스템 환경을 별도로 패키징한 것이다. 소프트웨어는 패키징된 환경에서 실행될 수 있으며, 이 환경은 시스템의 나머지 부분과 격리된다.
- 컨테이너는 가상머신과 비슷하지만, 가상머신이 아니다. 컨테이너는 가상머신보다 더 날렵하며 기동과 정지도 더 빠르고 유연성과 이동성도 더 뛰어나다.
- 컨테이너는 단 몇 초 만에 확장하고 축소할 수 있으며, 클라우드와 같은 탄력적인 환경에서 애플리케이션을 더 쉽게 구동할 수 있다.
- 대표적인 컨테이너 소프트웨어로 **Docker(도커)**가 있다.

# Docker (도커)

- 오픈소스이기도 하고 상용 소프트웨어이기도 한 도커는 기존의 컨테이너를 사용자 친화적이고 개발자 친화적인 환경으로 만든 주역이다.
- 도커는 컨테이너를 위한 공통 툴 세트를 제공해 애플리케이션을 컨테이너 이미지로 패키징해 어디에서나 쉽게 배치하고 재사용할 수 있다.
- 컨테이너 이미지란 컨테이너를 만드는 모체다. 쉽게 생각해 클래스 - 인스턴스 객체 간의 관계를 생각하면 된다.
- 쉽게 말해 도커는 컨테이너 이미지를 생성하고 관리하고 공유하고 여러 곳으로 옮기고 도커 호환 호스트에 배치할 수 있게 함으로써, 컨테이너 구동 작업을 매우 간단한 것으로 만들어 버린다.
  => 정리: 도커는 애플리케이션을 신속하게 구축, 테스트 및 배포할 수 있는 소프트웨어 플랫폼이다. 소프트웨어를 컨테이너라는 개념으로 패키징하며, 컨테이너는 라이브러리, 시스템 도구, 핵심 로직 등 소프트웨어 실행에 필요한 모든 것이 포함되어 있다.

### Docker run

```bash
$ docker run alpine ls
```

우선 예를 들어 터미널에서 위와 같이 'docker run alpine ls' 를 입력한다고 가정했을 때, 각 포지션에 있는 명령어가 의미하는 바를 이해해야 한다.

- docker -> 도커 클라이언트를 뜻한다.
- run -> 도커 컨테이너를 생성함과 동시에 실행한다.
- alpine -> 사용할 도커 이미지 이름을 넣는 위치이다. 도커 이미지는 컨테이너(인스턴스) 생성의 모태가 되는 원형이라 할 수 있다.
- ls -> 이 자리는 원래 이미지가 가지고 있는 시작 명령어를 무시하고 여기에 있는 커맨드를 실행하게 한다. (예시로든 ls 커맨드는 현재 디렉토리의 파일리스트를 보여주는 역할을 한다.)

### docker run 명령어 이후 작동 순서

1. 도커 클라이언트에 전달된 명령어가 도커 서버로 전송된다.
2. 도커 서버는 컨테이너를 위한 이미지가 도커 캐시 저장소에 이미 캐시되어 있는지를 확인한다.
3. 존재한다면, 캐시 저장소에 있는 이미지로 컨테이너를 생성 및 실행한다.
4. 존재하지 않는다면, 도커 허브에서 이미지를 다운 받아와 캐시 저장소에 캐싱하고 컨테이너를 생성 및 실행한다.

### 이미지 받은 후의 컨테이너 생성 및 실행 순서

1. 먼저 이미지 내의 파일 스냅샷 되어있는 것을 컨테이너의 하드 디스크에 올린다.
   (여기서 컨테이너가 사용하는 커널은 공통 소유이다. 즉 도커의 모든 컨테이너는 하나의 커널을 사용한다.)
2. 동시에 어플리케이션의 실행을 위해, 해당 이미지가 요구하는 자원(네트워크, RAM, CPU 등)을 할당량에 맞게 컨테이너에 부여한다.
3. 시작 명령어(예: run alpine)가 작동하면서 어플리케이션을 실행한다.
4. 만약 뒤에 ls가 붙으면 alpine의 파일리스트를 확인할 수 있다.
   (참고: 모든 이미지가 ls를 사용할 수 있는 것은 아니다. 가령 hello-world 이미지 같은 경우, ls를 붙여서 사용해도 excutable file not found라는 결과가 나온다. 즉, ls로 표출할 수 있는 파일이 존재하지 않는 이미지도 있는 것이다.)

# Docker 리스트 확인

```bash
$ docker ps
$ docker ps -a
```

- 우선 최소 2개의 터미널이 필요하다.
- 첫번째 터미널을 키고 컨테이너를 실행해야 한다. (예: docker run alpine)
- 두번째 터미널을 키고 docker ps를 입력하여 위에서 실행한 컨테이너의 내역을 확인해보자.
- docker ps는 실행 중인 컨테이너만 보여준다.
- 종료된 컨테이너도 포함하여 확인하고 싶다면 docker ps -a 를 입력하면 된다.

```
# 리스트 column key 설명
- CONTAINER ID: 컨테이너의 고유한 아이디 해쉬값이다. 본래 더 길지만 일부만 표출된다.
- IMAGE: 컨테이너 생성시 사용한 도커 이미지를 뜻한다.
- COMMAND: 컨테이너 시작될 때 어떤 명령어가 사용되었는지를 보여준다. 대부분 이미지에 내장되어 있으므로 별도 설정이 필요 없다.
- CREATED: 컨테이너가 생성된 시간을 뜻한다.
- STATUS: 컨테이너의 상태를 뜻한다. (UP은 실행중, EXITED는 종료, PAUSE는 일시정지)
- PORTS: 컨테이너가 개방한 포트와 호스트에 연결한 포트를 의미한다. 특별한 설정을 하지 않는 경우 출력되지 않는다.
- NAMES: 컨테이너의 고유한 이름을 뜻한다. 컨테이너 생성시 --name 옵션으로 이름을 설정할 수도 있다. 그렇지 않으면 도커 엔진이 임의로 형용사와 명사를 조합해 설정해준다. id와 마찬가지로 중복이 안되고 docker rename 명령어를 사용하면 이름을 변경할 수도 있다.
ex) docker rename {original-name} {changed-name}
```

### 필터 사용 리스트 검색

```
$ docker ps --format 'table{{.Names}}\t{{.Image}}'
```

- --format: 원하는 포맷을 어떻게 할지 설정하려면 우선 넣어줘야하는 명령어이다.
- '(작은따옴표): 포맷팅 뒤에 올 내용은 '(작은따옴표)로 시작해서 끝나야 한다.
- table: 셀렉트를 위해선 처음에 한번 table이란 명령어를 기입해줘야야 한다.
- {{.셀렉트대상}}: 원하는 항목을 셀렉트 하는 방법이다. 중괄호를 두번씩 열고 닫고 그안에 .(dot) + 셀렉트대상 을 넣는다. 즉, Names가 아닌 Ports를 넣으면 Ports를 선택해서 볼 수 있는 것이다. 셀렉트는 원하는만큼 연달아 여러번 넣을 수 있고, 그만큼 여러 항목을 확인 가능하다.
- \t: 셀렉트를 연달아 넣을 때 셀렉트 항목 간의 간격을 만들어준다.
  (이를 넣지 않으면 가독성이 개판이 된다.)

# Docker 명령어 기본

### 생성

```bash
$ docker create {이미지 이름}
$ docker create hello-world
```

- docker 컨테이너를 생성하는 명령어이다.
- docker run 생명주기 중 앞부분에 해당하며, 컨테이너 하드디스크에 파일 스냅샷을 올려주게 된다.
- 생성이 되면서 아래 라인에 생성된 컨테이너 ID값을 출력해주는 걸 확인할 수 있다.

### 실행

```bash
$ docker start a67cf6a54f15
```

- docker start {컨테이너 아이디/이름}
- docker 컨테이너를 실행하는 명령어이다.
- docker run 생명주기 뒷부분에 해당하며, 컨테이너에 프로세스 실행 시작 명령어가 적용된다.
- docker start -a {컨테이너 아이디/이름} 의 형태가 되어야 원하는 출력문이 나온다.
- 컨테이너 아이디 위치엔 ID식별자 전체를 입력할 필요없이, 앞 부분만 잘라 넣어줘도 인식해준다.
- -a를 활용하지 않으면 아래처럼 그냥 입력한 값을 그대로 표출해준다.

```bash
> docker start 23358
23358
```

# Docker 컨테이너 생성 / 실행

```bash
$ docker run hello-world
```

- docker run {이미지 이름}
- 생성(create)과 실행(start)을 동시에 수행해주는 명령어이다.
- docker run 생명주기 전체를 수행한다.
- 이미 이전 블로그에서 확인한 명령어이기에 예시는 생략한다.

# Docker 중지

```bash
$ docker stop 4f6213c6c5c0
$ docker kill 4f6213c6c5c0
```

- docker stop {컨테이너 아이디/이름}
- docker kill {컨테이너 아이디/이름}
- docker stop 사용 시, 대략 5초 이상의 딜레이 이후에 중지 되었다.
- docker kill 사용 시, 곧장 중지 되었다.
- stop과 kill의 차이에 대해 이해할 필요가 있다.
- docker 컨테이너 중지 생명주기 중엔 SIGTERM(정리하는 시간)과 SIGKILL(중지) 구간이 있다.
  - stop 명령어는 그동안 하던 작업들을 되도록 완료한 뒤에 컨테이너를 중지시킨다.
    - stop은 SIGTERM 을 거친 후, SIGKILL을 이행한다.
  - kill 명령어는 어떠한 것도 기다리지 않고 바로 컨테이너를 중지시킨다.
    - kill은 SIGTERM 없이, SIGKILL을 이행한다.

# Docker 삭제

```bash
$ docker rm 4f6213c6c5c0
```

- docker rm {컨테이너 아이디/이름}
  - 실행중인 컨테이너를 우선 중지한 후에 삭제가 가능하다.
- docker rm `docker ps -a -q`
  - 모든 컨테이너를 삭제할 수 있다.
- docker rmi {이미지 id}
  - 도커 이미지를 삭제할 수 있다.
- docker system prune
  - 한번에 컨테이너, 이미지, 네트워크 등을 모두 삭제할 수 있다.
  - 도커를 쓰지 않거나 모두 정리하고 싶을 때 사용해주면 적합하다.
  - 하지만 이것도 실행중인 컨테이너에는 영향을 주지 않는다는 점 주의하자.
- docker 컨테이너 삭제 생명주기에서 삭제는 곧장 실행된다.
  - 단, 기억해야할 포인트는 실행중이지 않은 컨테이너만 삭제할 수 있다는 점이다.

# 가동 중인 도커 컨테이너에 명령어 전달하기

```bash
$ docker exec 5d4da2695441 ls
```

docker exec {컨테이너 아이디} {명령어 키워드}
docker run은 새로운 컨테이너를 만들어서 실행한다.
반면 docker exec은 이미 실행중인 컨테이너에 새로운 명령어 키워드를 전달하고 적용한다.