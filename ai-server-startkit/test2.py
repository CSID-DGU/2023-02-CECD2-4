# BERT model 테스트

import boto3
from mypy_boto3_sqs import SQSClient
from mypy_boto3_s3 import S3Client
from settings.key import keys
from utils.s3 import getNewsResponse
from utils.sqs import getMessagesFromSQS

from models import KcBERT, SBERT


if __name__ == '__main__':
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
        
    # model init
    KcBERT_model = KcBERT()
    SBERT_model = SBERT()
    for i in range(1, 10):
        KcBERT_model.predict(predict_sentence="하.... 이 놈의 나라 노인네들은 또 의병이 나라 지키기를 원하는 건가??? 정녕 니 후손들이 통일된 민족, 좋은 나라, 공정한 나라에서 사는 게 그렇게 싫더냐? 미친 노인네들 어휴...")
        #SBERT_model.analysis("본문", "댓글")
    print(123)
    