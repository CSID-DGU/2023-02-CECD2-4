```mermaid
erDiagram
    Comment {
      number id PK
      date createdAt
      str content
      number sympathy
      number antipathy
    }

    Article {
      number id PK
      date createdAt
      string link
      string[] content
    }

    AnalysisComment {
      number id PK
      date createdAt
      str content
      number sympathy
      number antipathy
      string link
      string emotion
      number keyword_id FK
    }

    ArticleContent {
      string content
      number score
    }
    
    Keyword {
      number id PK
      string name
    }

    Article ||--o{ Comment: ""
    Keyword ||--o{ AnalysisComment: "" 
    AnalysisComment ||--|{ ArticleContent: ""
```