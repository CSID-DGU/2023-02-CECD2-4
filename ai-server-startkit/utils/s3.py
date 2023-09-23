from mypy_boto3_s3 import S3Client
from json import loads
from .types import CrawlingDataType



def getNewsResponse(s3: S3Client, bucket: str, key: str) -> CrawlingDataType:
  '''
  S3 버킷으로부터 뉴스 본문을 읽고, 대응되는 객체로 전달한다.
  '''
  try:
      obj = s3.get_object(
        Bucket=bucket,
        Key=key
      )
  except:
      raise Exception('오브젝트가 존재하지 않음')
  
  body = loads(obj['Body'].read().decode('utf-8'))
  try:
     result = s3.delete_object(
        Bucket=bucket,
        Key=key
     )
  except: 
     raise Exception('파일 삭제 불가')
  
  return body