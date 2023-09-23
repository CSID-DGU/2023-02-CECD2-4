import boto3
from mypy_boto3_sqs import SQSClient
from mypy_boto3_s3 import S3Client
from settings.key import keys
from utils.s3 import getNewsResponse
from utils.sqs import getMessagesFromSQS


if __name__ == '__main__':
    sqs: SQSClient = boto3.client(
        'sqs',
        aws_access_key_id=keys['SQS_ACCESS_KEY'],
        aws_secret_access_key=keys['SQS_SECRET_KEY'],
        region_name=keys['SQS_REGION']
    )

    s3: S3Client = boto3.client(
        's3',
        aws_access_key_id=keys['AWS_ACCESS_KEY'],
        aws_secret_access_key=keys['AWS_SECRET_KEY'],
        region_name=keys['AWS_REGION']
    )
    queue_url = keys['SQS_URL']

    sqs_response = getMessagesFromSQS(sqs, queue_url)
    for res in sqs_response:
        news_response = getNewsResponse(s3, keys['S3_BUCKET'], res['key'])
        print(news_response['keyword'])
        print(news_response['data'][0]['comments'][0])
        print(news_response)