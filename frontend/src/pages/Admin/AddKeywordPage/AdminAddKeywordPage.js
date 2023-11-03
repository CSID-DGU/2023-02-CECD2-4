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
            <Modal isOpen={isModalOpen} closeModal={closeModal} 
            title={isSuccess ? "키워드 추가 성공" : "키워드 추가 실패"} 
            customBtn={() => isSuccess ? <ModalBtn>관리</ModalBtn> : null}>
                <ModalLine/>
                { isSuccess ?
                <ModalDesc>키워드 추가에 성공했습니다. 추가된 키워드는 검토 중 상태가 되며, 검토 후 수락 또는 거절 될 수 있습니다.</ModalDesc> :
                <ModalDesc><div>키워드를 추가하지 못했습니다.</div><div>사유:test</div></ModalDesc>
                }
            </Modal>
        </Main>
    );
};

export default AdminAddKeywordPage;