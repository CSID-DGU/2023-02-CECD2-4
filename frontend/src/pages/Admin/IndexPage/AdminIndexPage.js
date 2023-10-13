import React from 'react';
import Main from '../../../components/Main/Main';
import AddKeyword from './AddKeyword';
import ManageKeyword from './ManageKeyword';
import styled from 'styled-components';

const ManagementContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width:70%;
height:60%;
`;

const AdminIndexPage = (props) => {
    return (
        <Main justify="center">
            <ManagementContainer>
                <AddKeyword/>
                <ManageKeyword/>
            </ManagementContainer>
        </Main>
    );
};

export default AdminIndexPage;