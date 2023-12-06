import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Main from "../../components/Main/Main";
import RepInfo from "../SearchResultPage/RepInfo";
import PieChart from './PieChart';
import RepEmotion from './RepEmotion';
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
height:85%;
`;

const LeftContentContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
width:45%;

min-width: 360px;
`;

const EmotionsContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
width:100%;
height:30%;
`;
const EmotionsContainerCaption = styled.div`
width:95%;
font-family: "aggro";
font-weight: 700;
color:#777;
border-bottom: 2px solid #ccc;
font-size:20px;
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

const EmotionDetailPage = () => {
    const [searchKeyword, setSearchKeyword] = useState(new URL(window.location).searchParams.get('keyword'));
    const [loading, setLoading] = useState(true);
    const [isRender, setIsRender] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAbnormal, setIsAbnormal] = useState(false);
    const [keywordId, setKeywordId] = useState();
    const [comments, setComments] = useState([{},{},{},{},{},{},{}]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const data = [...comments];

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
        CheckKeyword();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const CheckKeyword = async () => {
        let response = await axios.get("http://"+process.env.REACT_APP_ADDRESS+"/keywords");
        if(await response.data.find(FindKeyword) === undefined || location.state === null) {
            if(location.state === null)
                setIsAbnormal(true);
            openModal();
        } else {
            setKeywordId(response.data.find(FindKeyword).id);
            for(let i in location.state.comments) {
                if(location.state.comments[i].emotion === "행복")
                    data[0] = location.state.comments[i];
                else if(location.state.comments[i].emotion === "놀람")
                    data[1] = location.state.comments[i];
                else if(location.state.comments[i].emotion === "중립")
                    data[2] = location.state.comments[i];
                else if(location.state.comments[i].emotion === "혐오")
                    data[3] = location.state.comments[i];
                else if(location.state.comments[i].emotion === "공포")
                    data[4] = location.state.comments[i];
                else if(location.state.comments[i].emotion === "슬픔")
                    data[5] = location.state.comments[i];
                else if(location.state.comments[i].emotion === "분노")
                    data[6] = location.state.comments[i];
            }
            setComments(data);
            console.log(data);
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
            <RepInfo keyword={searchKeyword}/>
            <BottomContainer>
                <PieChart/>
                <LeftContentContainer>
                    <EmotionsContainer>
                        <EmotionsContainerCaption>세부 감정 비율</EmotionsContainerCaption>
                        <RepEmotion keyword={searchKeyword} emotion="행복" color='rgba(255, 165, 0, 0.2)' comment={comments[0]}/>
                        <RepEmotion keyword={searchKeyword} emotion="놀람" color='rgba(153, 204, 255, 0.2)' comment={comments[1]}/>
                        <RepEmotion keyword={searchKeyword} emotion="중립" color='rgba(162, 162, 162, 0.2)' comment={comments[2]}/>
                        <RepEmotion keyword={searchKeyword} emotion="혐오" color='rgba(102, 153, 0, 0.2)' comment={comments[3]}/>
                        <RepEmotion keyword={searchKeyword} emotion="공포" color='rgba(102, 51, 51, 0.4)' comment={comments[4]}/>
                        <RepEmotion keyword={searchKeyword} emotion="슬픔" color='rgba(0, 51, 204, 0.2)' comment={comments[5]}/>
                        <RepEmotion keyword={searchKeyword} emotion="분노" color='rgba(255, 0, 51, 0.2)' comment={comments[6]}/>
                    </EmotionsContainer>
                </LeftContentContainer>
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

export default EmotionDetailPage;