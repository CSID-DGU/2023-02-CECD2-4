import React from 'react';
import styled from 'styled-components';

const IssueContactContainer = styled.div`
position:relative;
display: flex;
width:45%;
height:30%;
border:2px solid #aaa;
border-radius:10px;
font-family:"aggro";
font-weight:300;
font-size:11px;
color:#444;
`;
const Label = styled.label`
position:absolute;
left:20px;
top:-10px;
font-family:"aggro";
font-weight:500;
font-size:20px;
color:#444;
background-color:white;
`;
const Content = styled.div`
padding:20px;
`;

const IssueContact = (props) => {
    return (
        <IssueContactContainer>
            <Label>참고사항</Label>
            <Content>{props.issue_content}</Content>
        </IssueContactContainer>
    );
};

IssueContact.defaultProps = {
    issue_content : "이슈가 아직 없습니다."
};

export default IssueContact;