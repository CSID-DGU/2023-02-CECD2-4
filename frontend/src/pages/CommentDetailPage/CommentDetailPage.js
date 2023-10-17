import React, {useEffect} from 'react';
import Main from "../../components/Main/Main";
import RepInfo from "./RepInfo";
import RepDetailComment from './RepDetailComment';
import RepLikes from "./RepLikes";
import RepRelated from './RepRelated';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { leave } from '../../redux/modules/toggleAdminHeader';

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

const CommentDetailPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(leave())
    }, [dispatch]);
    return (
        <Main>
            <RepInfo/>
            <CommentsDetailContainer>
                <RepDetailComment/>
                <RepLikes/>
            </CommentsDetailContainer>
            <BottomContainer>
                <RepRelated/>
            </BottomContainer>
        </Main>
    );
};

export default CommentDetailPage;