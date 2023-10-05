import React from 'react';
import Main from "../../components/Main/Main";
import RepInfo from "./RepInfo";
import LineChart from './LineChart';
import PieChart from './PieChart';
import RepComment from './RepComment';
import styled from 'styled-components';

const BottomContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
width:100%;
height:85%;
`;

const LeftContentContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
width:50%;
height:100%;
min-width: 360px;
`;

const CommentsContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
width:100%;
height:30%;
`;

const CommentsContainerCaption = styled.div`
width:95%;
font-family: "aggro";
font-weight: 700;
color:#777;
border-bottom: 2px solid #ccc;
font-size:20px;
`;

const SearchResultPage = () => {
    return (
        <Main>
            <RepInfo/>
            <BottomContainer>
                <LineChart/>
                <LeftContentContainer>
                    <PieChart/>
                    <CommentsContainer>
                        <CommentsContainerCaption>대표 댓글</CommentsContainerCaption>
                        <RepComment emotion="긍정" color="red"/>
                        <RepComment emotion="부정" color="blue"/>
                    </CommentsContainer>
                </LeftContentContainer>
            </BottomContainer>
        </Main>
    );
};

export default SearchResultPage;