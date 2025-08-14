# 웹툴 - Web에서 사용하는 Tool

인터넷에서 클릭 한번만으로 필요한 유용한 해결하는 간편하고 정확한 웹툴을 개발하여 제공하는 사이트입니다.

## 주요 기능

### 문자 관련 도구
- **HTML 태그 제거기**: HTML 태그를 제거하고 순수 텍스트만 추출
- **글자수 문자수 계산기**: 텍스트의 글자수, 문자수, 행수 등을 계산
- **영어 대문자 소문자 변환**: 영어 텍스트를 대문자 또는 소문자로 변환
- **단어 글자 문자 정렬기**: 단어를 알파벳순 또는 길이순으로 정렬

### 단어 관련 도구
- **글자수별 단어 목록**: 글자수별 영어/한국어 단어 목록 검색
- **캐릭터 이름 닉네임 생성기**: 랜덤 캐릭터 이름 또는 닉네임 생성
- **키워드 추출 태그 생성기**: 텍스트에서 주요 키워드를 추출하여 태그 생성

### 미디어 관련 도구
- **동영상 다운로드**: 아프리카TV, 카카오TV, 네이버TV, 트위치 동영상 다운로드
- **웹페이지 이미지 다운로드**: 웹페이지의 모든 이미지를 추출하여 다운로드
- **FFmpeg 명령어 생성기**: 동영상 변환, 압축 등을 위한 FFmpeg 명령어 생성

### 계산 관련 도구
- **주식 코인 물타기 계산기**: 주식/코인 물타기 시 평균 단가 계산
- **주식 코인 수익률 계산기**: 투자 수익률 계산
- **퍼센트 확률 계산기**: 퍼센트 및 확률 계산
- **날짜 경과일 디데이 계산기**: 특정 날짜까지의 D-day 계산

### 기타 도구
- **오늘의 투자운세**: 오늘의 투자 운세를 확인
- **로또 조합기 생성기**: 로또 번호 조합 생성
- **주사위 놀이**: 가상 주사위 굴리기

## 기술 스택

### 백엔드
- **Flask**: Python 웹 프레임워크
- **SQLAlchemy**: ORM (Object-Relational Mapping)
- **Flask-CORS**: Cross-Origin Resource Sharing 지원

### 프론트엔드
- **React**: JavaScript 라이브러리
- **Vite**: 빌드 도구
- **Tailwind CSS**: CSS 프레임워크
- **shadcn/ui**: UI 컴포넌트 라이브러리
- **Lucide React**: 아이콘 라이브러리

## 설치 및 실행

### 백엔드 설정

1. 백엔드 디렉토리로 이동:
```bash
cd backend
```

2. 가상 환경 생성 및 활성화:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 또는
venv\Scripts\activate  # Windows
```

3. 의존성 설치:
```bash
pip install -r requirements.txt
```

4. 서버 실행:
```bash
python src/main.py
```

### 프론트엔드 설정

1. 프론트엔드 디렉토리로 이동:
```bash
cd frontend
```

2. 의존성 설치:
```bash
npm install
```

3. 개발 서버 실행:
```bash
npm run dev
```

4. 프로덕션 빌드:
```bash
npm run build
```

## 프로젝트 구조

```
├── backend/                 # Flask 백엔드
│   ├── src/
│   │   ├── main.py         # 메인 애플리케이션
│   │   ├── routes/         # API 라우트
│   │   ├── models/         # 데이터베이스 모델
│   │   └── static/         # 정적 파일 (빌드된 프론트엔드)
│   └── requirements.txt    # Python 의존성
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── App.jsx        # 메인 컴포넌트
│   │   ├── components/    # UI 컴포넌트
│   │   └── lib/          # 유틸리티
│   ├── package.json      # Node.js 의존성
│   └── vite.config.js    # Vite 설정
└── README.md             # 프로젝트 문서
```

## API 엔드포인트

### 문자 관련
- `POST /api/tools/remove-html` - HTML 태그 제거
- `POST /api/tools/count-chars` - 글자수 계산
- `POST /api/tools/convert-case` - 대소문자 변환
- `POST /api/tools/sort-words` - 단어 정렬

### 단어 관련
- `POST /api/tools/word-list` - 글자수별 단어 목록
- `POST /api/tools/generate-nickname` - 닉네임 생성
- `POST /api/tools/extract-keywords` - 키워드 추출

### 미디어 관련
- `POST /api/tools/download-video` - 동영상 다운로드
- `POST /api/tools/download-images` - 이미지 다운로드
- `POST /api/tools/generate-ffmpeg` - FFmpeg 명령어 생성

### 계산 관련
- `POST /api/tools/calculate-stock` - 주식 물타기 계산
- `POST /api/tools/calculate-profit` - 수익률 계산
- `POST /api/tools/calculate-percent` - 퍼센트 계산
- `POST /api/tools/calculate-dday` - D-day 계산

### 기타
- `GET /api/tools/investment-fortune` - 투자운세
- `POST /api/tools/generate-lotto` - 로또 번호 생성
- `POST /api/tools/roll-dice` - 주사위 굴리기

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

