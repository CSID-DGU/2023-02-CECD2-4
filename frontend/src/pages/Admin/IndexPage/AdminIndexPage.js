import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../../components/Main/Main';
import AddKeyword from './AddKeyword';
import ManageKeyword from './ManageKeyword';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { enter } from '../../../redux/modules/toggleAdminHeader';
import { indexPage } from '../../../redux/modules/toggleAddManage';
import Modal from '../../../components/Modal/Modal';

const ManagementContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width:70%;
height:60%;
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

const AdminIndexPage = (props) => {
    const [isRender, setIsRender] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/admin/login/");
    }

    useEffect(() => {
        dispatch(enter());
        dispatch(indexPage());
    }, [dispatch]);

    useEffect(() => {
        if(window.sessionStorage.getItem("token_info") === null) {
            openModal();
        } else {
            setIsRender(true);
        }
    }, []);

    return (
        <Main justify="center">
            {(isRender) ?
            <ManagementContainer>
                <AddKeyword/>
                <ManageKeyword/>
            </ManagementContainer>
            : null}
            <Modal isOpen={isModalOpen} closeModal={closeModal} 
                title={"비정상적인 접근"}>
                <ModalLine/>
                <ModalDesc>로그인을 해주세요.</ModalDesc>
            </Modal>
        </Main>
    );
};

export default AdminIndexPage;