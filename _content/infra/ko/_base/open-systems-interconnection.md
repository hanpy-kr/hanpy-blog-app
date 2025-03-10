---
deployment: true
category: Infra
title: 'OSI 7계층'
summary: 'OSI(Open Systems Interconnection) 7계층은 국제 표준화 기구(ISO)에서 개발한 컴퓨터 네트워크 프로토콜 모델에 대하여 알아봅시다.'
pageKey: infra_osi_7
lng: KOR
publishedAt: 2024-03-01
---

# OSI(Open Systems Interconnection) 7 Layer

OSI(Open Systems Interconnection) 7계층은 국제 표준화 기구(ISO)에서 개발한 컴퓨터 네트워크 프로토콜 모델로, 네트워크 통신 과정을 7개의 계층으로 분리하여 각 계층이 특정 기능을 수행하도록 하는 것을 목적으로 합니다. 초기 네트워크는 만들어진 회사마다 다른 통신 시스템이 존재했기 때문에 통신 과정에서 충돌이 발생할 수 밖에 없는 상황이었습니다. 따라서 네트워크 구조에 대한 호환성을 향상시키고 구조 통합을 만들어 낸 것이 바로 OSI라고 할 수 있습니다.

<br />

각 계층은 책임 범위 내에서 독립적으로 동작합니다. 따라서 문제 발생 시 해결하는 시간을 단축 시키고 전체 시스템의 안정성과 신뢰성을 높일 수 있습니다. 이러한 계층적 구조는 표준화되어 있고, 인터페이스 정의가 가능하기 때문에 새로운 기술이나 장비 도입하는것에 유연해 진다고 할 수 있습니다. 또한 계층은 상하 구조를 가지기 때문에 4계층이 정상 작동하려면, 1 ~ 3계층이 완벽하게 작동해야합니다. 각각의 계층에 대해 알아보도록 합니다.

<br />

## 1. 물리 계층(Physical Layer)

물리적 매체를 통해 데이터를 전송하기 위해 요구되는 기능들을 정의합니다. 전기적, 물리적, 기계적인 특성을 결정하고 데이터를 전시 신호, 전파 등으로 변환합니다. 기본적으로 컴퓨터는 0, 1로 데이터를 정의합니다. 하지만, 전자기파의 범위는 이론적으로 0에서 부터 무한대의 주파수 범위를 가지기 때문에, 상호 컴퓨터 간의 통신을 위해서는 아날로그 신호를 전기적인 신호로 변경하는 과정이 필요하다고 할 수 있습니다. 0, 1을 아날로그 신호로 인코딩(Encoding)하여 전자기파로 전송하고, 아날로그 신호를 0, 1로 나열하여 해석하는 시 디코딩(Decoding)합니다. 데이터 전송 단위는 Bit 단위이며, 이러한 내용을 물리 계층에서 정의합니다.

<br />

## 2. 데이터 링크 계층(Data Link Layer)

네트워크 계층 패킷 데이터를 물리적 매체에 실어 보내기 위한 계층입니다. 데이터 링크 계층(Data Link Layer)에서 사용하는 단위로는 프레임이라고 합니다. 이는 물리적인 매체를 통해 전송되는 데이터의 논리적인 그룹을 의미합니다. 프레임의 전송을 위해서는 데이터를 일정한 크기로 분할해야 하는데, 이를 프레이밍(Framing)이라고 합니다. 프레이밍 시 프레임을 구분하는 작업을 수행하며, 시작과 끝은 시작 프레임 마커와 종료 프레임 마커로 식별이 가능합니다. 이러한 프레임 마커는 특수 비트 패턴을 첨부하여 시작과 끝을 식별할 수 있습니다.

<br />

데이터 링크 계층에서는 물리 계층에서 발생한 오류를 확인하는 기능도 수행합니다. 프레임 생성 후 프레임의 헤더에 발신자/수신자의 물리적 주소(MAC)을 추가하고, 데이터가 손상되지 않도록 흐름제어를 통해 데이터 양을 조절합니다.

<br />

## 3. 네트워크 계층(Network Layer)

IP(Internet Protocol)는 네트워크 계층에 의해 헤더에 배치되며, IP을 활용하여 패킷을 라우팅합니다. 여기서 패킷은 데이터 전송 단위를 의미합니다. IP는 인터넷에서 데이터 패킷을 전송하기 위한 프로토콜 중 하나입니다. IP 주소는 PC에서 인터넷을 접속을 위해 고유받은 고유한 주소로 패킷을 보내는 송신자/수신자를 식별할 수 있습니다. 수신자 IP 주소를 참고하여 최적의 경로를 찾습니다. 라우팅(Routing)은 네트워크가 연결되어 있을때, 데이터 패킷을 목적지까지 효율적으로 전달 할 수 있는 경로를 결정하는 과정을 의미합니다.

<br />

