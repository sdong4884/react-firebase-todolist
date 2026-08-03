# React + Firebase Todolist

React와 Firebase(Firestore)로 만든 간단한 할 일 관리 앱

## 주요 기능

- 할 일 입력
- Firebase Firestore에 할 일 저장
- Firestore에서 할 일 목록 불러오기
- 할 일 완료 처리 (체크박스 토글)
- 할 일 삭제 (확인 후 삭제)

## 기술 스택

- React 19
- TypeScript
- Vite
- Firebase (Firestore)
- Tailwind CSS

## 시작하기

```bash
npm install
```

프로젝트 루트에 `.env.local` 파일을 생성하고 Firebase 콘솔에서 발급받은 값을 입력합니다.

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

```bash
npm run dev    # 개발 서버 실행
npm run build  # 프로덕션 빌드
```
