import React from 'react';
import Main from "../../components/Main/Main";
import RepInfo from "../SearchResultPage/RepInfo";
import PieChart from './PieChart';
import LeftContentContainer from './LeftContentContainer';
import EmotionsContainer from './EmotionsContainer';
import RepEmotion from './RepEmotion';
import "./EmotionDetailPage.css";

const EmotionDetailPage = () => {
    return (
        <Main>
            <RepInfo/>
            <div className="bottom_container">
            <PieChart/>
                <LeftContentContainer>
                    <EmotionsContainer>
                        <RepEmotion emotion="감정1" color="red"/>
                        <RepEmotion emotion="감정2" color="blue"/>
                        <RepEmotion emotion="감정3" color="blue"/>
                        <RepEmotion emotion="감정4" color="blue"/>
                        <RepEmotion emotion="감정5" color="blue"/>
                        <RepEmotion emotion="감정6" color="blue"/>
                    </EmotionsContainer>
                </LeftContentContainer>
            </div>
        </Main>
    );
};

export default EmotionDetailPage;