from typing import TypedDict

class Article(TypedDict):
  title: str
  publishedAt: str
  body: list[str]

class Comment(TypedDict):
  contents: str
  sympathyCount: int
  antipathyCount: int
  date: str

class DataType(TypedDict):
  url: str
  news: Article
  comments: list[Comment]

class CrawlingDataType(TypedDict):
  keyword: str
  data: list[DataType]