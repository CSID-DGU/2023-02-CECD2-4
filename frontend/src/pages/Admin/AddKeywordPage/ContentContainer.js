import React from 'react';
import styled from 'styled-components';

const FormBox = styled.div`
display: flex;
flex-direction: column;
font-size:20px;
width:50%;
height:65%;
border: 2px solid #aaa;
border-radius: 3px;
align-items: center;
justify-content:space-evenly;
`;

const iContainer = styled.div`
display: flex;
justify-content: flex-start;
width:90%;
`;
const KeywordContainer = styled(iContainer)`
align-items: center;
height: 25%;
`;
const DescContainer = styled(iContainer)`
height: 55%;
`;

const Label = styled.div`
width:25%;
color:#aaa;
font-family: "aggro";
font-size:20px;
pointer-events: none;
`;

const Input = styled.input`
width:70%;
height:25px;
font-family:"aggro";
font-size:15px;
font-color:#555;
`;

const DescTextArea = styled.textarea`
width:70%;
height:12.5em;
font-family:"aggro";
font-size:15px;
font-color:#555;
resize:none;
border: 2px solid #aaa;
border-radius: 2px;
`;

const ContentContainer = (props) => {
    return (
        <FormBox>
            <KeywordContainer>
                <Label>키워드</Label>
                <Input type="text" placeholder=" "></Input>
            </KeywordContainer>
            <DescContainer>
                <Label>키워드 설명 </Label>
                <DescTextArea/>
            </DescContainer>
        </FormBox>
    );
};

export default ContentContainer;