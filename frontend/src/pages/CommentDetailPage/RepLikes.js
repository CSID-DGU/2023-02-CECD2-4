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
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
height:100%;
`;

const RepLikes = (props) => {
    return (
        <LikesInfo>
            <BorderLabel>
                댓글 정보
            </BorderLabel>
            <InfoContainer>
                <div>좋아요 개수 : {props.content.sympathy} 개</div>                
                <div>싫어요 개수 : {props.content.antipathy} 개</div>
                <div>
                    이 댓글은 {props.content.createdAt.substring(0,4)}년&nbsp; 
                    {props.content.createdAt.substring(5,7)}월&nbsp;
                    {props.content.createdAt.substring(8,10)}일&nbsp;
                    {props.content.createdAt.substring(11,13)}시&nbsp;
                    {props.content.createdAt.substring(14,16)}분&nbsp;
                    {props.content.createdAt.substring(17,19)}초에 작성된 댓글입니다.
                </div>
            </InfoContainer>
        </LikesInfo>
    );
};

export default RepLikes;