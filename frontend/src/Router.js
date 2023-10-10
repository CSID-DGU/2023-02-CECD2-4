import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import IndexPage from "./pages/IndexPage/IndexPage";
import SearchResultPage from './pages/SearchResultPage/SearchResultPage';
import EmotionDetailPage from './pages/EmotionDetailPage/EmotionDetailPage';
import CommentDetailPage from './pages/CommentDetailPage/CommentDetailPage';
import AdminIndexPage from './pages/Admin/IndexPage/AdminIndexPage';

const Router = (props) => {
    return (
        <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<IndexPage/>}></Route>
                    <Route path="/search_result/*" element={<SearchResultPage/>}></Route>
                    <Route path="/emotion_detail/*" element={<EmotionDetailPage/>}></Route>
                    <Route path="/comment_detail/*" element={<CommentDetailPage/>}></Route>
                    <Route path="/admin/index/" element={<AdminIndexPage/>}></Route>
                </Routes>
            <Footer/>
        </BrowserRouter>
    );
};

export default Router;