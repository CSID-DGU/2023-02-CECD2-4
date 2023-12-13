import React, { useState, useEffect} from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Main from "../../components/Main/Main";
import RepInfo from "./RepInfo";
import RepDetailComment from './RepDetailComment';
import RepLikes from "./RepLikes";
import RepRelated from './RepRelated';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { leave } from '../../redux/modules/toggleAdminHeader';
import Loading from '../../components/Loading/Loading';
import Modal from '../../components/Modal/Modal';

const BottomContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
width:100%;
height:30%;
`;

const CommentsDetailContainer = styled.div`
display:flex;
flex-direction: row;
justify-content: space-evenly;
width:100%;
height:50%;
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

const CommentDetailPage = () => {
    const [searchKeyword, setSearchKeyword] = useState(new URL(window.location).searchParams.get('keyword'));
    const [loading, setLoading] = useState(true);
    const [isRender, setIsRender] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAbnormal, setIsAbnormal] = useState(false);
    const [keywordId, setKeywordId] = useState();
    const [data, setData] = useState({});

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/");
    }

    useEffect(() => {
        dispatch(leave())
    }, [dispatch]);

    useEffect(() => {
        setLoading(true);
        CheckKeywordAndLoading();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const CheckKeywordAndLoading = async () => {
        let response = await axios.get("https://"+process.env.REACT_APP_ADDRESS+"/keywords");
        if(await response.data.find(FindKeyword) === undefined || location.state === null) {
            if(location.state === null)
                setIsAbnormal(true);
            openModal();
        } else {
            setKeywordId(response.data.find(FindKeyword).id);
            response = await axios.get("https://"+process.env.REACT_APP_ADDRESS+
                "/search/detail/comment/"+location.state.comment.id);
            setData(response.data);
            setIsRender(true);
        }
    };

    const FindKeyword = item => { return item.name === searchKeyword}

    return (
        <Main>
            {loading ? 
            <Loading/> : 
            isRender ?  
            <>
            <RepInfo keyword={location.state.keyword} emotion={location.state.emotion}/>
            <CommentsDetailContainer>
                <RepDetailComment comment={data.content} link={data.link}/>
                <RepLikes content={data}/>
            </CommentsDetailContainer>
            <BottomContainer>
                <RepRelated content={data.news_sentences}/>
            </BottomContainer>
            </> :
            null}
            <Modal isOpen={isModalOpen} closeModal={closeModal} 
                title={ (isAbnormal) ? "비정상적인 접근" : "존재하지 않는 키워드"}>
                <ModalLine/>
                <ModalDesc>
                    { (isAbnormal) ?
                        "비정상적인 접근입니다." : "키워드가 존재하지 않습니다. 다시 검색해주세요."
                    }
                </ModalDesc>
            </Modal>
        </Main>
    );
};

export default CommentDetailPage;