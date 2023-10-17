import React, {useEffect} from 'react';
import Main from "../../components/Main/Main";
import RepInfo from "../SearchResultPage/RepInfo";
import PieChart from './PieChart';
import RepEmotion from './RepEmotion';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { leave } from '../../redux/modules/toggleAdminHeader';

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
height:80%;
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

const EmotionDetailPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(leave())
    }, [dispatch]);
    return (
        <Main>
            <RepInfo/>
            <BottomContainer>
                <PieChart/>
                <LeftContentContainer>
                    <EmotionsContainer>
                        <EmotionsContainerCaption>감정 비율</EmotionsContainerCaption>
                        <RepEmotion emotion="감정1" color="red"/>
                        <RepEmotion emotion="감정2" color="blue"/>
                        <RepEmotion emotion="감정3" color="blue"/>
                        <RepEmotion emotion="감정4" color="blue"/>
                        <RepEmotion emotion="감정5" color="blue"/>
                        <RepEmotion emotion="감정6" color="blue"/>
                    </EmotionsContainer>
                </LeftContentContainer>
            </BottomContainer>
        </Main>
    );
};

export default EmotionDetailPage;