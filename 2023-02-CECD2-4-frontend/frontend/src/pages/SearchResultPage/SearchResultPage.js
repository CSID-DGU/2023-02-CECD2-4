import React from 'react';
import Main from "../../components/Main/Main";
import RepInfo from "./RepInfo";
import LineChart from './LineChart';
import PieChart from './PieChart';
import LeftContentContainer from './LeftContentContainer';
import CommentsContainer from './CommentsContainer';
import RepComment from './RepComment';
import "./SearchResultPage.css";

const SearchResultPage = () => {
    return (
        <Main>
            <RepInfo/>
            <div className="bottom_container">
                <LineChart/>
                <LeftContentContainer>
                    <PieChart/>
                    <CommentsContainer>
                        <RepComment emotion="긍정" color="red"/>
                        <RepComment emotion="부정" color="blue"/>
                    </CommentsContainer>
                </LeftContentContainer>
            </div>
        </Main>
    );
};

export default SearchResultPage;