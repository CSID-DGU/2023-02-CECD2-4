from typing import TypedDict

## Article 관련

class Article(TypedDict):
  '''
  뉴스 기사 타입
  '''
  title: str
  publishedAt: str
  body: list[str]

class Comment(TypedDict):
  '''
  뉴스 댓글 타입
  '''
  contents: str
  sympathyCount: int
  antipathyCount: int
  date: str

class DataType(TypedDict):
  '''
  뉴스 관련 정보를 담고 있는 데이터 타입
  '''
  url: str
  news: Article
  comments: list[Comment]

class CrawlingDataType(TypedDict):
  '''
  S3 json으로부터 가져오는 데이터의 타입
  '''
  keyword: str
  data: list[DataType]
