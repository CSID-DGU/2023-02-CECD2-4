import React from 'react';
import Main from "../../components/Main/Main";
import RepInfo from "./RepInfo";
import CommentsDetailContainer from './CommentsDetailContainer';
import RepDetailComment from './RepDetailComment';
import RepLikes from "./RepLikes";
import "./CommentDetailPage.css";
import RepRelated from './RepRelated';

const CommentDetailPage = () => {
    return (
        <Main>
            <RepInfo/>
            <CommentsDetailContainer>
                <RepDetailComment/>
                <RepLikes/>
            </CommentsDetailContainer>
            <div className="bottom_container">
            <RepRelated/>
            </div>
        </Main>
    );
};

export default CommentDetailPage;