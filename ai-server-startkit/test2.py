# BERT model 테스트
# 감정분석 + 원인분석 약 6분 소요(DummyData: 118개 뉴스기사의 118*5개 댓글)

import datetime
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
import pymysql

from models import KcBERT, SBERT

if __name__ == '__main__':
    ## DB init
    conn = pymysql.connect(host=keys['DB_HOST'], 
                           user=keys['DB_USER_NAME'], 
                           password=keys['DB_PASSWORD'], 
                           db='mydb', 
                           charset='utf8')
    cursor = conn.cursor()
    
    # model init
    print("Model init....", end='')
    start_t = time.time()
    KcBERT_model = KcBERT()
    SBERT_model = SBERT()
    end_t = time.time()
    print("end! ({:0.5f} sec)".format(end_t - start_t))
    
    ## 결과 저장할 text파일
    # text_file = open("result.txt", "w", encoding='utf-8')
    Data_file = open("Data(2023.11.12).txt", "w", encoding='utf-8')
    
    # keyword 관리
    keyword_dict = {
                    "윤석열": 1, 
                    "이재명": 2
                    }
    big_emotion_dict = {
                    "행복": "긍정",
                    "슬픔": "부정", 
                    "분노": "부정", 
                    "혐오": "부정",
                    "공포": "부정",
                    "중립": "중립",
                    "놀람": "중립"
                    }
    
    sqs: SQSClient = boto3.client(
        'sqs',
        aws_access_key_id=keys['AWS_ACCESS_KEY'],
        aws_secret_access_key=keys['AWS_SECRET_KEY'],
        region_name=keys['AWS_REGION']
    )

    s3: S3Client = boto3.client(
        's3',
        aws_access_key_id=keys['AWS_ACCESS_KEY'],
        aws_secret_access_key=keys['AWS_SECRET_KEY'],
        region_name=keys['AWS_REGION']
    )
    queue_url = keys['SQS_URL']

    while(1):
        print()
        now = datetime.datetime.now()
        print("현재 시각: " + str(now))

        sqs_response = getMessagesFromSQS(sqs, queue_url)
        try:
            for res in sqs_response:
                news_response = getNewsResponse(s3, keys['S3_BUCKET'], res['key'])
                Data_file.write(str(news_response))
                # print(news_response['keyword'])
                # print(news_response['data'][0]['comments'][0])
                # print(news_response)
            
                ## 하나의 받은 데이터 처리
                print("Read data....", end='')
                start_t = time.time()
                # with open('DummyData\\file\\이재명(23.11.12).json', 'rt', encoding='UTF8') as f:
                #     news_response = json.load(f)
                end_t = time.time()
                print("end! ({:0.5f} sec)".format(end_t - start_t))

                keyword = news_response['keyword']  # keyword(단어)
                keyword_id = keyword_dict[keyword]  # keyword_id
                #news_n = len(news_response['data']) # news 개수
                publishedDate = news_response["data"][0]['news']['publishedAt'] # 기사 발행 날짜(데이터 수집 날짜)
                
                positive_cnt = 0
                neutral_cnt = 0
                negative_cnt = 0
                
                MIN_COMMENT = 5
                
                print("Analizing comments....")
                start_t = time.time()
                for data in news_response['data']:
                    comments = data['comments']     # 댓글
                    
                    if(len(comments) >= MIN_COMMENT):
                        url = data['url']   # 기사 url
                        #publishedDate = data['news']['publishedAt'] # 기사 발행 날짜 
                        body = data['news']['body']     # 본문
                        
                        ## SBERT corpus init --> 빠른 속도 위함
                        SBERT_model.CorpusInit(corpus=body)
                        
                        # comment analysis
                        for comment in comments:
                            comment_date = comment['date']              # 댓글 작성 날짜
                            comment_content = comment['contents']       # 댓글 내용
                            comment_sympathy = comment['sympathyCount'] # 공감
                            comment_antipathy = comment['antipathyCount'] # 비공감
                            
                            emotion = KcBERT_model.predict(predict_sentence=comment_content)
                            related = SBERT_model.analysis(comments=[comment_content])
                            
                            if(big_emotion_dict[emotion] == "긍정"):
                                positive_cnt += 1
                            elif(big_emotion_dict[emotion] == "부정"):
                                negative_cnt += 1
                            else:
                                neutral_cnt += 1
                            
                            # 결과 출력해보고 싶다면 아래 주석 해제
                            #
                            # 감정 분석 결과
                            #text_file.write("{} --> {}\n".format(comment_content, emotion))
                            #print("{} --> {}".format(comment_content, emotion))
                            # 연관도 분석 결과
                            #text_file.write("{} --> {}\n\n".format(comment_content, related))
                            #print("{} --> {}".format(comment_content, related))
                            #print('')
                            
                            try:
                                ## INSERT
                                comment_date = datetime.datetime.strptime(comment_date, "%Y-%m-%dT%H:%M:%S%z")
                                comment_date = str(comment_date.strftime("%Y-%m-%d %H:%M:%S"))
                                
                                insert_query = "INSERT INTO analysis_comment (createdAt, content, sympathy, antipathy, emotion, link, keyword_id, big_emotion) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                                data_to_insert = (comment_date, comment_content, comment_sympathy, comment_antipathy, emotion, url, keyword_id, big_emotion_dict[emotion])
                                cursor.execute(insert_query, data_to_insert)
                                
                                lastrowid = cursor.lastrowid
                                text = related['text']
                                score = related['score']
                                for i in range(0, len(text)):
                                    # print(text[i])
                                    # print(score[i])
                                    insert_query = "INSERT INTO article_content (content, score, comment_id) VALUES (%s, %s, %s)"
                                    data_to_insert = (text[i], score[i], lastrowid)
                                    cursor.execute(insert_query, data_to_insert)
                                
                            except Exception as e:
                                # fail
                                conn.rollback()
                                print("Error in INSERT comment")
                                
                # big emotion cnt
                try:
                    ## INSERT
                    publishedDate = datetime.datetime.strptime(publishedDate, "%Y-%m-%d %H:%M:%S")
                    publishedDate = str(publishedDate.strftime("%Y-%m-%d"))
                    
                    insert_query = "INSERT INTO daily_keyword_big_emotions_cnt (date, positive_cnt, neutral_cnt, negative_cnt, keyword_id) VALUES (%s, %s, %s, %s, %s)"
                    data_to_insert = (publishedDate, positive_cnt, neutral_cnt, negative_cnt, keyword_id)
                    cursor.execute(insert_query, data_to_insert)
                    
                except Exception as e:
                    # fail
                    conn.rollback()
                    print("Error in INSERT big_emotion_cnt")
                
                # commit
                conn.commit()
                
                # comment_date = "2023-10-05T16:59:17+0900"
                # comment_date = datetime.datetime.strptime(comment_date, "%Y-%m-%dT%H:%M:%S%z")
                # comment_date = str(comment_date.strftime("%Y-%m-%d %H:%M:%S"))
                # insert_query = "INSERT INTO analysis_comment (createdAt, content, sympathy, antipathy, emotion, link, keyword_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                # data_to_insert = (comment_date, "ddd", 123, 2, '혐오', 'www.naver.com', 1)
                # cursor.execute(insert_query, data_to_insert)
                # conn.commit()    
                
                end_t = time.time()
                print("end! ({:0.5f} sec)".format(end_t - start_t))
        except:
            print("error in sqs_response")
            
    cursor.close()
    conn.close()