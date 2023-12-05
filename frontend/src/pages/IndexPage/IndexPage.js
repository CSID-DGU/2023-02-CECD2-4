import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Main from "../../components/Main/Main";
import SearchBox from "./SearchBox";
import IssueKeywords from './IssueKeywords';
import { useDispatch } from 'react-redux';
import { leave } from '../../redux/modules/toggleAdminHeader';

const IndexPage = () => {
    const dispatch = useDispatch();

    const [popularKeywords, setPopularKeywords] = useState([]);
    useEffect(()=>{
        fetchIssueKeyword();
    }, []);

    useEffect(() => {
        dispatch(leave())
    }, [dispatch]);

    const fetchIssueKeyword = async () => {
        const response = await axios.get("http://" + process.env.REACT_APP_ADDRESS + "/search/popular-keywords?count=3");
        setPopularKeywords(response.data);
    };

    return (
        <Main>
            <SearchBox/>
            <IssueKeywords keywords={popularKeywords}/>
        </Main>
    );
};

export default IndexPage;