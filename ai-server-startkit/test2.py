# BERT model 테스트
# 감정분석 + 원인분석 약 6분 소요(DummyData: 118개 뉴스기사의 118*5개 댓글)

import time

import sys
import io

import boto3
from mypy_boto3_sqs import SQSClient
from mypy_boto3_s3 import S3Client
from settings.key import keys
from utils.s3 import getNewsResponse
from utils.sqs import getMessagesFromSQS
import json

from models import KcBERT, SBERT

if __name__ == '__main__':
    # model init
    print("Model init....", end='')
    start_t = time.time()
    KcBERT_model = KcBERT()
    SBERT_model = SBERT()
    end_t = time.time()
    print("end! ({:0.5f} sec)".format(end_t - start_t))
    
    # 결과 저장할 text파일
    text_file = open("result.txt", "w", encoding='utf-8')
    
    # sqs: SQSClient = boto3.client(
    #     'sqs',
    #     aws_access_key_id=keys['AWS_ACCESS_KEY'],
    #     aws_secret_access_key=keys['AWS_SECRET_KEY'],
    #     region_name=keys['AWS_REGION']
    # )

    # s3: S3Client = boto3.client(
    #     's3',
    #     aws_access_key_id=keys['AWS_ACCESS_KEY'],
    #     aws_secret_access_key=keys['AWS_SECRET_KEY'],
    #     region_name=keys['AWS_REGION']
    # )
    # queue_url = keys['SQS_URL']

    # sqs_response = getMessagesFromSQS(sqs, queue_url)
    # for res in sqs_response:
    #     news_response = getNewsResponse(s3, keys['S3_BUCKET'], res['key'])
    #     print(news_response['keyword'])
    #     print(news_response['data'][0]['comments'][0])
    #     print(news_response)
    
    # 하나의 받은 데이터 처리
    print("Read data....", end='')
    start_t = time.time()
    with open('DummyData\\DummyData.json', 'rt', encoding='UTF8') as f:
        news_response = json.load(f)
    end_t = time.time()
    print("end! ({:0.5f} sec)".format(end_t - start_t))

    keyword = news_response['keyword']  # keyword(단어)
    news_n = len(news_response['data']) # news 개수
    MIN_COMMENT = 5
    
    print("Analizing comments....")
    start_t = time.time()
    for data in news_response['data']:
        url = data['url']   # 기사 url
        publishedDate = data['news']['publishedAt'] # 기사 발행 날짜 
        
        body = data['news']['body']     # 본문
        comments = data['comments']     # 댓글
        
        if(len(comments) >= MIN_COMMENT):
            # SBERT corpus init --> 빠른 속도 위함
            SBERT_model.CorpusInit(corpus=body)
            
            for comment in comments:
                comment_date = comment['date']          # 댓글 작성 날짜
                comment_content = comment['contents']   # 댓글 내용
                
                emotion = KcBERT_model.predict(predict_sentence=comment_content)
                related = SBERT_model.analysis(comments=[comment_content])
                
                ## 결과 출력해보고 싶다면 아래 주석 해제
                #
                ## 감정 분석 결과
                text_file.write("{} --> {}\n".format(comment_content, emotion))
                # print("{} --> {}".format(comment_content, emotion))
                ## 연관도 분석 결과
                text_file.write("{} --> {}\n\n".format(comment_content, related))
                # print("{} --> {}".format(comment_content, related))
                # print('')
    end_t = time.time()
    print("end! ({:0.5f} sec)".format(end_t - start_t))

    
    