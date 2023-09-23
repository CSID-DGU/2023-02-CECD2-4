from dotenv import load_dotenv
from os import environ
from typing import TypedDict
load_dotenv() # dotenv 파일 로딩

class KeyType(TypedDict):
  AWS_ACCESS_KEY: str
  AWS_SECRET_KEY: str
  AWS_REGION: str
  SQS_URL: str
  S3_BUCKET: str


keys: KeyType = {
  "AWS_ACCESS_KEY": environ["AWS_ACCESS_KEY"],
  "AWS_SECRET_KEY": environ["AWS_SECRET_KEY"],
  "AWS_REGION": environ["AWS_REGION"],
  "SQS_URL": environ["SQS_URL"],
  "S3_BUCKET": environ["S3_BUCKET"],
}
