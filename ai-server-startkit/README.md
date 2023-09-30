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


# 모델 테스트 파일(test2.py)
학습된 모델 다운받고 파일을 `\models` 에 저장해야 함
- [모델 링크](https://drive.google.com/file/d/1r3Mh6zUfkB9RLrJHYGrgX909p5dC5dfu/view?usp=drive_link)

## 필요 패키지 설치(python 3.9.17) - test1.py 설정 완료 후
```
pip install mxnet -f https://dist.mxnet.io/python/cpu
pip install gluonnlp==0.8.0 pandas tqdm
pip install sentencepiece
pip install transformers
pip install torch
pip install sentence-transformers
```

## 실행
```
python test2.py
```
