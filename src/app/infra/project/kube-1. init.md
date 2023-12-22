# 오케스트레이션이란

- 오늘날의 개발에서 애플리케이션은 더 이상 하나의 통일체가 아니라, 특정 애플리케이션이 설계된 대로 기능하도록 함께 작동해야 하는 수십 또는 수백 개의 느슨하게 결합된 컨테이너로 구성된다.
- 하지만 수백 개의 컨테이너를 끊임없이 배포하고 관리하는 일은 굉장한 리소스를 요구로 한다. 이러한 어려움을 해결하기 위해 오케스트레이션이 등장했다. 오케스트레이션이란 컨테이너화된 애플리케이션의 자동화 및 최적화를 뜻하며, 컨테이너 오케스트레이션이란 용어로 쓰인다.
- 즉 정리하자면, 컨테이너 오케스트레이션의 목적은 여러 컨테이너의 배포 프로세스를 최적화 하는데 있으며, 이것은 컨테이너와 호스트의 수가 증가함에 따라 점점 더 가치가 있게 된다는 것이다.
- 대표적인 Docker기반 컨테이너 오케스트레이션 툴로는 Docker Swarm, Kubernetes, Apache Mesos가 있으며, 우리가 알아보고 사용하고자 하는 것은 Kubernetes이다.

# Kubernetes(쿠버네티스)?

- Kubernetes는 컨테이너화된 애플리케이션의 배포, 확장 및 관리를 자동화하는 오픈 소스 시스템, 즉 컨테이너 오케스트레이션 도구이다.
- Kubernetes를 사용하면 컨테이너화된 애플리케이션을 배포 및 확장하는 데 수반되는 수동 프로세스의 많은 부분을 자동화 할 수 있다.
- 즉, 여러 Linux 호스트들을 클러스터링 할 수 있으며 이러한 클러스터를 쉽고 효율적으로 관리할 수 있다. 또한 Kubernetes는 On-premise, Private Cloud, Public Cloud 등 다양한 환경에서 적용이 가능하다.
- 쿠버네티스로 인하여 각각의 컨테이너를 직접 하나씩 관리하지 않아도 된다. 개발자는 여러 컨테이너에 걸친 애플리케이션의 배치도를 작성하는데, 여기에는 각 컨테이너가 네트워킹과 스토리지를 사용하는 방식 등의 세부 정보가 담겨 있다. 쿠버네티스는 런타임에서 나머지 부분을 처리한다. 또한 기밀이나 앱 환경 구성 같은 성가신 세부 관리도 맡는다.

# kubenretes의 다양한 배포판

> kubernetes 운영환경과 개발환경의 구축 방식이 다름을 이해할 수 있다.

### kubenretes의 다양한 배포판

##### 싱글 노드 클러스터 배포판 (개발 혹은 로컬환경용)

- docker for desktop: Windows 혹은 MacOs에 설치할 수 있는 도커 패키지이다. 이를 설치하고 환경설정에 들어가면, 쿠버네티스 기능을 활성화 할 수 있다. 이를 활성화하면 로컬에 싱글 노드 머신을 가진 클러스터가 생성이 된다. 해당 클러스터로 기본적인 쿠버네티스의 기능들을 테스트해볼 수 있다.
- minikube: 마찬가지로 싱글 노드 머신을 가진 클러스터를 제공한다. 대신 쿠버네티스 클러스터의 노드 머신의 driver(역할)를 다양하게 적용해줄 수 있다. 가령 VmWare, VirturalBox, Docker driver 등 다양한 가상 드라이버가 있는데, 이 중에 택1 하여 minikube 노드 머신으로 적용할 수 있다는 얘기다.
- 정정사항: 실습 중에 minikube로도 멀티 노드 클러스터를 구축할 수 있다는 걸 알게 되었다. 로컬에서도 멀티 노드로 실습이 가능하단 얘기다. 방법이 궁금하면 아래의 링크를 참고하길 바란다.
- https://velog.io/@pinion7/Kubernetes-%EB%A6%AC%EC%86%8C%EC%8A%A4-NodeSelector%EC%97%90-%EB%8C%80%ED%95%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%EC%8B%A4%EC%8A%B5%ED%95%B4%EB%B3%B4%EA%B8%B0
- 이 밖에도 k3s, Microk8s, k0s, kind(kubernetes in docker) 등이 있다.

##### 멀티 노드 클러스터 배포판 (운영환경용)

