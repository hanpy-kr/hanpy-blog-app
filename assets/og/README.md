# OG 이미지 글꼴

글별 OG 이미지(`src/app/(blog)/[category]/[lng]/[...segments]/opengraph-image.tsx`)가 빌드 때 읽는 글꼴.
next/og(Satori)는 woff2를 읽지 못해 woff를 쓴다. 런타임에는 쓰지 않는다(이미지는 빌드 때 정적 생성).

| 파일 | 원본 | 내용 |
| --- | --- | --- |
| `HanpyOGSansKR-Bold.woff` | IBM Plex Sans KR Bold ([google/fonts](https://github.com/google/fonts/tree/main/ofl/ibmplexsanskr)) | 영문·라틴1·문장부호·화살표·원문자·한글 자모·완성형 한글 11,172자 전부. 글 제목용 |
| `JetBrainsMono-Medium.subset.woff` | JetBrains Mono Medium ([JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)) | ASCII와 `·—→`. 카테고리 줄·주소용 |

라이선스는 둘 다 SIL OFL 1.1 (`OFL-*.txt`). IBM Plex는 "Plex"가 예약 글꼴 이름이라, 줄인(subset) 파일은 글꼴 이름을 `Hanpy OG Sans KR`로 바꿨다.

다시 만들기 (fonttools):

```bash
pip install fonttools
U="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-205E,U+2190-21FF,U+2460-24FF,U+25A0-25FF,U+3000-303F,U+3131-318E,U+AC00-D7A3,U+FF01-FF5E"
pyftsubset IBMPlexSansKR-Bold.ttf --unicodes="$U" --flavor=woff --layout-features='kern,liga' --no-hinting --desubroutinize --output-file=tmp.woff
# 이름 바꾸기: name 테이블 1·4·6·16을 'Hanpy OG Sans KR' 계열로 (fontTools.ttLib.TTFont)
pyftsubset JetBrainsMono-Medium.ttf --unicodes="U+0020-007E,U+00B7,U+2014,U+2192" --flavor=woff --no-hinting --layout-features='' --output-file=JetBrainsMono-Medium.subset.woff
```
