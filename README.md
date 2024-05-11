# UMEW Chat

## [ YouTube Music Chat Chrome Extension ]

### 프로젝트 소개

<aside>
💡

왓챠 파티는 지인 또는 모르는 사람들과 함께 콘텐츠를 즐기며 채팅을 할 수 있는 서비스이다. 
유튜브로 음악을 듣는 사람들도 많은데, 왓챠 파티처럼 유튜브 뮤직으로 함께 좋아하는 노래들의 감상을 나눌 수 있으면 좋겠다고 생각하여 만들게 되었다. 

</aside>
<br/>
<br/>

### 설치 및 실행 방법

두가지 방법중 하나로 크롬 익스텐션 적용

- **직접 프로젝트 파일 빌드**
    1. build 파일 생성
        
        ```jsx
        npm run build:prod
        ```
        
    
    1. 확장 프로그램 로드
        1. chrome://extensions/ 으로 이동 ( extension 관리 페이지)
        2. 프로젝트에서 빌드된 dist 파일 선택
          <img width=600px src=https://github.com/MildColor/TodoList-Refactoring/assets/96479626/95a5e6c7-3125-40a9-9e6a-aa22817cad7b>

- **압축된 dist 파일 로드**
    1. dist.zip 다운로드
    2. 위의 직접 프로젝트 파일 빌드 → 2번 확장 프로그램 로드 


<br/>
<br/>

### **프로젝트 구현기능**

 프론트엔드

1. 서비스 워커 (background.ts)
    - 서비스 워커에서 팝업창 생성 및 관리
    - 브라우저 탭 상태 추적 (열려있는 유튜브 뮤직 탭이 있는지 확인)
    - target된 youtube music 탭에 content-script execute

1. content-script (content.ts)
    - youtube music document 파싱
        - 프로그레스바, 재생시간, 음원이미지, 음원정보 등
    - 파싱된 정보를 popup 으로 전송
    - 메세지 리스너
        - popup의 재생, 다음, 이전 등 버튼 이벤트 수신

1. Popup (main.tsx)
    - 다크모드 전환 가능
    - 플레이어를 통해 음원 정보 표출 및 유튜브 뮤직 버튼 기능 수행
        - 플레이어 버튼의 이벤트 발신을 통해 유튜브 뮤직의 재생, 정지, 다음곡, 이전곡 등을 컨트롤 가능
    - [socket.io](http://socket.io) 를 이용한 실시간 채팅 기능

백엔드

1. [socket.io](http://socket.io) 를 이용한 실시간 통신 구현
2. 무작위 닉네임 생성

<br/>
<br/>

### 기술 스택 ( 선정 이유 )

- React + Vite + Chrome Extension
    - 사이드 프로젝트로 단기간에 만들고 싶었음.
    - React 사용 이유 :
        - chrome extension의 api는 생소하기 때문에, 나머지 부분에서 코스트를 줄이고 싶어, 익숙한 React 를 적용
    - Vite 사용 이유 :
        - 개선된 개발 환경 및 설정의 간편함을 제공 ( 더 좋은 개발자 경험을 제공 )
        - Webpack 과 같은 기존 번들 방식에서는 모든 소스코드가 빌드되고 서비스를 제공했다면, Vite는 ESM 기반 방식이기 때문에 번들링 이 필요 없어 dev server 구동 속도에서 이점
        - HMR 또한 번들러가 아닌 ESM 을 이용하기 때문에 소스코드가 바뀐 모듈만 교체해주어 더 빠른 속도를 제공
    
- shadcn/ui & tailwind css
    - shadcn/ui 는  tailwind css 와 radix UI 기반으로 만들어진 재사용 컴포넌트
    - radix UI는 headless ui 라이브러리로 tailwind css 로 스타일링이 가능한데, 이를 이용해 디자인을 적용한것이 shadcn/ui
    - 쉽게 스타일 변경 및 커스텀 가능
    - 테마를 제공해주고 디자인이 적용되어 있어 와이어프레임만 기획하여 실행한 프로젝트에서 빠르고 쉽게 멋진 디자인을 적용 가능
    
- [socket.io](http://socket.io)
    - 실시간 양방향 통신 로직 구현을 위함
    - WebSocket 기반으로 더 높은 추상화를 제공하기 때문에 간단한 프로젝트에 학습하여 적용하기 용이할것이라 예상
    - 쉬운 이벤트 핸들링, 자동 재연결등의 편리함
    
- Express
    - 가장 익숙한 언어인 js 기반의 웹 프레임워크임으로 서버 구축을 위함

- AWS EC2
    - 해당 서비스에 익숙하여 빠르게 서버 배포 가능


<br/>
<br/>

### 실제 동작 화면 
<img width=600px src=https://github.com/MildColor/TodoList-Refactoring/assets/96479626/17475149-963e-4187-9071-b746d6f21125>





