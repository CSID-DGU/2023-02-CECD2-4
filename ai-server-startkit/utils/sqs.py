from mypy_boto3_sqs import SQSClient
from json import loads
from .types import SQSMessage


def getMessagesFromSQS(sqs: SQSClient, queue_url: str, max_message = 10, wait_time = 20) -> list[SQSMessage]:
    response = sqs.receive_message(
        QueueUrl=queue_url,
        MaxNumberOfMessages=max_message,
        WaitTimeSeconds=wait_time)

    sqs_messages: list[SQSMessage] = []
    if response.get('Messages'):  # 메시지 내용 있으면 처리
        messages = response['Messages']
        for message in messages:
            body = message['Body']
            sqs_msg: SQSMessage = loads(body)
            sqs_messages.append(sqs_msg)
            try:
                handle = message['ReceiptHandle']
                del_response = sqs.delete_message(
                    QueueUrl=queue_url,
                    ReceiptHandle=handle
                )
            except:
                print('에러가 발생하는 상황!')
    return sqs_messages
