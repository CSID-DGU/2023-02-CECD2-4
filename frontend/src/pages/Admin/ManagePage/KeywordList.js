import React from 'react';
import { useNavigate } from 'react-router-dom';
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
cursor: pointer;
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
    const navigate = useNavigate();

    const onClickItem = (e) => {
        if(props.isSearch)
            navigate("/admin/manage/update?keyword="+props.keywords[props.searchIndex].name, {state: props.keywords[props.searchIndex]});
        else {
            const index = e.target.parentNode.rowIndex;
            navigate("/admin/manage/update?keyword="+props.keywords[index].name, {state: props.keywords[index]});
        }
    }

    const ListingRow = () => {
        const result = [];
        for (let i in props.keywords) {
          result.push(<TR onClick={onClickItem} key={i}>{GenData(props.keywords[i], i)}</TR>);
        }
        return result;
    }
    
    const showSearch = (index) => {
        return <TR onClick={onClickItem} key={index}>{GenData(props.keywords[index], index)}</TR>
    }

    const GenData = (data, key) => {
        const result = [];
        result.push(<TD key={key}>{data.id}</TD>);
        result.push(<TD key={key+1}>{data.name}</TD>);
        result.push(<TD key={key+2}>{data.isActive ? "활성화" : "비활성화"}</TD>);
        result.push(<TD key={key+3}>{data.description}</TD>);
        result.push(<TD key={key+4}>{data.createdAt.substring(0,10)+" "+data.createdAt.substring(11,19)}</TD>);
        result.push(<TD key={key+5}>{data.updatedAt.substring(0,10)+" "+data.updatedAt.substring(11,19)}</TD>);
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
                    {props.isSearch ? showSearch(props.searchIndex) : ListingRow()}
                </tbody>
            </Table>
        </ListContainer>
    );
};

export default KeywordList;