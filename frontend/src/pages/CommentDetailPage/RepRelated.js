import React from 'react';
import styled from 'styled-components';

const RelatedInfo = styled.div`
position:relative;
font-size:15px;
width:90%;
min-height:60%;
margin-top: 25px;
margin-bottom: 25px;
font-family: "aggro";
font-weight: 500;
color:#777;
border: 2px solid #aaa;
border-radius: 5px;
padding: 15px 15px;
`;
const BorderLabel = styled.label`
position:absolute;
left:7px;
top:-7px;
color:#777;
font-size:13px;
background-color:white;
padding-right:3px;
padding-left:3px;
`;
const SentenceContainer = styled.div`
height:100%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
`;
const Sentence = styled.div`
margin: 7px 0px;
`;

const RepRelated = (props) => {
    const renderSentences = (data) => {
        let result = [];
        for(let i in data) {
            result.push(<Sentence key={i}>{data[i].content}</Sentence>);
        }
        return result;
    }
    return (
        <RelatedInfo>
            <BorderLabel>
                댓글과 관련된 본문 문장
            </BorderLabel>
            <SentenceContainer>
                {renderSentences(props.content)}
            </SentenceContainer>
        </RelatedInfo>
    );
};

export default RepRelated;