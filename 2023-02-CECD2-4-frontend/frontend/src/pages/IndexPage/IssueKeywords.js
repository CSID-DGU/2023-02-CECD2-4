import React from 'react';
import "./IssueKeywords.css";

const IssueKeywords = () => {
    return (
        <div className="issue_keyword_container">
            <div className="keywords_caption">최근 이슈 키워드</div>
            <div className="keywords_container">
                <div className="keyword">#컴퓨터공학과</div>
                <div className="keyword">#종합설계</div>
                <div className="keyword">#팀바나나</div>
            </div>
            <hr/>
        </div>
    );
};

export default IssueKeywords;