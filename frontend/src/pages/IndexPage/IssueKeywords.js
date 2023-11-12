import React from 'react';
import {Link} from "react-router-dom";
import "./IssueKeywords.css";

const IssueKeywords = ({keywords}) => {
    return (
        <div className="issue_keyword_container">
            <div className="keywords_caption">최근 이슈 키워드</div>
            <div className="keywords_container">
                {
                    keywords.map((elem, index) => {
                        return(
                            <Link to={"/search_result?keyword=" + elem.name} className="keyword" key={index}>
                                #{elem.name}
                            </Link>
                        )
                    })
                }
            </div>
            <hr/>
        </div>
    );
};

export default IssueKeywords;