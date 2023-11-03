import React, {useEffect, useState} from 'react';
import Main from "../../../components/Main/Main";
import SubHeader from "./SubHeader";
import ContentContainer from './ContentContainer';
import { useDispatch } from 'react-redux';
import { enter } from '../../../redux/modules/toggleAdminHeader';
import { addPage } from '../../../redux/modules/toggleAddManage';
import Modal from '../../../components/Modal/Modal';
import styled from 'styled-components';

const AddBtn = styled.div`
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
margin-top:10px;
`;
const ModalBtn = styled(AddBtn)`
width:120px;
height:40px;
margin:0 5px;
`;

const AdminAddKeywordPage = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {setIsModalOpen(false);}

    useEffect(() => {
        dispatch(enter());
        dispatch(addPage());
    }, [dispatch]);

    return (
        <Main>
            <SubHeader/>
            <ContentContainer/>
            <AddBtn onClick={openModal}>추가</AddBtn>
            <Modal isOpen={isModalOpen} closeModal={closeModal} title="키워드 추가" customBtn={() => isSuccess ? <ModalBtn>테스트</ModalBtn> : null}>
                <p>모달테스트요</p>
            </Modal>
        </Main>
    );
};

export default AdminAddKeywordPage;