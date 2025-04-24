# Typescript

> 클래스도 함수이고 기존 프로토타입 기반 패턴의 Syntactic sugar일 뿐이다. Typescript가 지원하는 클래스는 ECMAScript 6의 클래스와 상당히 유사하지만 몇 가지 Typescript만의 고유한 확장 기능이 있다

클래스 몸체에 메소드만을 포함할 수 있다. 클래스 몸체에 클래스 프로퍼티를 선언할 수 없고 반드시 생성자 내부에서 클래스 프로퍼티를 선언하고 초기화한다.

```javascript
// person.js
class Person {
  constructor(name) {
    // 클래스 프로퍼티의 선언과 초기화
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}
```

위 예제는 ES6에서 문제없이 실행되는 코드이지만 위 파일의 확장자를 ts로 바꾸어 Typescript 파일로 변경한 후, 컴파일하면 아래와 같이 컴파일 에러가 발생한다.

```
person.ts(4,10): error TS2339: Property 'name' does not exist on type 'Person'.
person.ts(8,25): error TS2339: Property 'name' does not exist on type 'Person'.
```

Typescript 클래스는 클래스 몸체에 클래스 프로퍼티를 사전 선언하여야 한다.

```typescript
// person.ts
class Person {
  // 클래스 프로퍼티를 사전 선언하여야 한다
  name: string;

  constructor(name: string) {
    // 클래스 프로퍼티수에 값을 할당
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}

const person = new Person("Lee");
person.walk(); // Lee is walking
```

## 접근 제한자

- Typescript 클래스는 클래스 기반 객체 지향 언어가 지원하는 접근 제한자(Access modifier) public, private, protected 를 지원하며 의미 또한 기본적으로 동일하다.

- 단, 접근 제한자를 명시하지 않았을 때, 다른 클래스 기반 언어의 경우, 암묵적으로 protected로 지정되어 패키지 레벨로 공개되지만 Typescript의 경우, 접근 제한자를 생략한 클래스 프로퍼티와 메소드는 암묵적으로 public이 선언된다. 따라서 public으로 지정하고자 하는 멤버 변수와 메소드는 접근 제한자를 생략한다

## 생성자 파라미터에 접근 제한자 선언

- 접근 제한자는 생성자 파라미터에도 선언할 수 있다. 이때 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언되고 생성자 내부에서 별도의 초기화가 없어도 암묵적으로 초기화가 수행된다.

- 이때 private 접근 제한자가 사용되면 클래스 내부에서만 참조 가능하고 public 접근 제한자가 사용되면 클래스 외부에서도 참조가 가능하다.

## readonly 키워드

- Typescript는 readonly 키워드를 사용할 수 있다. readonly가 선언된 클래스 프로퍼티는 선언 시 또는 생성자 내부에서만 값을 할당할 수 있다. 그 외의 경우에는 값을 할당할 수 없고 오직 읽기만 가능한 상태가 된다. 이를 이용하여 상수의 선언에 사용한다.

## static 키워드

ES6 클래스에서 static 키워드는 클래스의 정적(static) 메소드를 정의한다. 정적 메소드는 클래스의 인스턴스가 아닌 클래스 이름으로 호출한다. 따라서 클래스의 인스턴스를 생성하지 않아도 호출할 수 있다. 정적 메소드는 인스턴스로는 호출할 수 없고 클래스로 호출해야한다.

## 추상 클래스

추상 클래스(abstract class)는 하나 이상의 추상 메소드를 포함하며 일반 메소드도 포함할 수 있다. 추상 메소드는 내용이 없이 메소드 이름과 타입만이 선언된 메소드를 말하며 선언할 때 abstract 키워드를 사용한다. 추상 클래스를 정의할 때는 abstract 키워드를 사용하며, 직접 인스턴스를 생성할 수 없고 상속만을 위해 사용된다. 추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여야 한다.

추상 클래스는 직접 인스턴스를 생성할 수 없고, 추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현해야한다.

ts 실습 : ts-node test.ts

##### 참고

- js class : https://poiemaweb.com/es6-class
- ts class : https://poiemaweb.com/typescript-class
- ts sample : https://refactoring.guru/design-patterns/singleton/typescript/example
