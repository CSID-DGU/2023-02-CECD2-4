import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
background-color:#888;
text-decoration:none;
transition: all 0.2s ease-in-out;
&:hover {
    background-color:#ccc;
    transition: all 0.2s ease-in-out;
}
`;


const LoginForm = (props) => {
    const navigate = useNavigate();

    const onChangeID = (e) => {
        props.setId(e.target.value);
    }

    const onChangePW = (e) => {
        props.setPw(e.target.value);
    }

    const onLogin = async (e) => {
        if(props.id.length === 0 || props.pw.length === 0) {
            props.openModal();
            return;
        }

        try {
            const response = await axios.post(
                "https://"+process.env.REACT_APP_ADDRESS+"/auth/signin",
                { "login_id": props.id, "password": props.pw },
                {"Content-Type": "application/json", "accept": "application/json"});
            window.sessionStorage.setItem("token_info", JSON.stringify(response.data.token_info));
            window.sessionStorage.setItem("username", JSON.stringify(response.data.user));
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token_info.access_token}`;
            navigate("/admin/index/");
        } catch(err) {
            props.openModal();
        }
    }

    const onEnterKey = (e) => {
        if(e.key === "Enter")
            onLogin();
    };

    return (
        <LoginFormContainer onKeyUp={onEnterKey}>
            <TextBoxContainer>
                <Input type="text" placeholder=" " onChange={onChangeID}></Input>
                <Label>ID</Label>
            </TextBoxContainer>
            <TextBoxContainer>
                <Input type="password" placeholder=" " onChange={onChangePW}></Input>
                <Label>PW</Label>
            </TextBoxContainer>
            <LoginBtn onClick={onLogin}>로그인</LoginBtn>
        </LoginFormContainer>
    );
};

export default LoginForm;