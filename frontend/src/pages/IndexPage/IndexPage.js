import React, {useEffect} from 'react';
import Main from "../../components/Main/Main";
import SearchBox from "./SearchBox";
import IssueKeywords from './IssueKeywords';
import { useDispatch } from 'react-redux';
import { leave } from '../../redux/modules/toggleAdminHeader';

const IndexPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(leave())
    }, [dispatch]);

    return (
        <Main>
            <SearchBox/>
            <IssueKeywords/>
        </Main>
    );
};

export default IndexPage;