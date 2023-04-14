깃 최초등록 ------------------------------------------------------------------------------
git config -- 계정정보 설정
$ git config --global user.name "계정" 
$ git config --global user.email 이메일

git init -- 깃 초기화
$ git init  git add -- 로컬 저장소커밋
$ git add .  git commit -- 커밋
$ git commit -m "First commit git remote -- 레파지토리 등록 
$ git remote add origin #URL# git push -- 푸쉬
$ git push -u origin master 깃 Clone ------------------------------------------------------------------------------ git clone  
$ git cloen #URL#
원격 저장소 연결해제 ------------------------------------------------------------------------------ 
$ git remote remove origin  <- 깃연결 해제 
$ git remote -v  <- 연결해제 확인

비밀번호 변경시 인증오류
------------------------------------------------------------------------------ 
git 허브에서 비밀번호를 변경해서 인증오류 fatal: Authentication failed for 발생시
인증 삭제
$ git config --unset credential.helper

기타------------------------------------------------------------------------------ 
$ git config --list  : 설정정보조회
$ git status : 현재상태조회 ( 커밋상태, unstaging 정보 등 )

## 방금 커밋한 깃 git 시간 변경

```
$ git commit --amend --no-edit --date="Sat Dec 27 11:58:10 2023 +0900"
$ git commit --amend --no-edit --date="Tue Jan 1 15:31:38 2024 +0900"
$ git commit --amend --no-edit --date="2023-08-13"

$ git push origin -f main
```

커밋 날짜 변경(상대값)

> https://blacklobster.tistory.com/17

```
git commit --date "1 day ago" -m "커밋 메시지
```
