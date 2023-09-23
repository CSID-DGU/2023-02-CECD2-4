from mypy_boto3_sqs import SQSClient
from json import loads
from typing import TypeVar

T = TypeVar('T')

def getMessagesFromSQS(sqs: SQSClient, queue_url: str, )-> list[T]:
  response = sqs.receive_message(
      QueueUrl=queue_url,
      MaxNumberOfMessages=10,
      WaitTimeSeconds=20
  )
  response: list[T] = []

  if response.get('Messages'):  # 메시지 내용 있으면 처리
      messages = response['Messages']
      for message in messages:
          body = message['Body']
          loads(body)
          try:
              # TODO body 파싱해서 문자열 기반 처리. 잘 처리되면 메시지 삭제
              handle = message['ReceiptHandle']
              del_response = sqs.delete_message(
                  QueueUrl=queue_url,
                  ReceiptHandle=handle
              )
          except:
              # 처리 안되면 로그 남기는 등 동작 수행
              print('에러가 발생하는 상황!')
