# ai-server-startkit

AI 서버와 AWS 환경을 연동하기 위한 스타트킷

## 의존성
```
pip install boto3
pip install 'boto3-stubs[essential]'
pip install python-dotenv
```

- boto3: AWS와 python 연동
- boto-stubs\[~\]: boto3을 위한 타입 추론(없으면 거의 전부 any, 공식 문서 봐야 함)
- python-dotenv: 파이썬 환경에서 즐기는 dotenv


## 환경 설정
github 이외의 경로로 전달한 .env 파일을 settings 폴더에 삽입

## 실행
```
python test.py
```