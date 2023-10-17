import React, {useEffect} from 'react';
import Main from '../../../components/Main/Main';
import KeywordSearchBox from './KeywordSearchBox';
import KeywordList from './KeywordList';
import { useDispatch } from 'react-redux';
import { enter } from '../../../redux/modules/toggleAdminHeader';

const AdminManagePage = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(enter())
    }, [dispatch]);
    return (
        <Main>
            <KeywordSearchBox/>
            <KeywordList/>
        </Main>
    );
};

export default AdminManagePage;