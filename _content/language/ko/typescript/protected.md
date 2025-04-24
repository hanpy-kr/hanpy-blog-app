
# TypeScript Protected

protected는 클래스의 멤버(속성 및 메서드)에 적용하여 해당 멤버가 해당 클래스와 그 자식 클래스에서만 접근 가능하도록 하는 접근 제한자입니다. private는 해당 클래스 내부에서만 접근 가능한 반면, protected는 자식 클래스에서도 접근할 수 있습니다.


## 기본 형태

```TypeScript title="protectec" showLineNumbers
class Parent {
  protected protectedProperty: string;

  constructor(protectedProperty: string) {
    this.protectedProperty = protectedProperty;
  }

  protected protectedMethod() {
    console.log('This is a protected method');
  }
}

class Child extends Parent {
  display() {
    console.log(this.protectedProperty); // 자식 클래스에서 접근 가능
    this.protectedMethod(); // 자식 클래스에서 호출 가능
  }
}

const parent = new Parent('Hello');
// parent.protectedProperty; // 오류: 외부에서 접근 불가
// parent.protectedMethod(); // 오류: 외부에서 접근 불가

const child = new Child('World');
child.display(); // "World"와 "This is a protected method" 출력

```

## 특징
- 클래스 내부 및 자식 클래스에서 접근 가능
protected로 선언된 멤버는 정의된 클래스와 이를 상속받은 클래스 내에서만 접근 가능합니다.

- 외부 접근 불가
클래스의 인스턴스를 통해 protected 멤버에 직접 접근하려고 하면 컴파일 오류가 발생합니다.


## private와 protected의 차이

키워드	접근 가능 위치
private	해당 클래스 내부에서만 가능
protected	해당 클래스와 자식 클래스에서 가능


| 키워드 | 접근 가능 위치   | 
| ---- | ------ | 
| private   | 해당 클래스 내부에서만 가능 | 
| protected   | 해당 클래스와 자식 클래스에서 가능 | 

## 실습

protected는 클래스 계층 구조를 설계할 때 유용합니다. 예를 들어, 부모 클래스에서 자식 클래스가 사용할 내부 로직을 정의하고, 이를 외부에 노출하지 않고 캡슐화하려는 경우에 적합합니다.


```TypeScript title="protectec" showLineNumbers
class Animal {
  protected makeSound(): void {
    console.log('Some generic animal sound');
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log('Woof! Woof!');
  }

  bark(): void {
    this.makeSound(); // 부모 클래스의 protected 메서드 호출
  }
}

const dog = new Dog();
dog.bark(); // "Woof! Woof!" 출력
```


protected 멤버는 상속 계층 구조 외부에서는 완전히 숨겨져 있습니다. 인터페이스에서는 protected를 사용할 수 없습니다. 접근 제한자는 클래스에서만 유효합니다.



TypeScript의 protected는 클래스를 설계할 때 중요한 도구입니다. 이 키워드를 활용하여 코드의 가독성과 확장성을 높이고, 객체 지향 프로그래밍의 캡슐화 원칙을 준수합니다.