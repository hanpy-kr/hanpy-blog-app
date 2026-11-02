# 반응형

##### viewport 설정

가로폭 조정을 위해, HTML파일 내부의 <head> ...</head> 안에 다음과 같이 설정해 주어야 한다

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- 모바일 브라우저의 뷰를 실제 크기인 1로 설정하는것을 의미 한다 써주지 않는다면, 모바일 브라우저에서 나오는 글자가 매우 작게 표시되어서 읽을 수 없을 것이다

##### media query 적용

> 크게 screen과 print로 나뉘는데, screen은 일반적으로 모니터를 의미하며 PC,태블릿,스마트폰까지 의미한다 print는 말그대로 만들어진 웹사이트를 프린트 기기를 이용해 프린트 하는 것이다

1. 링크 미디어 쿼리

```html
<link rel="stylesheet" type="text/css" media="screen" href="cssscreen.css" />
<link rel="stylesheet" type="text/css" media="print" href="cssprint.css" />
```

2. @import로 미리어 쿼리 적용

```css
@import url(cssscreen.css) screen;
@import url(csspprint.css) print;
```

3. @media로 미디어 쿼리 적용

```css
@media screen{
  CSS 속성
}
```

##### 종합 정리

> (min-width:200px) and (max-width:480px) 라는 부분이 있는데 해상도에 따른 CSS파일을 따로 지정해줄 수 있다

```
<link rel="stylesheet" media="only screen and (min-width:200px) and (max-width:480px)
href="main.css">

@import url("main.css") only screen and (min-width:200px) and (max-width:480px);

@media only screen and (min-width:200px) and (max-width:480px) {
  css속성
}
```

##### 이미지 크기 조절

```css
.img_responsive {
  width: 100%;
  height: auto;
}
```

- 위의 방식이면 모든 모바일 기기라도 동일하게 보인다.
- max-width와 min-width를 이용하여 처리를 한다.

##### 웹페이지 처리방법

모바일 우선(Mobile First)

> 작은 가로폭부터 큰 가로폭 순서로 만들고, min-width를 이용합니다.

```css
A
@media ( min-width: 768px ) {
  B
}
@media ( min-width: 1024px ) {
  C
}
```

- 기본 모양은 A, 768px 이상일 때는 B, 1024px 이상일 때는 C가 적용됩니다.
- Bootstrap 등 대부분의 프레임워크는 모바일 우선으로 만들어져 있습니다.

데스크톱 우선(Desktop First)

> 큰 가로폭부터 작은 가로폭 순서로 만들고, max-width를 이용합니다.

```css
A
@media ( max-width: 1023px ) {
  B
}
@media ( max-width: 767px ) {
  C
}
```

- 기본 모양은 A, 1023px 이하일 때는 B, 767px 이하일 때는 C가 적용됩니다.

##### 개념

> 미디어 쿼리는 실제 적용하는 기기에 맞게끔 CSS 내부에 별도의 처리를 해주는 것이다

```css
@media (max-width: 767px) {
  //모바일
}

@media (min-width: 768px) and (max-width: 991px) {
  // 테블릿 세로
}

@media (min-width: 992px) and (max-width: 1199px) {
  // 테블릿 가로
}

@media (min-width: 1200px) {
  // 데스크탑 일반
}
```

- 스마트폰은 가로 ~768px(최대), 테블릿 세로인 경우 (최소)768px~992px(최대) , 가로화면은 (최소) 992px~1200px(최대), 데스크탑은 최소 1200px~ 로 나누자.
- 스마트폰은 세로 해상도를 기본, 테블릿은 가로를 세로를 기본으로 하고 가로를 추가 한다, 데스크탑은 가로를 기본으로 한다.

##### 실습

```css
.container {
  //전체를 담는 박스
  width: 100%;
  height: 1000px;
}

.itembox {
  //그림과 텍스트가 들어있는 칸
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.imgbox {
  //이미지 들어있는 박스
  width: 100%;
  height: auto;
  margin: 2%;
}

.image {
  //이미지
  width: 100%;
}

.textbox {
  //텍스트 들어있는 박스
  padding: 20px;
}

/* @media 를 사용해서 모바일화면(~767px) css를 만들자 */
@media (max-width: 767px) {
  .itembox {
    display: block; //  block으로 만들어 텍스트가 밑에 내려오게 만든다
  }
  .imgbox {
    //현재 가로크기에 맞게 꽉차게
    width: 90%;
    padding: 20px;
  }
  .textbox {
    //양쪽 정렬
    padding: 20px 20px 10px 20px;
    text-align: justify;
  }
}
```
