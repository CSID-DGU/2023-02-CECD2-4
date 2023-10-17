import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
width: 80%;
height: 70%;
overflow:auto;
`;
const Table = styled.table`
width:100%;
border-collapse: separate;
border-spacing: 0;
`;
const TH = styled.th`
position:sticky;
top:0;
padding: 6px 15px;
background: #42444e;
color: #fff;
text-align: left;
`;
const TD = styled.td`
padding: 6px 15px;
border-right: 1px solid #c6c9cc;
border-bottom: 1px solid #c6c9cc;
&:first-child {
    border-left: 1px solid #c6c9cc;
}
`;
const TR = styled.tr`
&:nth-child(even) {
    background: #eaeaed;
}
&:hover {
    background-color: rgba(0,0,0,0.3);
}
`;

const KeywordList = (props) => {
    const ListingRow = () => {
        const result = [];
        for (let i = 0; i < 20; i++) {
          result.push(<TR>{GenData(i)}</TR>);
        }
        return result;
    }
    const GenData = (n) => {
        const result = [];
        for (let i = 0; i < 6; i++) {
          result.push(<TD>{n}번째열의 데이터{i+1}</TD>);
        }
        return result;
    };
    return (
        <ListContainer>
            <Table>
                <thead>
                    <TH>ID</TH>
                    <TH>KEYWORD</TH>
                    <TH>STATUS</TH>
                    <TH>INFORMATION</TH>
                    <TH>REGISTER DATE</TH>
                    <TH>UPDATE DATE</TH>
                </thead>
                <tbody>
                    {ListingRow()}
                </tbody>
            </Table>
        </ListContainer>
    );
};

export default KeywordList;