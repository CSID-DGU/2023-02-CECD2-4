import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Main from '../../../components/Main/Main';
import KeywordSearchBox from './KeywordSearchBox';
import KeywordList from './KeywordList';
import { useDispatch } from 'react-redux';
import { enter } from '../../../redux/modules/toggleAdminHeader';
import { managePage } from '../../../redux/modules/toggleAddManage';
import Modal from '../../../components/Modal/Modal';

const ModalLine = styled.hr`
height:1px;
backgroun-color:#aaa;
border:0;
`;
const ModalDesc = styled.div`
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;
width:30vw;
height:15vh;
`;

const AdminManagePage = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keywordList, setKeywordList] = useState([]);
    const [searchKeywordIndex, setSearchKeywordIndex] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    const openModal = () => {setIsModalOpen(true);}
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(enter());
        dispatch(managePage());
    }, [dispatch]);

    useEffect(() => {
        fetchKeywordList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchKeywordList = async () => {
        let copy_keywordList = [...keywordList];

        const response = await axios.get("http://"+process.env.REACT_APP_ADDRESS+"/keywords");
        
        copy_keywordList = [...response.data];
        setKeywordList(copy_keywordList);
    }

    return (
        <Main>
            <KeywordSearchBox keywords={keywordList} setSearchKeywordIndex={setSearchKeywordIndex} setIsSearch={setIsSearch} openModal={openModal}/>
            <KeywordList keywords={keywordList} isSearch={isSearch} searchIndex={searchKeywordIndex}/>
            <Modal isOpen={isModalOpen} closeModal={closeModal} 
                title={"검색 실패"}>
                <ModalLine/>
                <ModalDesc>존재하지 않는 키워드입니다.</ModalDesc>
            </Modal>
        </Main>
    );
};

export default AdminManagePage;