IP는 비연결형 프로토콜로, 패킷을 전송하기 전에 미리 연결을 설정하지 않고 전송합니다. 이러한 특성 때문에 IP는 신뢰성과 안정성 측면에서 한계가 있으며, 이를 보완하기 위해 상위 계층에서는 TCP(Transmission Control Protocol)와 같은 신뢰성 있는 프로토콜을 함께 사용합니다.

<br />

## 4. 전송 계층(Transport Layer)

전송 계층은 데이터를 안정적으로 전송하는 기능을 수행합니다.
예를 들어, 송신 측이 전송하고자 하는 데이터가 크다면 전송 계층에서 이 데이터를 여러 개의 작은 조각으로 나누어 전송할 수 있습니다. 이때, 각각의 조각은 일련번호를 부여받아 전송되며, 수신 측에서는 일련번호를 이용하여 조각들을 순서대로 재조합합니다. 또한, 전송 중에 발생하는 데이터 손실이나 오류를 검출하고 복구하기 위해 체크섬과 같은 오류 검출 코드가 추가됩니다. 만약 데이터 전송 중에 오류가 발생하면, 송신 측에서 해당 오류를 감지하고 해당 조각을 다시 전송하는 등의 복구 작업이 이루어집니다.

<br />

전송 계층에서 전송에 사용될 프로토콜을 결정하는데, 프로토콜의 종류에는 TCP와 UDP가 있습니다.
TCP와 UDP는 각각 데이터 전송에 대한 다른 요구사항을 충족시키기 위한 프로토콜입니다. TCP는 신뢰성 있는 데이터 전송을 위해 사용되며, UDP는 빠른 데이터 전송을 위해 사용됩니다.

TCP (Transmission Control Protocol)는 신뢰성 있는 데이터 전송을 보장합니다.
데이터 전송 시, 패킷이 손실되지 않도록 보장하고, 순서대로 전달됩니다. 이를 위해 TCP는 3-way handshake와 같은 절차를 사용하여 연결을 설정하고, 패킷 전송 후 확인 응답을 받고, 연결 종료 시 4-way handshake를 수행합니다. 이러한 절차는 데이터 전송에 대한 신뢰성을 보장하며, 대용량 파일 전송과 같은 안정적인 데이터 전송에 적합합니다.
UDP (User Datagram Protocol)는 데이터 전송 속도를 중시하는 프로토콜입니다. 데이터 전송 시, 패킷이 순서와 신뢰성 없이 전송됩니다. 이는 패킷 전송 시간이 짧아져, 빠른 데이터 전송이 가능하다는 장점이 있습니다. UDP는 데이터 전송 속도가 중요한 실시간 응용 프로그램에서 사용됩니다. 예를 들어, 비디오 및 오디오 스트리밍, 게임, DNS 등에서 사용됩니다.

<br />

## 5. 세션 계층(Session Layer)

세션 계층에서는 어플리케이션간 통신을 위한 세션 관리를 합니다.

5~7 계층은 TCP/IP 모델에서는 응용 계층으로 통합됩니다. 5 ~ 7 계층은 Application의 네트워크에서 수행되여, 상위 계층 또는 소프트웨어 계층으로 불리기도 합니다.

<br />

## 6. 표현 계층(Presentation Layer)

응용계층으로부터 받은 데이터를 수신측에 알맞는 코드 및 형식으로 암호화 하거나 복호화를 진행합니다.

<br />

## 7. 응용 계층(Application Layer)

응용 계층(Application layer)은 응용 프로세스와 직접 상호작용하는 소프트웨어를 지원하는 기능을 담당합니다. 여기서 우리가 자수 사용하는 HTTP, DNS, SSH와 같은 프로토콜이 사용하게 됩니다.

https://mundol-colynn.tistory.com/167

## 정리

결론적으로, OSI 7계층 모델은 서로 다른 네트워크간의 효율적인 통신을 위해, 통신 과정을 표준화하기위해 등장했습니다. 1980년대 초반, OSI 7계층 모델은 표준화된 네트워크 프로토콜의 기본 구조로 채택되었습니다. 그러나 이 시기에는 인터넷이 아직 상용화되지 않은 상황이었으며, OSI 7계층 모델을 지원하는 네트워크 제품은 제한적이었습니다.

반면에, 1980년대 후반 인터넷이 성장하면서 TCP/IP 프로토콜이 발전하였습니다. TCP/IP는 OSI 7계층 모델보다 단순하고 간단한 구조를 가지고 있으며, 네트워크에서 데이터를 전송하기 위해 최적화되어 있었습니다.

이러한 특성은 TCP/IP를 표준화하고, 대량 생산하는 데 있어 효율적이었습니다.

또한, 인터넷에서 TCP/IP 프로토콜이 표준으로 채택되면서, 이를 지원하는 네트워크 제품들이 많이 개발되었습니다. 이로 인해 TCP/IP 프로토콜은 OSI 7계층 모델보다 널리 사용되게 되었고,

OSI7계층 프로토콜과 TCP/IP 프로토콜의 상호 운용성이 개선됨에 따라 OSI 7계층은 점차 TCP/IP 모델로 대체되었습니다.
