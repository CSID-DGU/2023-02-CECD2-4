import React, { useState, useEffect } from 'react';
import Main from '../../../components/Main/Main';
import LoginForm from './LoginForm';
import IssueContact from './IssueContact';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { leave } from '../../../redux/modules/toggleAdminHeader';
import Modal from '../../../components/Modal/Modal';

const CaptionContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:50%;
    height:10%;
    font-family:"aggro";
    font-weight:700;
    font-size:35px;
`;
const ModalLine = styled.hr`
height:1px;
backgroun-color:#aaa;
border:0;
`;
const ModalDesc = styled.div`
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;
width:30vw;
height:15vh;
`;

const AdminLoginPage = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(leave())
    }, [dispatch]);

    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <Main>
            <CaptionContainer>
                관리자 로그인
            </CaptionContainer>
            <LoginForm openModal={openModal}/>
            <IssueContact/>
            <Modal isOpen={isModalOpen} closeModal={closeModal} 
                title={"로그인 실패"}>
                <ModalLine/>
                <ModalDesc>아이디, 비밀번호를 확인해주세요.</ModalDesc>
            </Modal>
        </Main>
    );
};

export default AdminLoginPage;