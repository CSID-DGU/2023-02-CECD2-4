import React from 'react';
import styled from 'styled-components';

const FormBox = styled.div`
display: flex;
flex-direction: column;
font-size:20px;
width:50%;
height:60%;
border: 2px solid #aaa;
align-items: center;
`;

const TextBoxContainer = styled.div`
position:relative;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
width:55%;
height:30%px;
margin-top:50px;
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

const InputContent = styled.input`
border:none;
border: 2px solid #ccc;
background-color: unset;
outline:none;
width:100%;
height: 100px;
font-family: "aggro";
font-size: 15px;
color:#444;
caret-color: #bbb;
input:focus + label, input:not(:placeholder-shown) + label{
    transform: translateY(-27px) scale(0.7);
}
`;

const LoginBtn = styled.div`
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
background-color:#bbb;
margin-top:100px;
`;

const ContentContainer = (props) => {
    return (
        <FormBox>
            <TextBoxContainer>
                <Input type="text" placeholder=" "></Input>
                <Label>키워드</Label>
            </TextBoxContainer>
            <TextBoxContainer>
                <InputContent type="text" placeholder=" "></InputContent>
                <Label>키워드 설명 </Label>
            </TextBoxContainer>
            <LoginBtn>추가</LoginBtn>
        </FormBox>
    );
};

export default ContentContainer;