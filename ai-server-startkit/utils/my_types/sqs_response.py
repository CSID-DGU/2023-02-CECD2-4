from typing import TypedDict

class Keyword(TypedDict):
  id: int
  name: str

class SQSMessage(TypedDict):
  keyword: Keyword
  key: str
