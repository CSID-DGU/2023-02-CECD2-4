import React from 'react';
import Main from "../../../components/Main/Main";
import SubHeader from "./SubHeader";
import styled from 'styled-components';
import ContentContainer from './ContentContainer';



const AdminAddKeywordPage = () => {
    return (
        <Main>
            <SubHeader/>
            <ContentContainer/>
        </Main>
    );
};

SubHeader.defaultProps = {
    text : "키워드 추가"
};

export default AdminAddKeywordPage;