import React from 'react';
import Main from "../../components/Main/Main";
import SearchBox from "./SearchBox";
import IssueKeywords from './IssueKeywords';

const IndexPage = () => {
    return (
        <Main>
            <SearchBox/>
            <IssueKeywords/>
        </Main>
    );
};

export default IndexPage;