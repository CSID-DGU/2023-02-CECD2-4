import boto3
from mypy_boto3_sqs import SQSClient
from mypy_boto3_s3 import S3Client
from settings.key import keys
from utils.s3 import getNewsResponse

# sqs: SQSClient = boto3.client(
#     'sqs',
#     aws_access_key_id=keys['SQS_ACCESS_KEY'],
#     aws_secret_access_key=keys['SQS_SECRET_KEY'],
#     region_name=keys['SQS_REGION']
# )

s3: S3Client = boto3.client(
    's3',
    aws_access_key_id=keys['AWS_ACCESS_KEY'],
    aws_secret_access_key=keys['AWS_SECRET_KEY'],
    region_name=keys['AWS_REGION']
)
queue_url = keys['SQS_URL']

news_response = getNewsResponse(s3, keys['S3_BUCKET'], 'temp85328ad8-7fc1-41b5-967b-32e0894665fc.json')
print(news_response['keyword'])
print(news_response['data'][0]['comments'][0])

# response = sqs.receive_message(
#     QueueUrl=queue_url,
#     MaxNumberOfMessages=10,
#     WaitTimeSeconds=20
# )

# if response.get('Messages'): # 메시지 내용 있으면 처리
#     messages = response['Messages']
#     for message in messages:
#         body = message['Body']
#         try:
#             ### TODO body 파싱해서 문자열 기반 처리. 잘 처리되면 메시지 삭제
#             handle = message['ReceiptHandle']
#             del_response = sqs.delete_message(
#                 QueueUrl=queue_url,
#                 ReceiptHandle=handle
#             )
#         except:
#             ### 처리 안되면 로그 남기는 등 동작 수행
#             print('에러가 발생하는 상황!')
