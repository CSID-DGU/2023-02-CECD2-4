import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { leave } from '../../redux/modules/toggleAdminHeader';
import Main from "../../components/Main/Main";
import RepInfo from "./RepInfo";
import LineChart from './LineChart';
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
width:45%;
height:100%;
min-width: 360px;
`;

const CommentsContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
width:100%;
height:40%;
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
const TimeSettingContainer = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
font-family:"aggro";
font-weight:700;
font-size:30px;
width:100%;
height:30%;
color:#777;
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
const CDatePicker = styled(DatePicker)`
width:180px;
height:35px;
font-family:"aggro";
text-align:center;
color:#555;
box-sizing:border-box;
padding:4px;
border-radius:4px;
border:1px solid #555;
font-size: 12px;
`;
const LoadBtn = styled.div`
display:flex;
justify-content:center;
align-center:center;
font-family:"aggro";
font-weight:500;
font-size:14px;
padding:9px;
border-radius:4px;
color:#2f2f2f;
background-color:#bbb;
transition:all 0.2s ease-in-out;
&:hover {
    color: #4f4f4f;
    background-color: #ddd;
    transition:all 0.2s ease-in-out;
}
`;

const SearchResultPage = () => {
    const [searchKeyword, setSearchKeyword] = useState(new URL(window.location).searchParams.get('keyword'));
    const [loading, setLoading] = useState(true);
    const [isRender, setIsRender] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date(2023, 8, 27));
    const [endDate, setEndDate] = useState(new Date());
    const [keywordId, setKeywordId] = useState();
    const [passData, setPassData] = useState([]);
    const [commentDs, setCommentDs] = useState([{},{},{}]);
    const [chartLabel, setChartLabel] = useState([]);
    const [chartDs, setChartDs] = useState([
        {
            label: '긍정',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '중립',
            data: [],
            borderColor: 'rgb(162, 162, 162)',
            backgroundColor: 'rgba(162, 162, 162, 0.5)',
        },
        {
            label: '부정',
            data: [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
    ]);
    let lbs = [...chartLabel];
    let ds = [...chartDs];

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const CheckKeyword = async () => {
        let response = await axios.get("http://"+process.env.REACT_APP_ADDRESS+"/keywords");
        if(await response.data.find(FindKeyword) === undefined) {
            openModal();
        } else {
            setKeywordId(response.data.find(FindKeyword).id);
            LoadKeywordInfo(response.data.find(FindKeyword).id);
            setIsRender(true);
        }
    };

    const FindKeyword = item => { return item.name === searchKeyword}

    const onLoadBtnClick = (e) => {
        setChartLabel([]);
        setChartDs([
            {
                label: '긍정',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '중립',
                data: [],
                borderColor: 'rgb(162, 162, 162)',
                backgroundColor: 'rgba(162, 162, 162, 0.5)',
            },
            {
                label: '부정',
                data: [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]);
        lbs = [...chartLabel];
        ds = [...chartDs];
        LoadKeywordInfo();
    }
    const LoadKeywordInfo = async (id = keywordId) => {
        const offset = 1000 * 60 * 60 * 9;
        const koreaStart = new Date(startDate.getTime() + offset).toISOString().substring(0,10);
        const koreaEnd = new Date(endDate.getTime() + offset).toISOString().substring(0,10); 

        let response = await axios.get("http://"+process.env.REACT_APP_ADDRESS+
        "/daily-keyword-big-emotions-cnt?keyword_id="+id+
        "&from="+koreaStart+
        "&to="+koreaEnd);

        for(let i in response.data) {
            ds[2].data[i] = response.data[i].negative_cnt;
            ds[1].data[i] = response.data[i].neutral_cnt;
            ds[0].data[i] = response.data[i].positive_cnt;
            lbs[i] = response.data[i].date.substring(0,10);
        }
        setChartLabel(lbs);
        setChartDs(ds);

        response = await axios.get("http://"+process.env.REACT_APP_ADDRESS+
        "/search/keyword-search-result?name="+searchKeyword+
        "&from="+koreaStart+
        "&to="+koreaEnd);

        console.log(response.data);
        setPassData(response.data.comments);

        let copy_commentDs = [...commentDs];
        
        for(let i in response.data.comments) {
            if(response.data.comments[i].big_emotion === "긍정") {
                if(Object.keys(copy_commentDs[0]).length === 0) {
                    copy_commentDs[0] = { data: response.data.comments[i].content, likes: response.data.comments[i].sympathy };
                } else {
                    if(copy_commentDs[0].likes < response.data.comments[i].sympathy)
                        copy_commentDs[0] = { data: response.data.comments[i].content, likes: response.data.comments[i].sympathy };
                }
            } else if(response.data.comments[i].big_emotion === "중립") {
                if(Object.keys(copy_commentDs[1]).length === 0) {
                    copy_commentDs[1] = { data: response.data.comments[i].content, likes: response.data.comments[i].sympathy };
                } else {
                    if(copy_commentDs[1].likes < response.data.comments[i].sympathy)
                        copy_commentDs[1] = { data: response.data.comments[i].content, likes: response.data.comments[i].sympathy };
                }
            } else if(response.data.comments[i].big_emotion === "부정") {
                if(Object.keys(copy_commentDs[2]).length === 0) {
                    copy_commentDs[2] = { data: response.data.comments[i].content, likes: response.data.comments[i].sympathy };
                } else {
                    if(copy_commentDs[2].likes < response.data.comments[i].sympathy)
                        copy_commentDs[2] = { data: response.data.comments[i].content, likes: response.data.comments[i].sympathy };
                }
            }
        }
        setCommentDs(copy_commentDs);
    }

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
                <LineChart chart_data={{labels:lbs, datasets: ds}} />
                <LeftContentContainer>
                    <TimeSettingContainer>
                        기간설정:
                        <CDatePicker
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date(2023, 8, 27)}/>-
                        <CDatePicker
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}/>
                        <LoadBtn onClick={onLoadBtnClick}>조회</LoadBtn>
                    </TimeSettingContainer>
                    <CommentsContainer>
                        <CommentsContainerCaption>
                            대표 댓글
                            <Link2Detail to={"/emotion_detail?keyword="+searchKeyword} state={{comments : passData}}>
                                {'>'} 자세히 보기
                            </Link2Detail>
                        </CommentsContainerCaption>
                        <RepComment emotion="긍정" color="red" comment={commentDs[0].data} likes={commentDs[0].likes}/>
                        <RepComment emotion="중립" color="#a2a2a2" comment={commentDs[1].data} likes={commentDs[1].likes}/>
                        <RepComment emotion="부정" color="blue" comment={commentDs[2].data} likes={commentDs[2].likes}/>
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