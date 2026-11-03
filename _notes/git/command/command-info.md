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

## 까먹고 여러개 올렸을 시!!!

> rebase로 해야한다.

```bash
11239  git log
11240  git rebase -i 4488c9249f67cde57cd0bb82e9880bc2657e58aa  // 변경하고 싶은 바로 전 commit으로 돌아간다.
+ 변경하려는 커밋에 pick 글자를 edit로 변경하고 :wq!를 눌러서 빠져나간다. 그리고 아래의 명령어를 친다.
11241  git commit --amend --no-edit --date "2023-04-15"
11242  git rebase --continue // 반영된다.  만약 작업을 취소하려면 git rebase --abort 를 눌러준다.
11243  git rebase -i 4488c9249f67cde57cd0bb82e9880bc2657e58aa
11244  git commit --amend --no-edit --date "2023-04-16"
11245  git rebase --continue
11246  git rebase -i 4488c9249f67cde57cd0bb82e9880bc2657e58aa
11247  git commit --amend --no-edit --date "2023-04-17"
11248  git rebase --continue
11249  git rebase -i 4488c9249f67cde57cd0bb82e9880bc2657e58aa
11250  git commit --amend --no-edit --date "2023-04-18"
11251  git rebase --continue
```
