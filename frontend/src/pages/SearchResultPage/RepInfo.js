import React from 'react';
import styled from 'styled-components';

const TopContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
width:100%;
height:15%;
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
const TimeSettingContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width:50%;
height:100%;
font-family: "aggro";
font-weight: 700;
font-size: 20px;
color:#555;
`;
const DateInput = styled.input`
width:30%;
height:25px;
`;

const RepInfo = (props) => {
    return (
        <TopContainer>
            <SearchKeywordContainer>
                <div>KEYWORD:&nbsp;{props.keyword}</div>
            </SearchKeywordContainer>
            <TimeSettingContainer>
                기간설정:&nbsp;<DateInput type="date"></DateInput>&nbsp;~&nbsp;<DateInput type="date"></DateInput>
            </TimeSettingContainer>
        </TopContainer>
    );
};

RepInfo.defaultProps = {
    keyword: "EXAMPLE"
};

export default RepInfo;