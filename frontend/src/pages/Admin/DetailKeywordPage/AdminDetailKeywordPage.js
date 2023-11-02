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

const ModalLine = styled.hr`
height:1px;
backgroun-color:#aaa;
border:0;
`;
const ModalContainer = styled.div`
display:flex;
width:30vw;
font-size:23px;
margin-top:20px;
margin-bottom:20px;
`;
const ModalLabel = styled.div`
width:30%;
font-weight:700;
`;
const IDLabel = styled.div`
display:flex;
width:70%;
border: 2px solid #aaa;
border-radius: 2px;
font-size:15px;
align-items:center;
padding-left:5px;
color:#555;
`;
const ModalTextArea = styled.textarea`
font-family:"aggro";
font-size:15px;
color:#555;
width:70%;
height:10em;
resize:none;
border: 2px solid #aaa;
border-radius: 2px;
`;
const ModalBtn = styled(Btn)`
width:120px;
height:40px;
margin:0 5px;
`;
const Caution = styled.div`
width:100%;
font-size:10px;
color:#555;
`;
const CautionContainer = styled(ModalContainer)`
flex-direction:column;
align-items:center;
`;
const AgreeLabel = styled.div`
display:flex;
align-items:center;
font-size:15px;
`;

const AdminDetailKeywordPage = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

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
            <Modal isOpen={isModalOpen} closeModal={closeModal} title="키워드 해제" customBtn={() => <ModalBtn>테스트</ModalBtn>}>
                <ModalLine/>
                <ModalContainer>
                    <ModalLabel>취소자 ID</ModalLabel>
                    <IDLabel>관리자1</IDLabel>
                </ModalContainer>
                <ModalContainer>
                    <ModalLabel>취소 사유</ModalLabel>
                    <ModalTextArea/>
                </ModalContainer>
                <CautionContainer>
                    <Caution>키워드를 해제하면 더이상 해당키워드에 대한 정보를 수집하지 않습니다. 키워드를 해제한 취소자 정보는 데이터베이스에 보관되므로 다시 한번 잘못된 부분은 없는지 검토하시길 바랍니다. 악의적인 키워드 해제는 취소자 책임이 될 수 있습니다.</Caution>
                    <AgreeLabel><input type="checkbox"/>위 사실에 동의합니다.</AgreeLabel>
                </CautionContainer>
            </Modal>
        </Main>
    );
};

export default AdminDetailKeywordPage;