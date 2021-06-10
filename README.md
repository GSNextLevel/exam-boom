# 자격증 뿌시기

데모 페이지는 [exam.viassh.com](https://exam.viassh.com) 에서 확인하실 수 있습니다.

## 개발목적

1. 내가 AWS, GCP 자격증을 보다 쉽고 빠르게 취득하기 위해서
2. 기존의 examTopic 사이트에서 문제를 보고 공부할때 계속 로봇이냐고 물어봐서
3. 사내 고오급 능력자들의 집단지성을 통해 잘못된 문제를 고치고 명쾌한 해답을 얻기위하여

## 개발스택

### Frontend

#### `React`

Vue로 만 개발해보다가 React로 개발해보고 싶다는 생각이 들어서

#### `React-Bootstrap`

무난무난한 bootstrap

<br>

### Backend

#### `AWS Lambda`

1. Google DoC 에 모아둔 Dump 데이터를 잘 파싱하여 DB화
2. 문제 읽기
3. 댓글 읽기 / 쓰기
4. 리더보드 읽기

#### `AWS API Gateway`

#### `AWS DynamoDB`

4개의 테이블...

<br>

### Infra

#### `S3`

SPA(Single Page Application) React 빌드파일 업로드
정적 웹 호스팅 활성화
CF타고 S3로 오는게 아니라 Direct로 S3로 접근하는 경우 차단 - S3 policy

#### `Cloudfront`

페이지 캐슁
S3로 referer 넘겨주기

#### `WAF`

허용된 IP 만 페이지 접근할 수 있도록
허가되지 않은 IP일 경우 특정 문제 or 코드를 통해 승인되면 WAF에 IP 등록절차 진행

#### `Github Action`

Local -> Push to github branch(DEV) -> Merge to Master -> Github Action triggered -> PreBuild -> Build -> Deploy to S3 -> Invalidation CF

## TO-DO

- [x] PoC
- [ ] Cognito
- [ ] Dockerize
- [ ] Coding Conventions
- [ ] Component Refactoring
