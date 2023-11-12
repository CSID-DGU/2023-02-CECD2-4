import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { leave } from '../../redux/modules/toggleAdminHeader';
import Main from "../../components/Main/Main";
import RepInfo from "./RepInfo";
import LineChart from './LineChart';
import PieChart from './PieChart';
import RepComment from './RepComment';
import Loading from '../../components/Loading/Loading';
import Modal from '../../components/Modal/Modal';

const BottomContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
width:100%;
height:85%;
`;

const LeftContentContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
width:50%;
height:100%;
min-width: 360px;
`;

const CommentsContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
width:100%;
height:30%;
`;

const CommentsContainerCaption = styled.div`
width:95%;
font-family: "aggro";
font-weight: 700;
color:#777;
border-bottom: 2px solid #ccc;
font-size:20px;
`;
const Link2Detail = styled(Link)`
font-family:"aggro";
font-weight: 500;
color:#777;
text-decoration:none;
font-size:15px;
margin-left:10px;
transition:all 0.2s ease-in-out;
&:hover {
    color:#bbb;
    transition:all 0.2s ease-in-out;
}
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

const SearchResultPage = () => {
    const [searchKeyword, setSearchKeyword] = useState(new URL(window.location).searchParams.get('keyword'));
    const [loading, setLoading] = useState(true);
    const [isRender, setIsRender] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/");
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        CheckKeyword();
        setLoading(false);
    }, []);

    const CheckKeyword = async () => {
        const response = await axios.get("http://localhost:8080/keywords");
        if(response.data.find(FindKeyword) === undefined) {
            openModal();
        } else {
            setIsRender(true);
        }
    };

    const FindKeyword = item => { return item.name === searchKeyword}

    useEffect(() => {
        dispatch(leave())
    }, [dispatch]);

    return (
        <Main>
            {loading ? 
            <Loading/> : 
            isRender ?  
            <>
            <RepInfo keyword={searchKeyword}/>
            <BottomContainer>
                <LineChart/>
                <LeftContentContainer>
                    <PieChart/>
                    <CommentsContainer>
                        <CommentsContainerCaption>
                            대표 댓글
                            <Link2Detail to="/emotion_detail/">
                                {'>'} 자세히 보기
                            </Link2Detail>
                        </CommentsContainerCaption>
                        <RepComment emotion="긍정" color="red"/>
                        <RepComment emotion="부정" color="blue"/>
                    </CommentsContainer>
                </LeftContentContainer>
            </BottomContainer>
            </> :
            null}
            <Modal isOpen={isModalOpen} closeModal={closeModal} 
            title={"존재하지 않는 키워드"}>
                <ModalLine/>
                <ModalDesc>
                    키워드가 존재하지 않습니다. 다시 검색해주세요.
                </ModalDesc>
            </Modal>
        </Main>
    );
};

export default SearchResultPage;