- Amazon EKS: Amazon Elastic Kubernetes Service의 약자로, 아마존 AWS에서 제공하는 managed 클라우드 쿠버네티스 클러스터 배포판이다.
- AKS: Azure Kubernetes Service의 약자로, 마이크로소프트사 Azure에서 제공하는 managed 클라우드 쿠버네티스 클러스터 배포판이다.
- GKE: Google Kubernetes Engine의 약자로, 구글 GCP에서 제공하는 managed 클라우드 쿠버네티스 클러스터 배포판이다.
- Red Hat: 쿠버네티스를 wrapping하여 Openshift라는 쿠버네티스 기반의 플랫폼을 제공해준다.

### kubernetes 운영 및 개발 환경

- 처음 쿠버네티스를 공부할 시점에는 운영환경보다는 개발환경에서 시작하는 것이 좋다. 우선 물리적으로 기본 세팅부터 스케일 차이가 크다.
- 아래는 쿠버네티스 안내서를 보면 알 수 있는 내용이지만 일단 각각의 특징을 간단히 서술해보겠다.
  운영환경:
- 쿠버네티스를 운영환경에 설치하기 위해선 최소 3대의 마스터 서버와 컨테이너 배포를 위한 n개의 노드 서버가 필요하다.
- 설치 과정이 복잡하고 배포 환경(AWS, GCP, Azure 등)에 따라 세팅 방법도 다 다르다.
  개발환경:
- 개발환경은 마스터와 노드를 하나의 서버에 설치하여 손쉽게 관리하는 방식으로 구축할 수 있다.
- 언급했듯, 대표적인 개발 환경 구축 방법으로 minikube, k3s, docker for desktop, kind 등이 있다.

### kubernetes 환경 선택과 minikube

- 이러한 이유로 처음 공부할 때 운영환경으로 바로 들어서는 것은 적합하지 않다고 할 수 있다.
- 사실 어떤 기술을 학습하든 처음에는 개발(혹은 로컬)환경에서 진행하는 게 옳다고 생각한다.
- 개발 환경을 구축할 수 있는 툴 중에서도, 대부분의 환경에서 사용할 수 있고 간편하다고 여겨지며, 오픈 소스인 minikube를 사용해볼 생각이다.
- 사실 쿠버네티스를 운영환경에서 설치하는 것은 매우 중요한 과정이고 보통일이 아니다. 다만, 처음 공부할 땐 설치보단 실질적인 사용법을 익히는 게 중요하기 때문에 개발환경이 적합한 것이다. minikube는 그 역할을 해주기에 적절한 툴이다.
- minikube는 가벼운 쿠버네티스 구현체이며, 로컬 머신에 VM을 만들고 하나의 노드로 구성된 간단한 클러스터를 생성한다.
- minikube는 그래서 빠르게 로컬에 쿠버네티스를 구성하고 테스트가 가능한 장점은 있지만, 클라우드 플램폿에서만 사용가능한 기능(예: ALB, NLB, EBS in AWS) 혹은 멀티 노드 환경에서 사용하기 적합한 리소스(예: DaemonSet, Affinity, Taint, Toleration)들을 다루는 데에는 제약이 생기거나 의미를 상실하게 된다.

참고 1: m1 환경에서의 minikube는?
쿠버네티스 안내서에 따르면 minikube는 windows, macOS, linux에서 사용할 수 있고 다양한 가상 환경(Hyperkit, Hyper-V, Docker, VirtualBox등)을 지원하여 대부분의 환경에서 문제없이 동작합니다. 라고 서술되어있다.
하지만 이 중에 m1은 논외다. 오직 docker 드라이버 사용이 강제된다.

참고 2: 프로덕션(운영환경) 레벨의 쿠버네티스를 구축하는 3가지 방법
온프레미스 인프라 + 커스텀 클러스터 구축: 회사 자체 서버 환경에 쿠버네티스 클러스터를 구성하는 방법이다. 온프레미스 방식을 택하면 클라우드 의존성은 최소화 되지만, 직접 서버를 운영하고 유지보수해야하는 관리 복잡도는 증가한다. 게다가 직접 쿠버네티스 클러스터도 구축하고 클러스터 내부의 각 컴포넌트 관리까지해야하는 고통까지 짊어지게 될 것이다. (참고로 커스텀 클러스터를 구축하려면 다음의 도구들이 필요하다. => kops / kubespray / kubeadm 등)
클라우드 인프라 + 커스텀 클러스터 구축: AWS EC2같은 클라우드 서버 환경에 쿠버네티스 클러스터를 구성하는 방법이다. 서버 인프라 관리 부담은 덜을 수 있지만, 온프레미스와 마찬가지로 자체 커스텀 쿠버네티스 클러스터 구축을 해야하므로 부담을 온전히 내려놓긴 어렵다.
클라우드 인프라 + 매니지드 클러스터 사용: EKS, GKE, AKS 등을 사용하는 방법이다. 관리의 부담을 최소화 시키고 오직 쿠버네티스를 이용하는데에만 초점을 맞출 수 있다.

