# 🌸 Message Bloom

![MessageBloom_Service소개](https://github.com/6Team-Project/MessageBloom/assets/162412765/5b808411-434e-4b52-9d80-0939d9cd7a16)

- 배포 링크: [Message Bloom](https://6-6-messagebloom.vercel.app/)

## 프로젝트 소개

- Message Bloom은 온라인 롤링페이퍼 서비스 입니다.

## 🧑‍💻 개발자 소개(Sprint 6기 Part2 6팀)

| <img src="https://avatars.githubusercontent.com/u/162412765?v=4"> | <img src="https://avatars.githubusercontent.com/u/115947715?v=4"> | <img src="https://avatars.githubusercontent.com/u/97877328?v=4"> | <img src="https://avatars.githubusercontent.com/u/113000290?v=4"> | <img src="https://avatars.githubusercontent.com/u/123517278?v=4"> |
| :---------------------------------------------------------------: | :---------------------------------------------------------------: | :--------------------------------------------------------------: | :---------------------------------------------------------------: | :---------------------------------------------------------------: |
|           [FE_6기 김진윤](https://github.com/EveryYawm)           |          [FE_6기 오채연](https://github.com/oh-chaeyeon)          |           [FE_6기 원찬희](https://github.com/wch2208)            |           [FE_6기 정우기](https://github.com/WooGi1020)           |         [FE_6기 조현지](https://github.com/cindycho0423)          |

### 김진윤

- main page(소개페이지) UI 구현
- 공용 컴포넌트 제작(ButtonLink, ProfileMessageCounter)
- 웹사이트 animation & 토글 버튼 제작
- 404 NOT FOUND page 제작

### 오채연

- assets 초기 세팅
- 메인헤더, post헤더 UI 제작
- api emoji 통신
- 이모지 선택기 설치 및 api 연결
- react-toastify 설치 및 toast 기능
- 카카오톡 api 연결

### 원찬희

- global font 시스템 초기 세팅
- post 페이지, post message 페이지 UI 제작
- react-hook-form을 사용한 유효성 검사 기능
- form 각 요소 모듈화하여 렌더링 최적화
- 생성하기 버튼 조건부 활성화 기능
- api post 통신
- Drop Down Menu 커스텀 컴포넌트 제작
- 커스텀훅으로 resize 이벤트 최적화
- 마우스 따라다니는 이미지(마우스트래커) 추가
- Vercel 배포

### 정우기

- 깃허브 프로젝트 레포지토리 생성
- 레포지토리 초기 세팅(포매터, 린터, 필요 라이브러리)
- post/:id 페이지 UI 제작 및 기본 요구사항 구현
- api get 통신
- 포스트 카드 검색용 SearchInput 커스텀 컴포넌트 제작
- 검색용 Dropdown 커스텀 컴포넌트 제작
- 포스트 삭제 모달창 커스텀 제작 및 조건부 렌더링
- post/:id에서 사용되는 컴포넌트들 렌더링 시 적용 애니메이션 구현
- 사용자 경험을 위한 유틸리티 함수 작성 및 사용(텍스트 길이 제한, 표준시 설정)

### 조현지

- 프로젝트 생성 및 세팅
- 홈페이지 이름 및 포인트 컬러 선정
- 라우터 설정
- list 페이지 제작 및 페이지네이션 구현
- 로딩시 스켈레톤 구현
- 커스텀 훅으로 데이터 로딩 / 에러 처리
- 메타태그 / 파비콘 설정

# 프로젝트 소개

롤링페이퍼를 웹사이트에서 작성하고 공유하는 서비스

## 주요 기능

- 롤링페이퍼 추가/제거
  ![롤링페이퍼 추가 gif](src\assets\readme-gifs\gif_AddDeleteRollingPaper.gif)

- 롤링페이퍼에 메세지 추가/제거
  ![메세지 추가 gif](src\assets\readme-gifs\gif_AddDeleteMessage.gif)

- 공유 기능
  ![공유 기능 gif](src\assets\readme-gifs\gif_SharedFeatures.gif)

## 프로젝트 실행 방법

```

$ git clone https://github.com/6Team-Project/MessageBloom.git


$ yarn install


$ yarn start
```

# 프로젝트 구성

## ⚙️ 기술 스택

| 역할       | 종류   |
| ---------- | ------ |
| Frontend   | React  |
| Deployment | Vercel |

## 🛠 Tools

| Tools           | 종류               |
| --------------- | ------------------ |
| Build Tool      | Vite               |
| Package Manager | Yarn               |
| Styling         | SCSS               |
| Formatting      | ESLint, Prettier   |
| Data Fetching   | Axios              |
| Icons           | React-Icons        |
| Emoji Picker    | emoji-picker-react |
| Notification    | react-toastify     |
| Utility Library | lodash             |
| Form Management | react-hook-form    |

## 👥 Collaboration

| Collaboration   | 종류            |
| --------------- | --------------- |
| Collaboration   | Discord, Notion |
| Version Control | GitHub          |

## Directory 구조

```
MESSAGEBLOOM/
├── node_modules/                 # 의존성 모듈
├── public/                       # 공개 폴더
├── src/                          # 소스 코드
│   ├── apis/                     # API 호출 관련
│   ├── assets/                   # 리소스 (이미지, 아이콘)
│   │   ├── icon/
│   │   ├── image/
│   │   ├── logo/
│   │   └── readme-gifs/
│   ├── components/               # 각 페이지 컴포넌트
│   │   ├── animation/
│   │   ├── commons/              # 공통 컴포넌트
│   │   ├── header/
│   │   ├── headerPost/
│   │   ├── list-page/
│   │   ├── post-id-message-page/
│   │   ├── post-id/
│   │   └── post-page/
│   ├── hooks/                    # 커스텀 훅
│   ├── layouts/                  # 레이아웃 컴포넌트
│   ├── pages/                    # 페이지 컴포넌트
│   │   ├── list-page/
│   │   ├── main/
│   │   ├── not-found/
│   │   ├── post-id-message-page/
│   │   ├── post-id/
│   │   └── post-page/
│   ├── styles/                   # 전역 스타일
│   ├── utils/                    # 유틸리티 함수
│   ├── App.jsx
│   ├── index.jsx
│   └── main.jsx
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── package.json
├── README.md
└── yarn.lock

```

# 트러블 슈팅

[트러블 슈팅 - Notion Page](https://www.notion.so/b042e74ef1f84561a5eb36bf851e60e2?v=d39778c752d2469b80f9086eac1d997b&pvs=4)
