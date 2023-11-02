import React, {useEffect, useState} from 'react';
import Main from "../../../components/Main/Main";
import styled from 'styled-components';
import ContentContainer from './ContentContainer';
import { useDispatch } from 'react-redux';
import { enter } from '../../../redux/modules/toggleAdminHeader';
import { managePage } from '../../../redux/modules/toggleAddManage';
import Modal from '../../../components/Modal/Modal';

const TopContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: nowrap;
width:90%;
height:20%;
`;

const Label = styled.div`
display: flex;
align-items: center;
height:100%;
margin-top:30px;
font-family: "aggro";
font-weight: 700;
font-size:30px;
color:#555;
`;

const Line = styled.div`
width:100%;
height:50%;
border-top: 1px solid #aaa;
margin: 10px auto;
`;
const BtnContainer = styled.div`
display:flex;
justify-content:space-evenly;
`;
const Btn = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:200px;
height:40px;
font-family: "aggro";
font-weight: 500;
font-size:20px;
color:#444;
background-color: #888888;
text-decoration:none;;
transition: all 0.2s ease-in-out;
border-radius:10px;
&:hover {
    background-color: #ccc;
    transition: all 0.2s ease-in-out;
}
margin:20px;
`;

const AdminDetailKeywordPage = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {setIsModalOpen(false);}

    useEffect(() => {
        dispatch(enter());
        dispatch(managePage());
    }, [dispatch]);
    return (
        <Main>
            <TopContainer>
                <Label>상세 키워드</Label>
                <Line/>
            </TopContainer> 
            <ContentContainer/>
            <BtnContainer>
                <Btn onClick={openModal}>해제</Btn>
                <Btn>돌아가기</Btn>
            </BtnContainer>
            <Modal isOpen={isModalOpen} closeModal={closeModal} title="키워드 해제">

            </Modal>
        </Main>
    );
};

export default AdminDetailKeywordPage;