- 솔직히 kubernetes의 골격이나 구조가 되는 용어들은 당장은 이해하기 어려운 말들의 향연이다.
- 따로 kubernets 클러스터와 구성 요소들을 분석해보는 블로깅을 통해 상세하게 다룰 예정이다.
- 당장은 그렇구나 하고 넘어가고, kubernets 블로깅 시리즈가 어느 정도 진행된 중간 시점에 다시 읽어보는 걸 추천한다.
- 일단은 kubernets 실전 학습을 지속하면서 천천히 친숙함을 높여가자.

# M1 구축

### m1 환경과 kubernetes 개발환경 구축 문제

- 위에서 kubernetes 개발환경을 구축하기 위한 툴로 minikube를 사용하겠다고 선언하였다. 그리고 이를 진행함에 있어 m1 환경이 불리한 사실도 안내하였다.
- 사실 쿠버네티스 안내서를 그대로 따라해보다가 간단한 배포실습 과정에서 영광의 삽질을 경험하였다. 블로깅을 하게 된 근원이다. 고통 끝에 쿠버네티스 공식문서에서 포트 포워딩 방법을 찾아 결국 해결은 해냈지만 근본적인 해결책이 될 수는 없었다.
- 문제의 가장 큰 핵심 중 하나는 minikube의 버전이었다. 이를 한 단계 다운그레이드하여 해결해낼 수 있었다. 하지만 쿠버네티스 안내서에 이를 소개하고 있지는 않다. 그 설치방법을 안내하고자 한다.

# kubernetes 개발환경 세팅

1. homebrew로 minikube 설치

```bash
$ brew install minikube
```

맥의 강점이다. Homebrew를 통해 무슨 툴이든 간편 설치가 가능하다. 하지만 자동적으로 최신버전을 설치해준다는 게 문제다. 즉, minikube(1.25.2)가 설치된다. 이 방법은 걸러주자.

2. 직접 binary 다운으로 minikube 설치 (버전 선택 가능)

```bash
$ curl -Lo minikube https://github.com/kubernetes/minikube/releases/download/v1.25.1/minikube-darwin-arm64 && chmod +x minikube
$ sudo install minikube /usr/local/bin/minikube
```

m1 유저는 minikube(1.25.1) 버전을 설치를 해야한다.
이는 직접 이전 릴리즈 버전을 깃헙 레포를 통해 받는 방법이다.
중요한 건 다운 및 설치 경로이다. 반드시 루트(~) 경로를 기준으로 진행해야 한다.
설치될 경로는 아래와 같아야한다.

```
/usr/local/bin/minikube
```

3. minikube 설치 확인 (버전 확인)

```bash
$ minikube version
minikube version: v1.25.1
```

version 커맨드로 설치 확인을 해주자.

정상적으로 설치되었다면 이와 같이 출력될 것이다.

4. minikube 실행 (driver 선택)

```bash
$ minikube start --driver=docker
```

이제 minikube를 돌릴 가상 드라이버을 선택해야 하는데, 말했듯 Hyperkit, Hyper-V, Docker, VirtualBox 중 m1이 쓸 수 있는 건 Docker 드라이버 단 하나다.
마지막에 done 뜨면 된다.

5. homebrew로 kubectl 설치

```bash
$ brew install kubectl
```

- kubectl도 설치해주자.
- kubectl은 쿠버네티스컨트롤의 약자로서, 큐브컨트롤 정도로 줄여서 읽을 수 있다.
- 이름에서 유추할 수 있듯이 쿠버네티스 커맨드 CLI 도구다. 이를 통해 kubernetes 클러스터에 명령어를 전달할 수 있다.
- 여기까지 완료하면 기본 세팅은 끝이다.

참고 1: kubernetes 버전 문제가 발생한다면?

```bash
$ minikube delete
$ minikube start --kubernetes-version=v1.23.1
```

