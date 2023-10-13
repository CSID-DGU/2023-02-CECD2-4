import React from 'react';
import Main from '../../../components/Main/Main';
import styled from 'styled-components';
import KeywordSearchBox from './KeywordSearchBox';
import KeywordList from './KeywordList';
const AdminManagePage = (props) => {
    return (
        <Main>
            <KeywordSearchBox/>
            <KeywordList/>
        </Main>
    );
};

export default AdminManagePage;