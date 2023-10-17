import React from 'react';
import styled from 'styled-components';

const RelatedInfo = styled.div`
font-size:20px;
width:90%;
height:80%;
margin-top: 25px;
margin-bottom: 25px;
font-family: "aggro";
font-weight: 500;
color:#777;
border: 2px solid #aaa;
`;
const RepRelated = (props) => {
    return (
        <RelatedInfo>{props.content}</RelatedInfo>
    );
};

RepRelated.defaultProps = {
    content: "기사 본문 연관 문장"
};

export default RepRelated;