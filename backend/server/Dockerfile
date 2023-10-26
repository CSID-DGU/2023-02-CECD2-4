FROM node:alpine as base

# 작업 폴더 생성
RUN mkdir /home/app
# 작업 폴더 지정
WORKDIR /home/app

# port 8080으로 외부 데이터 들을 수 있음
EXPOSE 8080

# 설정 파일들 복사
COPY package*.json .

# 의존성 설치
RUN npm ci
# 나머지 파일들 복사
COPY . .
# 파일 빌드
RUN npm run build
ENV NODE_ENV production

CMD ["npm", "run", "start:prod"]
