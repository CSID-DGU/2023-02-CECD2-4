import React from 'react';
import styled from 'styled-components';

const LikesInfo = styled.div`
font-size:20px;
width:30%;
height:100%;
font-family: "aggro";
font-weight: 500;
color:#777;
border: 2px solid #aaa;
`;

const RepLikes = (props) => {
    return (
        <LikesInfo>{props.likes}</LikesInfo>
    );
};

RepLikes.defaultProps = {
    likes: "댓글 좋아요/싫어요 정보"
};

export default RepLikes;