- 어쩌면 kubernetes 1.24 버전 이상인 경우, 예측하지 못한 문제가 발생할 수도 있다.
- 이 때는 다운그레이드가 해결 방법이 될 수 있다. 만약 다음 챕터 3의 실습이 정상적으로 수행되지 않는다면 돌아와서 이 과정을 추가로 수행하는 걸 추천한다.

# docker와 kubernetes 각각으로 배포실습을 하고 간단한 차이를 인지해본다.

1. .yml 파일 준비

- 이미 도커 컴포즈에 대해선 안다고 가정하고 진행하겠다. 도커 컴포즈에 대한 지식이 없다면 일단 블로그의 도커 컴포즈 관련 글을 읽어보고 오길 추천한다.
  - https://velog.io/@pinion7/%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%95%B1%EC%9D%84-%EA%B5%AC%EC%B6%95%ED%95%B4%EA%B0%80%EB%A9%B0-Docker-Compose%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%ED%99%9C%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
- 빠르고 간단한 실습 진행을 위해 아래 쿠버네티스 안내서의 소스를 활용하겠다. 아래 링크에 각각 들어가 소스를 복사하여 yml 파일을 만든다. 경로는 편한대로 지정해주자.
- docker-compose.yml: https://subicura.com/k8s/code/guide/index/docker-compose.yml
- wordpress-k8s.yml: https://subicura.com/k8s/code/guide/index/wordpress-k8s.yml

# docker로 배포 실습

1. docker-compose로 다중 컨테이너 서비스 실행

```bash
$ docker-compose up -d
```

-d 옵션은 detach(분리) 시키는 것이다. 즉, 컨테이너 실행과 별개로 현재 터미널로 빠져나올 수 있게 해준다.

2. 생성한 컨테이너 리스트 확인

```bash
$ docker ps
```

- 테이너 리스트를 확인한다. wordpress와 maraidb 서버가 각각 띄워졌음을 알 수 있다. docker-compose로 인해 하나의 서비스 영역에서 존재할 수 있게 된다.
- yml에 30000:80 포트로 매핑해두었는데, 그것도 잘 반영되었음을 확인할 수 있다.
- 참고로 맨아래 컨테이너는 minikube start할 시점에 생성 및 실행된 것이다.

# kubernetes로 배포 실습

1. kubectl로 kubernetes 클러스터 생성

```bash
$ kubectl apply -f wordpress-k8s.yml
```

-f 옵션은 뒤에 명확한 파일명을 명시해주고 싶을 때 사용한다.
deployment, service가 각각 생성되었다는 로그를 볼 수 있다.

2. 생성된 클러스터와 여러 컴포넌트 리스트 확인

```bash
$ kubectl get all
```

- pod, service, deployment, replicaset을 모두 확인할 수 있는 명령어이다. 물론 각각을 확인하는 명령어도 존재한다. (추후 블로깅하면서 자연스레 다룰 예정)
- pod 상태가 최초엔 ContatinerCreating임을 알 수 있다.
- 잠시 텀을 두고 다시 kubectl get all을 입력해보면 Running으로 변한 걸 확인할 수 있다.
- 이때부터 클러스터가 활성화 된 것이며, 외부에 노출되어 있는 minikube ip 주소만 파악하면 접속이 가능해진다.
- 다음과 같은 형식으로 입력하면 된다.
- {외부 노출 ip 주소}:{오픈된 NodePort}
  - {매핑된 포트}는 :(콜론)을 유심히 보면 알 수 있다.
  - 여기선 80(Pod의 Port)을 타깃으로 하는 32374번의 NodePort가 오픈된 것을 알 수 있다.
  - {외부 노출 ip 주소}는 minikube ip 커맨드로 확인할 수 있다.
- kube ip 주소는 minikube start를 통해 생성 및 실행된 컨테이너 서버의 주소이다.

https://velog.io/@pinion7/macOs-m1-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-kubernetes-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0

그러나 안된다.

- m1에서 docker driver를 사용할 시에 생기는 한계점이다. (다른 운영체제는 문제 없이 가능하다.)
- 일단 해당 주소를 로컬에 포트 포워딩(외부에 접근 가능 주소 노출)하여 해결하는 방법이 있다.

4. port-forwarding 실행

```bash
$ kubectl port-forward service/wordpress 4000:80
```

kubectl port-forward service/{서비스명} {로컬 포트}:{서비스 포트} 형태로 입력하면 된다.
이는 쿠버네티스 공식 홈페이지에 가면 확인할 수 있다.

