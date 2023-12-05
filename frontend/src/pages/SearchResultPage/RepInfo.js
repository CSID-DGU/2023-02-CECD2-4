import React from 'react';
import styled from 'styled-components';

const TopContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
width:100%;
height:10%;
`;
const SearchKeywordContainer = styled.div`
display: flex;
align-items: center;
height:100%;
margin-left: 15px;
margin-right: auto;
font-family: "aggro";
font-weight: 700;
font-size:30px;
color:#555;
`;

const RepInfo = (props) => {
    return (
        <TopContainer>
            <SearchKeywordContainer>
                <div>KEYWORD:&nbsp;{props.keyword}</div>
            </SearchKeywordContainer>
        </TopContainer>
    );
};

RepInfo.defaultProps = {
    keyword: "EXAMPLE"
};

export default RepInfo;