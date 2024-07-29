# 🌱 ESG 경영 기업 TAECO 사내 인트라넷 서비스

인트라넷 시스템은 직원들의 부재 및 출결과 관련된 결재를 관리하는 시스템입니다. 이 시스템은 프로필 관리, 연차/반차 등 부재 신청, 내역 확인, 출결관리, 그리고 각종 사내 공지를 확인할 수 있는 기능을 제공합니다.

![사용자페이지IA](/public/images/company_logo_user.png)

- user id: user2@taeco.com
- user password: 1234
- admin id: admin@taeco.com
- admin password: 1234

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [설계](#설계)
  - [IA (정보구조도)](#ia-정보구조도)
  - [유저플로우](#유저플로우)
  - [기능정의서](#기능정의서)
  - [요구사항정의서](#요구사항정의서)
  - [와이어프레임](#와이어프레임)
  - [디자인](#디자인)
  - [데이터베이스](#데이터베이스)
- [개발 환경](#개발-환경)
- [컨벤션](#컨벤션)
- [팀원 구성 및 역할 분담](#팀원-구성-및-역할-분담)
- [개발 기간 및 작업 관리](#개발-기간-및-작업-관리)
- [프로젝트 구조](#프로젝트-구조)

## 프로젝트 소개

ESG 경영 기업 TAECO 사내 인트라넷 서비스

### 목표

- 직원 데이터베이스(프로필) 구축 및 관리
- 근태 및 휴가 관리 시스템 구축
- 직원들의 출결 및 휴가 관리 효율화
- 기업 공지 시스템 구축 및 관리
- 사용자 친화적인 웹 인터페이스 제공
- 내부 커뮤니케이션 및 협업 강화

### 사용자 정의

- 회사 전 직원(사용자)
- 사장(관리자)

## 설계

### IA(정보구조도)

#### 사용자

추가사항, 선택사항, 필수사항을 구분하여 우선순위 선정

![사용자페이지IA](/public/images/user_IA.png)

#### 관리자

![관리자페이지IA](/public/images/admin_IA.png)

### 유저플로우

#### 사용자

![사용자유저플로우](/public/images/userflow_user.png)

#### 관리자

![관리자유저플로우](/public/images/userflow_admin.png)

### 기능정의서

| 유저          | 페이지        | 상세기능          | 설명                                                                                                                    |
| ------------- | ------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 사용자,관리자 | 로그인        | 로그인            | 관리자가 등록시켜주면 로그인 진행. 사용자, 관리자 각각 올바른 아이디와 패스워드를 입력하면 사용자, 관리자 페이지로 이동 |
| 사용자,관리자 | -             | 로그아웃          | 로그인 후 서비스 사이드바에서 로그아웃을 진행하면 로그인 페이지로 이동                                                  |
| 사용자        | 대시보드      | 요약된 내용 확인  | 내프로필 정보, 최근 전자결재 및 공지사항 확인                                                                           |
| 사용자        | 대시보드      | 출결              | 오늘 날짜와 시간을 확인하고 출,퇴근 스탬프를 찍을 수 있음. 금주 근무 현황 확인                                          |
| 사용자        | 전자결재      | 결재신청          | 결재신청을 작성할 수 있음                                                                                               |
| 사용자        | 전자결재      | 결재신청 내역확인 | 심사중,승인,반려에 해당하는 내 부재신청 내역을 확인 가능. 카테고리 필터 및 최신순, 오래된순 필터 제공                   |
| 사용자        | 공지사항      | 공지확인          | 각 카테고리 별 공지 확인 가능. 중요공지는 상단에 배치. 검색필터 및 최신순, 오래된순 필터 제공                           |
| 사용자        | 마일리지      | 마일리지 신청     | 카테고리, 점수, 신청날짜, 증빙자료를 첨부하여 신청 가능                                                                 |
| 사용자        | 마일리지      | 적립목록          | 카테고리, 적립날짜, 점수 확인 가능                                                                                      |
| 사용자        | 마일리지      | 신청내역          | 마일리지 레벨과 기준을 확인하고 심사중, 승인, 반려 필터에 따른 신청내역 확인 가능                                       |
| 사용자        | 마이페이지    | 프로필 정보 확인  | 이름, 직급, 프로필 이미지, 이메일, 전화번호 확인 가능                                                                   |
| 사용자        | 마이페이지    | 프로필 정보 수정  | 이름, 직급, 프로필 이미지, 이메일, 비밀번호, 전화번호, 생일, 입사일 수정 가능                                           |
| 관리자        | 대시보드      | 요약된 내용 확인  | 내프로필 정보, 최근 전자결재 및 공지사항, 마일리지 적립 내역 확인                                                       |
| 관리자        | 전자결재 관리 | 결재신청 내역확인 | 심사중,승인,반려에 해당하는 직원들의 부재신청 내역을 확인 가능. 카테고리 필터 및 최신순, 오래된순 필터 제공             |
| 관리자        | 전자결재 관리 | 결재 승인 및 반려 | 결재를 승인하거나 거절사유 작성 후 반려 가능                                                                            |
| 관리자        | 직원관리      | 요약              | 금일의 생일자, 입사자 확인                                                                                              |
| 관리자        | 직원관리      | 직원 목록 확인    | 프로필 이미지, 이름, 직함, 이메일, 전화번호 확인 가능                                                                   |
| 관리자        | 직원관리      | 직원추가          | 이름, 직급, 프로필 이미지, 이메일, 전화번호, 생일, 입사일 작성 후 추가 가능. 등록 시 비밀번호는 자동으로 1234로 설정    |
| 관리자        | 마일리지 관리 | 신청내역확인      | 사용자가 신청한 내역 확인(카테고리, 이미지, 신청일)                                                                     |
| 관리자        | 마일리지      | 승인 및 거절      | 확인, 미확인 필터를 통해 미확인 내역에서 마일리지 심사 진행, 거절 시 거절사유 입력                                      |
| 관리자        | 공지사항      | 공지확인          | 각 카테고리 별 공지 확인 가능. 중요공지는 상단에 배치. 검색필터 및 최신순, 오래된순 필터 제공                           |
| 관리자        | 공지사항      | 공지작성          | 제목, 카테고리, 필수공지 여부, 첨부파일 선택, 내용작성 후 공지 등록                                                     |
| 관리자        | 공지사항      | 공지삭제          | 공지 상세페이지에서 삭제하기를 눌러 진행                                                                                |

### 요구사항정의서

#### 필수 요구사항

| 페이지 | 기능                                                        |
| ------ | ----------------------------------------------------------- |
| 사용자 | 연차/ 반차/시간 조정 등 부재 신청 창 구현                   |
| 사용자 | 부재 신청 내역 확인 창 구현                                 |
| 사용자 | 부재 항목에 따른 필터링 기능 구현                           |
| 사용자 | 사진, 직무, 이름이 표기된 프로필 구현                       |
| 사용자 | 시간 관리 기능 개발                                         |
| 사용자 | 현 시각을 표시하는 시계 (타이머) 구현                       |
| 사용자 | 토글 형태의 근무 시작 / 종료 스위치 구현                    |
| 사용자 | 모달을 활용한 근무 시작 / 종료 확인 창 구현                 |
| 사용자 | 기업 공지 모음 갤러리 구현                                  |
| 관리자 | CSS 스타일이 적용된 직원 프로필 페이지 개발                 |
| 관리자 | 프로필 사진을 등록, 수정, 삭제가 가능하도록 개발            |
| 관리자 | 페이지네이션(Pagination) 기능 개발                          |
| 관리자 | CSS 의 상대 수치를 활용하여 디바이스별 자연스러운 화면 구현 |
| 관리자 | 스크롤이 가능한 형태로 직원 리스팅 페이지 개발              |

#### 선택 요구사항

| 페이지 | 기능                                                                      |
| ------ | ------------------------------------------------------------------------- |
| 사용자 | 마이페이지의 프로필 이미지 업로드 기능                                    |
| 사용자 | 회원 시스템 기능(회원 가입, 로그인, 로그아웃)                             |
| 사용자 | 부재 신청 시/사유 기재 기능                                               |
| 사용자 | 기타 동작이 완료되기 전에 로딩 애니메이션 구현                            |
| 사용자 | 부재 신청 시/사유 기재 기능                                               |
| 사용자 | 관련된 기타 기능 추가                                                     |
| 사용자 | ESLint 설정, Commit Convention, 문서화 등 팀 프로젝트 시 필요한 추가 작업 |
| 관리자 | 기업 공지 모음 갤러리 구현 - 사진 업로드 기능을 추가                      |

### 와이어프레임

![와이어프레임](/public/images/wireframe_01.png)
![와이어프레임](/public/images/wireframe_02.png)

### 디자인

#### **대시보드 페이지**
<img width="450" alt="image" src="https://github.com/red-dev-Mark/TIL/assets/93127663/315c6b71-8fc7-4733-90a7-943ff063147d">
<img width="450" alt="image" src="https://github.com/red-dev-Mark/TIL/assets/93127663/31289383-2eaa-4e81-9a63-00816aebce71">

#### **전자결재 페이지**
<img width="450" alt="image" src="https://github.com/red-dev-Mark/TIL/assets/93127663/969e5b71-5c71-4348-b95b-1c77c092a5be">
<img width="450" alt="image" src="https://github.com/red-dev-Mark/TIL/assets/93127663/89f76652-e8e0-4da4-9995-32903eab442c">

#### **마일리지 페이지**
<img width="450" alt="image" src="https://github.com/red-dev-Mark/TIL/assets/93127663/63b36ac9-32ad-4a03-9cf2-aa730bfb5f2f">
<img width="450" alt="image" src="https://github.com/red-dev-Mark/TIL/assets/93127663/cec28f70-539d-4d6e-9ed4-e712c18b394f">


### 데이터베이스

![데이터베이스 테이블](https://github.com/user-attachments/assets/67ee2202-c024-4006-8f77-c995c25f7b0a)

## 개발 환경

- Front : HTML, CSS, JavaScript
- Back-end : Node.js, SQLITE3
- 버전 및 이슈관리 : Github, Github Issues
- 협업 툴 : Slack, Notion, ZEP
- 디자인 : Figma

## 컨벤션

### CSS 네이밍: BEM 방식

### 브랜치 전략: 깃플로우 | main-dev-feature

```
feat/a||u||p/login/#24
feat/p/login/#24
```

### ISSUE 형식

```
## [사용자/관리자/공용][Pagename] 세부 내용
### 구현 내용
- [ ] contents1
- [ ] contents2
- [ ] contents3
- [ ] contents4
- [ ] contents5
---

### 상세 내용
1.
2.
---

### 추가 내용
- 브랜치명:
- 담당자:

---

### Issue 타입 (하나 이상의 Issue 타입을 선택해주세요)
- [ ] 기능 추가
- [ ] 기능 삭제
- [ ] 스타일 추가
- [ ] 스타일 변경
- [ ] 버그 수정
```

### 커밋 메세지 컨벤션

```
feat: 경매품 업로드 기능 구현 #8
```

## 팀원 구성 및 역할 분담

| 권혁준                                           | 박수현                                       | 김승민                                     | 권혜지                                 |
| ------------------------------------------------ | -------------------------------------------- | ------------------------------------------ | -------------------------------------- |
| ![red-dev-Mark](/public/images/red-dev-Mark.png) | ![suhyun9892](/public/images/suhyun9892.png) | ![miniseung](/public/images/miniseung.png) | ![hyeppyy](/public/images/hyeppyy.png) |
| @red-dev-Mark                                    | @suhyun9892                                  | @miniseung                                 | @hyeppyy                               |
| 마일리지 페이지                                  | 직원관리, 마이페이지                         | 전자결재 페이지                            | 공지사항 페이지                        |

## 개발 기간 및 작업 관리

6월 10일(월) ~ 7월 12일(금) (약 5주)

- 1주차: 기획 및 설계
- 2주차: html, css 작성
- 3주차: js 작성 및 SPA 구조 설계
- 4주차: js 작성 및 데이터베이스 구조 설계
- 5주차: 버그픽스

## 프로젝트 구조
```
📦Toyproject_Team_1
 ┣ 📂public
 ┃ ┣ 📂icons
 ┃ ┗ 📂images
 ┣ 📂server
 ┃ ┣ 📂data
 ┃ ┣ 📜database.js
 ┃ ┗ 📜index.js
 ┣ 📂src
 ┃ ┣ 📂Components
 ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂NavBar
 ┃ ┃ ┣ 📂Pagination
 ┃ ┃ ┣ 📂ResponsiveNavBar
 ┃ ┃ ┣ 📂Spinner
 ┃ ┃ ┣ 📂Toast
 ┃ ┃ ┗ 📂ToggleSwitch
 ┃ ┣ 📂Layout
 ┃ ┣ 📂Pages
 ┃ ┃ ┣ 📂Admin
 ┃ ┃ ┃ ┣ 📂Approval
 ┃ ┃ ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┃ ┣ 📜Approval.js
 ┃ ┃ ┃ ┃ ┣ 📜Approval.module.css
 ┃ ┃ ┃ ┃ ┣ 📜FetchApprovalData.js
 ┃ ┃ ┃ ┃ ┣ 📜Filters.js
 ┃ ┃ ┃ ┃ ┗ 📜RenderApprovalList.js
 ┃ ┃ ┃ ┣ 📂Dashboard
 ┃ ┃ ┃ ┃ ┣ 📜ApprovalData.js
 ┃ ┃ ┃ ┃ ┣ 📜MileageData.js
 ┃ ┃ ┃ ┃ ┣ 📜NoticeData.js
 ┃ ┃ ┃ ┃ ┣ 📜Dashboard.js
 ┃ ┃ ┃ ┃ ┗ 📜Dashboard.module.css
 ┃ ┃ ┃ ┣ 📂Employee
 ┃ ┃ ┃ ┃ ┣ 📜AddEmployee.js
 ┃ ┃ ┃ ┃ ┣ 📜AddEmployee.module.css
 ┃ ┃ ┃ ┃ ┣ 📜EditEmployee.js
 ┃ ┃ ┃ ┃ ┣ 📜EditEmployee.module.css
 ┃ ┃ ┃ ┃ ┣ 📜Employee.js
 ┃ ┃ ┃ ┃ ┣ 📜Employee.module.css
 ┃ ┃ ┃ ┃ ┣ 📜FetchEmployeeData.js
 ┃ ┃ ┃ ┃ ┣ 📜Filter.js
 ┃ ┃ ┃ ┃ ┣ 📜HandleAddEmployee.js
 ┃ ┃ ┃ ┃ ┣ 📜LoadEmployees.js
 ┃ ┃ ┃ ┃ ┣ 📜ProfileEdit.js
 ┃ ┃ ┃ ┃ ┗ 📜RenderEmployeeList.js
 ┃ ┃ ┃ ┣ 📂Mileage
 ┃ ┃ ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┃ ┣ 📜ApproveMileage.js
 ┃ ┃ ┃ ┃ ┣ 📜FetchMileageData.js
 ┃ ┃ ┃ ┃ ┣ 📜FilterByToggle.js
 ┃ ┃ ┃ ┃ ┣ 📜HandleMileageApprove.js
 ┃ ┃ ┃ ┃ ┣ 📜Mileage.js
 ┃ ┃ ┃ ┃ ┣ 📜Mileage.module.css
 ┃ ┃ ┃ ┃ ┣ 📜RejectMileage.js
 ┃ ┃ ┃ ┃ ┗ 📜RenderMileageList.js
 ┃ ┃ ┃ ┗ 📂Notices
 ┃ ┃ ┃ ┃ ┣ 📂Add
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Add.js
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Add.module.css
 ┃ ┃ ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Detail.js
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Detail.module.css
 ┃ ┃ ┃ ┃ ┣ 📂JS
 ┃ ┃ ┃ ┃ ┃ ┣ 📜DeleteNotice.js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜DetailList.js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜EditNotice.js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜FetchNoticesData.js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Filter.js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜RegisterNotice.js
 ┃ ┃ ┃ ┃ ┃ ┗ 📜RenderNoticesList.js
 ┃ ┃ ┃ ┃ ┣ 📜Notice.module.css
 ┃ ┃ ┃ ┃ ┗ 📜Notices.js
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┣ 📂PageNotFound
 ┃ ┃ ┗ 📂User
 ┃ ┃ ┃ ┣ 📂Approval
 ┃ ┃ ┃ ┣ 📂Dashboard
 ┃ ┃ ┃ ┣ 📂Mileage
 ┃ ┃ ┃ ┣ 📂Mypage
 ┃ ┃ ┃ ┗ 📂Notices
 ┃ ┣ 📂Router
 ┃ ┣ 📂Styles
 ┃ ┃ ┣ 📜Color.css
 ┃ ┃ ┣ 📜Font.css
 ┃ ┃ ┗ 📜Global.css
 ┃ ┣ 📂Utils
 ┃ ┣ 📜App.js
 ┃ ┗ 📜main.js
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜toyprj1.db
 ┗ 📜vite.config.js
```
