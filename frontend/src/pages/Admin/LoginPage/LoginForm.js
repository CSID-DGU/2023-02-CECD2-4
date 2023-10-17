import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginFormContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
width:50%;
height:50%;
`;
const TextBoxContainer = styled.div`
position:relative;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
width:55%;
height:50px;
`;
const Label = styled.label`
position:absolute;
left:0;
color:#ccc;
font-family: "aggro";
font-size:20px;
transform-origin: 0 0;
transition: transform 0.2s ease-in-out;
pointer-events: none;
`;
const Input = styled.input`
border:none;
border-bottom: 2px solid #ccc;
background-color: unset;
outline:none;
width:100%;
height: 50px;
font-family: "aggro";
font-size: 25px;
color:#444;
caret-color: #bbb;
input:focus + label, input:not(:placeholder-shown) + label{
    transform: translateY(-27px) scale(0.7);
}
`;
const LoginBtn = styled(Link)`
display:flex;
justify-content:center;
align-items:center;
width:40%;
height:50px;
font-family:"aggro";
font-size:25px;
color:#444;
border:0 none;
border-radius:15px;
background-color:#888;
text-decoration:none;
transition: all 0.2s ease-in-out;
&:hover {
    background-color:#ccc;
    transition: all 0.2s ease-in-out;
}
`;
const LoginForm = (props) => {
    return (
        <LoginFormContainer>
            <TextBoxContainer>
                <Input type="text" placeholder=" "></Input>
                <Label>ID</Label>
            </TextBoxContainer>
            <TextBoxContainer>
                <Input type="password" placeholder=" "></Input>
                <Label>PW</Label>
            </TextBoxContainer>
            <LoginBtn to="/admin/index">로그인</LoginBtn>
        </LoginFormContainer>
    );
};

export default LoginForm;