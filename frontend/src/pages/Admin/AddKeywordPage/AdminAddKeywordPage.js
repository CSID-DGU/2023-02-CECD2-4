import React, {useEffect} from 'react';
import Main from "../../../components/Main/Main";
import SubHeader from "./SubHeader";
import ContentContainer from './ContentContainer';
import { useDispatch } from 'react-redux';
import { enter } from '../../../redux/modules/toggleAdminHeader';


const AdminAddKeywordPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(enter())
    }, [dispatch]);
    return (
        <Main>
            <SubHeader/>
            <ContentContainer/>
        </Main>
    );
};

export default AdminAddKeywordPage;