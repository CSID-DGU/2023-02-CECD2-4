import React from 'react';
import Main from "../../components/Main/Main";
import RepInfo from "./RepInfo";
import LineChart from './LineChart';
import PieChart from './PieChart';
import LeftContentContainer from './LeftContentContainer';
import CommentsContainer from './CommentsContainer';
import RepComment from './RepComment';

const SearchResultPage = () => {
    return (
        <Main direction="row" wrap="wrap">
            <RepInfo/>
            <LineChart/>
            <LeftContentContainer>
                <PieChart/>
                <CommentsContainer>
                    <RepComment/>
                    <RepComment/>
                </CommentsContainer>
            </LeftContentContainer>
        </Main>
    );
};

export default SearchResultPage;