kubectl port-forward service/wordpress 4000:80

4000 -> 80으로 포워딩 됐다고 친절하게 알려준다.
참고로 여기선 -d 옵션을 따로 줄 수가 없어서, forwarding 상태를 유지하면서 새로운 커맨드를 입력하고 싶다면 터미널을 새롭게 띄워야 한다.

5. port-forwarding 접속 결과

- 로컬 4000으로 접속에 성공하였음을 알 수 있다.
- 다만 이 방식은 NodePort를 통한 접근은 아니다. 내부 ClusterIP를 로컬에 포트 포워딩한 결과이다.
- 다행히 NodePort를 통한 접근 방법도 있다. minikube가 제공한다.

6. minikube로 NodePort 접근 결과

```bash
$ minikube service wordpress
```

minikube service {서비스명} 커맨드를 사용하면 된다.
minikube service wordpress

- 커맨드를 입력하면 일단 최종 target port가 보인다. 최종적으로 도달하고자 하는 오브젝트는 Pod이기 때문에, 이건 Pod에 붙는 Port를 의미한다.
- 다만 클러스터 내부에 있는 Pod를 외부에서 접근할 수는 없기 때문에, NodePort가 외부 트래픽을 받을 수 있는 외부 노출 URL(192.168.49.2:32374)을 만들어 준 것이다. 이렇게 NodePort를 통하면 Pod에 트래픽이 전달될 수 있다.
  - 원래는 192.168.49.2:32374로 접근이 가능해야 하는데, 말했듯 m1 운영체제의 한계로 불가능하다.
- 그래서 NodePort url을 로컬에 포워딩 할 수 있어야 하는데, minikube service 커맨드가 그걸 가능하게 해준다.
  - 보다시피 포워딩된 로컬 url(127.0.0.1:63828)이 제공된 것이다. (참고로 로컬 포트는 랜덤하게 지정된다)
- minikube 커맨드는 동시에 해당 로컬 url로 browser를 아래처럼 자동으로 띄워주기도 한다.
  - 성공적으로 접속되었다.
  - 당연히 다 알겠지만 127.0.0.1 == localhost 다.

m1 환경에선 이렇게 클러스터 외부에서 트래픽을 넘기려면 추가적인 포트 포워딩을 해주는 수밖에 없다. 불편한 감이 없지는 않지만, 일단은 감안하고 실습을 이어가야할 것 같다.

# 실습으로 살펴본 docker와 kubernetes

- yml 파일로 본 docker와 kubernetes의 구조적 차이

  - docker: 구조가 간단하다. docker의 기본 단위는 컨테이너다.
  - docker-compose.yml을 보면, 하나의 Service 안에 컨테이너가 모두 포함되어 있다. 즉, compose 진행을 위해 필요한 명세는 2개 이상의 컨테이너와 포트 매핑, 기타 환경변수 정도이다.
  - kubernetes: 구조가 복잡하다. kubernetes의 기본 단위는 컨테이너가 아닌 클러스터이다. 클러스터는 최소 1개 이상의 노드로 구성이 되고, 노드에 띄워지는 워크로드를 구성하는 요소들을 오브젝트라고 칭한다. wordpress-k8s.yml 파일을 보면, wordpress 워크로드와 mysql 워크로드 각각에 Deployment & Service 리소스로 만든 오브젝트가 존재한다. 그리고 그 안에는 메타데이터, 컨테이너, 환경변수, 포트 등이 상세하게 명세되어 있다.

- docker와 kubernetes에 대한 현재까지의 지식
  - 구조 파악을 통해 확인할 수 있는 차이는, 배포에 있어 필요한 명세나 스케일이 확연히 다르다는 것이다. 깊게 하나하나 공부하지 않은 현 상태에서 아직 명확한 차이를 짚을 수는 없다.
  - 또한 분명한 건 kubernetes를 사용한다고 하여 docker를 배제하는 것은 아니다. minikube만 봐도 알 수 있듯이, 분명 kubernetes 내부에서 docker에 대한 의존성을 가지고 있다. kubernetes 자체적으로 docker를 nesting해서 사용하는 것이 아닐까 싶다.
  - 명확한 kubernetes의 구조 및 철학을 이해하려면 일단 클러스터와 주요 골격이 되는 노드 및 각종 컴포넌트, 오브젝트 등의 개념부터 알아야 할 것으로 보인다. 이는 추후 블로깅에서 자세히 다뤄보겠다.
