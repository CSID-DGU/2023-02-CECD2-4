import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    const [isRender, setIsRender] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [description, setDescription] = useState("");
    const [memo, setMemo] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {
        setIsModalOpen(false);
        if(isLogin === false)
            navigate("/admin/login/");
        if(isSuccess)
            navigate("/admin/index/");
    }

    const onClickManage = (e) => {
        navigate("/admin/manage/index");
    }

    useEffect(() => {
        dispatch(enter());
        dispatch(addPage());
    }, [dispatch]);

    useEffect(() => {
        if(window.sessionStorage.getItem("token_info") === null) {
            openModal();
        } else {
            setIsLogin(true);
            setIsRender(true);
        }
    }, []);

    useEffect(() => {
        if(keyword.length === 0 || description.length === 0 || memo.length === 0)
            setIsEmpty(true);
        else
            setIsEmpty(false);
    }, [keyword, description, memo]);

    const onClickAdd = async (e) => {
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.sessionStorage.getItem("token_info")).access_token}`;
            axios.interceptors.response.use(
                (res) => {
                    return res;
                },
                async (err) => {
                    const {
                        config,
                        response: { status },
                    } = err;

                    if(status === 401) {
                        if(err.response.data.message === "Unauthorized") {
                            const originReq = config;
                            const rtRes = await axios.get("https://"+process.env.REACT_APP_ADDRESS+"/auth/refresh");
                            
                            window.sessionStorage.setItem("token_info", JSON.stringify(rtRes.data));
                            axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.sessionStorage.getItem("token_info")).access_token}`;
                            originReq.headers["Authorization"] = `Bearer ${JSON.parse(window.sessionStorage.getItem("token_info")).access_token}`;

                            return axios(originReq);
                        }
                    }
                    return Promise.reject(err);
                }
            );
            const response = await axios.post(
                "https://"+process.env.REACT_APP_ADDRESS+"/keywords",
                { "name": keyword, "description": description, "memo": memo },
                { withCredentials: true });
            setIsSuccess(true);
            openModal();
        } catch(err) {
            if(err.response.status === 401)
                navigate("/admin/login");
            setIsSuccess(false);
            openModal();
        }
    }

    return (
        <Main>
            {(isRender) ?
            <>
            <SubHeader/>
            <ContentContainer setKeyword={setKeyword} setDescription={setDescription} setMemo={setMemo}/>
            <AddBtn onClick={onClickAdd}>추가</AddBtn>
            </>
            : null}
            <Modal isOpen={isModalOpen} closeModal={closeModal} 
            title={isLogin ? (!isEmpty && isSuccess ? "키워드 추가 성공" : "키워드 추가 실패") : "비정상적인 접근"} 
            customBtn={() => isLogin ? (isSuccess ? <ModalBtn onClick={onClickManage}>관리</ModalBtn> : null) : null}>
                <ModalLine/>
                { isLogin ? (
                    !isEmpty && isSuccess ?
                    <ModalDesc>키워드 추가에 성공했습니다. 추가된 키워드는 검토 중 상태가 되며, 검토 후 수락 또는 거절 될 수 있습니다.</ModalDesc> :
                    <ModalDesc><div>키워드를 추가하지 못했습니다.</div>
                    { isEmpty ? <div>사유: 빈 칸을 채워주세요.</div> : <div>사유: 이미 존재하는 키워드입니다.</div>}</ModalDesc>) :
                    <ModalDesc>로그인을 해주세요.</ModalDesc>
                }
            </Modal>
        </Main>
    );
};

export default AdminAddKeywordPage;