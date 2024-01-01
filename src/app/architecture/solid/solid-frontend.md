# 프론트 엔드에서 구조를 추구하지 않는 이유

- UI는 자주 변경되므로 구조를 적용하는 것은 오버 엔지니어링일 수 있다.
- 프레임워크 레벨에서 코드를 강제하는 규칙이 없으므로, 제대로 준수되지 않을 규칙이라면 의미가 없다.
- OOP(로 대변되는 어떠한 방법론들)는 백엔드 개발자들이 쓰는 것이고, 함수 중심인 프론트엔드에는 적절치 않다.

# 좋은 소프트

좋은 소프트웨어 시스템은 깔끔한 코드(clean code)로부터 시작한다. 좋은 벽돌을 사용하지 않으면 빌딩의 아키텍처가 좋고 나쁨은 그리 큰 의미가 없는 것과 같다. 반대로 좋은 벽돌을 사용하더라도 빌딩의 아키텍처를 엉망으로 만들 수 있다. 그래서 좋은 벽돌로 좋은 아키텍처를 정의하는 원칙이 필요한데, 그게 바로 SOLID다.
SOLID 원칙은 함수와 데이터 구조를 클래스로 배치하는 방법, 그리고 이들 클래스를 서로 결합하는 방법을 설명해준다. '클래스'라는 단어를 사용했다고 해서 SOLID 원칙이 객체 지향 소프트웨어에만 적용된다는 뜻은 아니다. 여기에서 클래스는 단순히 함수와 데이터를 결합한 집합을 가리킨다. 소프트웨어 시스템은 모두 이러한 집합을 포함하며, 이러한 집합이 클래스라고 불릴 수도 있고 아닐 수도 있다. - 클린 아키텍처, 62p

# Solid 원칙 > Frontend

우선 위에서 언급한 SOLID 원칙들을 차례로 소개해보겠습니다. 개인적으로 이 중 **SRP**가 가장 중요하고, 그 다음으로 OCP, DIP가 중요하다고 생각하는 편입니다.

1. **SRP: 단일 책임 원칙 (Single Responsibility Principle)**

   - 콘웨이 법칙에 따른 따름정리: 소프트웨어 시스템이 가질 수 있는 최적의 구조는 시스템을 만드는 조직의 사회적 구조에 커다란 영향을 받는다. 따라서 **각 소프트웨어 모듈은 변경의 이유가 하나, 단 하나여야만 한다.** (= 하나의 모듈은 하나의 사용자 또는 **이해관계자**에 대해서만 책임져야 한다.)

   <aside>
   📕 > (콘웨이 법칙) 시스템을 설계하는 조직이라면 어디든지 그 조직의 의사소통 구조와 동일한 구조의 설계를 만들어 낼 것이다.

   많은 팀으로 구성되며 관심사가 다양한 조직에서 어떤 시스템을 개발해야 한다면, 각 팀이 독립적으로 행동하기 편한 아키텍처를 반드시 확보하여 **개발하는 동안 팀들이 서로를 방해하지 않도록** 해야 한다. 이러한 아키텍처를 만들려면 **잘 격리되어 독립적으로 개발 가능한 컴포넌트 단위로 시스템을 분할**할 수 있어야 한다. 그래야만 이들 컴포넌트를 독립적으로 작업할 수 있는 팀에 할당할 수 있다. - 클린 아키텍처, 158p

   </aside>

요구사항을 반영하다 보면, 컴포넌트 내부에 다양항 요구사항들이 반영되게 된다. 이런 경우에는 함수나 컴포넌트를 너무 공통화해서 다루기 보다는 ‘의도적 중복’을 통해 로직을 분리하는게 유리합니다.

2. **OCP: 개방-폐쇄 원칙 (Open-Closed Principle)**
   - 1980년대에 버트란트 마이어에 의해 유명해진 원칙이다. **기존 코드를 수정하기보다는 반드시 새로운 코드를 추가하는 방식으로 시스템의 행위를 변경할 수 있도록 설계**해야만 소프트웨어 시스템을 쉽게 변경할 수 있다는 것이 이 원칙의 요지다. 정리하면, 확장에는 열려있고 수정에는 닫혀있도록 한다.

우리가 알고 있는 개념 중에 가장 이 원칙에 부합하는 걸 꼽으라면 단연 컴파운드 컴포넌트 패턴(CCP) 을 꼽겠습니다.

```jsx
<Card title="foo" content="bar" comments={comments} user={user} />
```

매번 코드가 추가되거나 수정될 때마다 Card 컴포넌트 전체에 변경이 발생하고 전파됩니다. 하지만 같은 요구사항을 CCP로 구현한다면 아래와 같다.

```jsx
<Card>
  <Card.Title>foo</Card.Title>
  <Card.Content>bar</Card.Content>
  {user ? (
    <Card.CommentsWithAuth comments={comments} />
  ) : (
    <Card.CommentsWithAnonymous comments={comments} />
  )}
</Card>
```

- SRP: `Card` 이하 각각의 서브 컴포넌트들이 명확한 책임을 가지도록 분리되어, 수정의 범위와 시점이 이전에 비해 구체적일 수 있도록 개선되었습니다.
- OCP: `Card` 에 기능을 추가하거나 변경하고 싶을 때 기존 코드를 전혀 건드리지 않고도 새로운 컴포넌트를 추가함으로써 기능을 수정하고 확장할 수 있는 설계가 되었습니다.

3. **LSP: 리스코프 치환 원칙 (Liskov Substitution Principle)**
   - 1988년 바바라 리스코프가 정의한, 하위 타입(subtype)에 관한 유명한 원칙이다. 요약하면, 상호 대체 가능한 구성요소를 이용해 소프트웨어 시스템을 만들 수 있으려면, 이들 구성요소는 반드시 서로 치환 가능해야 한다는 계약을 반드시 지켜야 한다.
4. **ISP: 인터페이스 분리 원칙 (Interface Segregation Principle)**
   - 이 원칙에 따르면 소프트웨어 설계자는 사용하지 않은 것에 의존하지 않아야 한다. (= 꼭 필요한 것에만 의존하도록 만들어야 한다)
5. **DIP: 의존성 역전 원칙 (Dependency Inversion Principle)**
   - 고수준 정책을 구현하는 코드는 저수준 세부사항을 구현하는 코드에 절대로 의존해서는 안 된다. 대신 세부사항이 정책에 의존해야 한다.

https://lean-mahogany-686.notion.site/3-2-SOLID-eb2358bcb6bd45d38d2eef0363642e1a