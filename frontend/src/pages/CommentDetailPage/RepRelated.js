import React from 'react';
import styled from 'styled-components';

const RelatedInfo = styled.div`
position:relative;
font-size:15px;
width:90%;
height:60%;
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

const RepRelated = (props) => {
    return (
        <RelatedInfo>
            <BorderLabel>
                댓글과 관련된 본문 문장
            </BorderLabel>
            {props.content}
        </RelatedInfo>
    );
};

RepRelated.defaultProps = {
    content: "기사 본문에서 댓글과 연관된 문장을 표시하는 영역입니다."
};

export default RepRelated;