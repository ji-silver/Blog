# BLOG

### <a href="https://myblogapp-dev.vercel.app/">🖥️ Website</a>

<br />

## 🗒️ 프로젝트 기획
**Next.js와 prisma를 이용해서 CRUD 가능한 블로그 만들기**

 <br />

## 📅 개발 기간
2023년 9월 13일 ~ 9월 22일 <br />
(2023. 10. 08 ~ : 소셜 로그인 구현 추가 작업)

<br />

## 🛠 Skils
****Front-End**** <br />
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Scss-CC6699?style=for-the-badge&logo=Sass&logoColor=white"/>
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/>


****Back-End**** <br />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/>
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>

<br />

## 📌 주요 기능
### 1. Next Auth를 이용한 구글, 카카오 소셜 로그인 기능

|로그인 페이지|구글 로그인|
|------|------|
|<img src="https://github.com/ji-silver/Blog/assets/59919953/f631725b-b07c-45b2-98c9-aff3bd482193" width="400" height="auto"/>|<img src="https://github.com/ji-silver/Blog/assets/59919953/c2affbfc-e87a-4785-9e01-4ea025cf2634" width="400" height="auto"/>|

- Next Auth 라이브러리로 소셜로그인을 구현 후 이메일, 이름, 프로필 사진을 가져오게 하였습니다.
- 로그인 성공 시 prisma로 연동할 수 있도록 스키마를 정의하고 session 정보가 있을 때만 블로그 글을 작성할 수 있도록 했습니다.

<br />


### 2. WYSIWYG React-Quill 에디터 사용  (이미지 처리 AWS S3 + CloudFront)

|글 작성|
|------|
|<img src="https://github.com/ji-silver/Blog/assets/59919953/2049c8f6-9f21-452a-abeb-6892f033373c" width="800" height="auto"/>|

- Quill 에디터는 SSR 지원이 안되기 때문에 dynamic으로 비동기적으로 불러오도록 하고 ssr옵션을 false 처리 하였습니다.
- 에디터에서 작성 후 저장 시 HTML 태그가 그대로 노출되기 때문에 dangerouslySetInnerHTML를 사용하였고, XSS 공격 방지를 위해 DOMPurify 라이브러리를 사용하였습니다.
- 이미지 저장 시 base64로 인코딩되기 때문에 이미지를 S3에 업로드 후 CloudFront에 배포하여 url을 저장하도록 했습니다.

<br />

### 3. 페이지네이션 (프론트 구현) & 시간 표시

|리스트|리스트|
|------|------|
|<img src="https://github.com/ji-silver/Blog/assets/59919953/3cdc3b2c-6e4b-4a27-8d64-3f0dd4404e2e" width="400" height="auto"/>|<img src="https://github.com/ji-silver/Blog/assets/59919953/6af5ea56-b6e5-42ab-865e-eefa1c05b7d8" width="400" height="auto"/>|

- 페이지네이션은 프론트단에서 구현하여 한 페이지당 10개의 개시물을 보여지게 구현하고 게시물 개수로 시작 페이지와 끝페이지를 계산하도록 했습니다.
- 숫자 버튼을 누르면 해당 페이지, `>`버튼을 누르면 다음페이지, `>>` 버튼을 누르면 5페이지가 이동하도록 구현하였습니다.
- 작성한 글은 현재 시간과 비교하여 1 ~ 59초까지는 **방금 전**으로 표기하고 이후엔 **m분 전**, **h시간 전**, 하루가 지나면 작성 날짜를 표시하도록 했습니다.

<br />
