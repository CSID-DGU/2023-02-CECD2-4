import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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
const ModalDesc = styled.div`
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;
width:30vw;
height:15vh;
`;

const AdminDetailKeywordPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [registerId, setRegisterId] = useState("");
    const [registerDate, setRegisterDate] = useState();
    const [updateDate, setUpdateDate] = useState();
    const [status, setStatus] = useState();
    const [desc, setDesc] = useState();
    const [reason, setReason] = useState("");
    const [isDisable, setIsDisable] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const openResultModal = () => {
        setIsResultModalOpen(true);
    }
    const closeResultModal = () => {
        setIsResultModalOpen(false);
        navigate("/admin/manage/index");
    }

    const onClickBack = (e) => {
        navigate(-1);
    }
    
    const onChangeReason = (e) => {
        setReason(e.target.value);
    }

    const onChangeCheck = (e) => {
        setIsDisable(e.target.checked);
    }

    const onClickAble = async (e) => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.sessionStorage.getItem("token_info")).access_token}`;
            const response = await axios.put(
                "https://"+process.env.REACT_APP_ADDRESS+"/keywords",
                { "id": registerId, "description": desc, "isActive": true, "memo": reason },
                );
            setIsSuccess(true);
            openResultModal();
        } catch(err) {
            setIsSuccess(false);
            openResultModal();
        }
    }

    const onClickSubmit = async () => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.sessionStorage.getItem("token_info")).access_token}`;
            const response = await axios.put(
                "https://"+process.env.REACT_APP_ADDRESS+"/keywords",
                { "id": registerId, "description": desc, "isActive": isDisable ? false : location.state.isActive, "memo": reason },
                );
            closeModal();
            setIsSuccess(true);
            openResultModal();
        } catch(err) {
            closeModal();
            setIsSuccess(false);
            openResultModal();
        }
    }

    useEffect(() => {
        dispatch(enter());
        dispatch(managePage());
    }, [dispatch]);

    useEffect(() => {
        setKeyword(location.state.name);
        setRegisterId(location.state.id);
        setRegisterDate(location.state.createdAt.substring(0,10)+" "+location.state.createdAt.substring(11,19));
        setUpdateDate(location.state.updatedAt.substring(0,10)+" "+location.state.updatedAt.substring(11,19));
        setStatus((location.state.isActive ? "활성화" : "비활성화"));
        setDesc(location.state.description);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Main>
            <TopContainer>
                <Label>상세 키워드</Label>
                <Line/>
            </TopContainer> 
            <ContentContainer keyword={keyword} id={registerId} created={registerDate} updated={updateDate} status={status} desc={desc} setDesc={setDesc}/>
            <BtnContainer>
                {location.state.isActive ? null : <Btn onClick={onClickAble}>활성화</Btn>}
                <Btn onClick={openModal}>수정</Btn>
                <Btn onClick={onClickBack}>돌아가기</Btn>
            </BtnContainer>
            <Modal isOpen={isModalOpen} closeModal={closeModal} title="키워드 수정" customBtn={() => <ModalBtn onClick={onClickSubmit}>확인</ModalBtn>}>
                <ModalLine/>
                <ModalContainer>
                    <ModalLabel>수정자 ID</ModalLabel>
                    <IDLabel>{JSON.parse(window.sessionStorage.getItem("username")).name}</IDLabel>
                </ModalContainer>
                <ModalContainer>
                    <ModalLabel>수정 사유</ModalLabel>
                    <ModalTextArea onChange={onChangeReason}/>
                </ModalContainer>
                <CautionContainer>
                    <Caution>키워드를 해제하면 더이상 해당키워드에 대한 정보를 수집하지 않습니다. 키워드를 해제한 취소자 정보는 데이터베이스에 보관되므로 다시 한번 잘못된 부분은 없는지 검토하시길 바랍니다. 악의적인 키워드 해제는 취소자 책임이 될 수 있습니다.</Caution>
                    <AgreeLabel><input type="checkbox" onChange={onChangeCheck}/>위 사실에 동의하며 키워드를 해제하겠습니다.</AgreeLabel>
                </CautionContainer>
            </Modal>
            <Modal isOpen={isResultModalOpen} closeModal={closeResultModal} title="키워드 수정">
                <ModalLine/>
                <ModalDesc>
                    {isSuccess ? "키워드 수정을 성공했습니다." : "키워드 수정에 실패했습니다."}
                </ModalDesc>
            </Modal>
        </Main>
    );
};

export default AdminDetailKeywordPage;