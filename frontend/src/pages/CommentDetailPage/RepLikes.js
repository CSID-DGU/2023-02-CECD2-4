import React from 'react';
import styled from 'styled-components';

const LikesInfo = styled.div`
position:relative;
font-size:15px;
width:30%;
height:75%;
font-family: "aggro";
font-weight: 500;
color:#777;
border: 2px solid #aaa;
border-radius: 5px;
padding:15px 10px;
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

const RepLikes = (props) => {
    return (
        <LikesInfo>
            <BorderLabel>
                댓글 정보
            </BorderLabel>
            {props.likes}
        </LikesInfo>
    );
};

RepLikes.defaultProps = {
    likes: "댓글 좋아요/싫어요 정보 및 날짜 등의 정보가 표시되는 영역입니다."
};

export default RepLikes;