import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ManageKeywordBtn = styled(Link)`
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:flex-start;
font-family:"aggro";
width:20%;
height:40px;
color:#444;
overflow:hidden;
transition:all 0.2s ease-in-out;
background-color: #aaa;
padding:10px;
border:1px solid #999;
border-radius:10px;
text-decoration: none;
transition: all 0.2s ease-in-out;
&:hover {
    background-color: #eee;
    transition: all 0.2s ease-in-out;
}
`;
const Label = styled.span`
align-self:center;
font-size:20px;
`;
const Title = styled.p`
font-weight:700;
display:none;
`;
const ContentContainer = styled.div`
display:none;
flex-direction:column;
justify-content:space-evenly;
height:60%;
font-weight:300;
font-size:13px;
`;

const ManageKeyword = (props) => {
    const btn = useRef();
    const btn_label = useRef();
    const title_text = useRef();
    const content = useRef();

    const mouse_enter = () => { 
        btn.current.style.width = "55%";
        btn.current.style.height = "60%";
        title_text.current.style.display = "block";
        content.current.style.display = "flex";
    }
    const mouse_leave = () => {
        btn.current.style.width = "20%";
        btn.current.style.height = "40px";
        title_text.current.style.display = "none";
        content.current.style.display = "none";
    }
    return (
        <ManageKeywordBtn to="/admin/manage/index/"onMouseEnter={mouse_enter} onMouseLeave={mouse_leave} ref={btn}>
            <Label ref={btn_label}>키워드 관리</Label>
            <Title ref={title_text}>키워드를 관리할 수 있습니다.</Title>
            <ContentContainer ref={content}>
                <span>키워드 검색: 키워드를 검색합니다.</span>
                <span>키워드 목록: 키워드 목록을 나열합니다.</span>
                <span>정렬기준을 변경할 수 있습니다.</span>
                <span>키워드 삭제: 키워드를 삭제합니다.</span>
                <span>삭제된 키워드는 "삭제" 상태가 됩니다.</span>
            </ContentContainer>
        </ManageKeywordBtn>
    );
};

export default ManageKeyword;