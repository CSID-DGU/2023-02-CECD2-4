import React, {useEffect, useState} from 'react';
import Main from "../../../components/Main/Main";
import SubHeader from "./SubHeader";
import ContentContainer from './ContentContainer';
import { useDispatch } from 'react-redux';
import { enter } from '../../../redux/modules/toggleAdminHeader';
import { addPage } from '../../../redux/modules/toggleAddManage';
import Modal from '../../../components/Modal/Modal';
import styled from 'styled-components';

const AddBtn = styled.button`
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
margin-top:10px;
`;

const AdminAddKeywordPage = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {setIsModalOpen(true); console.log("open");}
    const closeModal = () => {setIsModalOpen(false); console.log("close");}

    useEffect(() => {
        dispatch(enter());
        dispatch(addPage());
    }, [dispatch]);
    return (
        <Main>
            <SubHeader/>
            <ContentContainer/>
            <AddBtn onClick={openModal}>추가</AddBtn>
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <p>모달테스트요</p>
            </Modal>
        </Main>
    );
};

export default AdminAddKeywordPage;