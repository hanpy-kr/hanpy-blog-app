---
deployment: true
category: Backend
title: 'Layered Architecture'
summary: '소프트웨어 시스템을 관심사 별로 여러개의 계층로 분리(계층화)한 아키텍처에 대해 알아봅시다.'
pageKey: Backend_Layered_Architecture_ko
lng: KOR
publishedAt: 2024-11-01
---

# Layered Architecture

레이어드 아키텍처(Layered Architecture)란 관심사 별로 여러개의 계층 분리한 이키텍처를 의미합니다.
이때 추상화된 인터페이스로만 소통을 합니다. 이 때, 인접한 하위 계층에 대해 요청을 보내는 것이 가능하고, 상위 계층이나 인접하지 않는 계층은 요청하지 못합니다.
이렇게 하위 계층은 인터페이스만 제공하여 상위계층은 모르고 요청만 받기만 합니다. 이를 단방향 의존성이라고 합니다.
일반적인 Layered Architecture는 4-tier로 나뉘지며, 세부적으로는 Presentation Layer / Business Layer / Persistence Layer / Database Layer로 불립니다.
세부 디테일한 분리 방법에 대해 알아봅시다.

<br />

#### Presentation Layer

사용자 혹은 클라이언트 시스템과 직접적으로 연결되는 부분입니다.

#### Business Layer

비즈니스 로직을 구현하는 부분이다. 실제로 시스템이 구현해야 하는 핵심 로직을 담당합니다.
Presentation Layer로 부터, 사용자의 요청을 전달받고 해당 요청을 실질적으로 처리하는 부분입니다.

#### Persistence Layer

데이터의 영구 저장과 관리를 담당하는 부분으로 웹 어플리케이션의 데이터베이스와의 상호작용을 처리하며, 데이터베이스와의 상호작용을 추상화한다.

#### Database Layer

실제 데이터베이스를 의미합니다.
