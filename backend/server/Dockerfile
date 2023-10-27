FROM node:alpine as base

# 이유는 정확히 알 수 없으나, ec2 docker 환경에서 /home/app/package.json을 찾지 못하는 문제가 발생함.
# nodejs가 추천하는 기준 대로 변경함
# WORKDIR /home/app

# 작업 폴더 지정
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp
WORKDIR /usr/src/app

# 설정 파일들 복사
COPY package*.json .

# 의존성 설치
RUN npm ci
# 나머지 파일들 복사
COPY . .
# 파일 빌드
RUN npm run build
ENV NODE_ENV production
# port 8080으로 외부 데이터 들을 수 있음
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
# CMD ["node", "dist/main.js"]
