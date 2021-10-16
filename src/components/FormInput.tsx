import React from "react";
import { Input, InputProps } from "antd";
import styled from "styled-components";

interface FormInputProps extends InputProps{
    label: string,
}

export const FormInput:React.FC<FormInputProps>=({label, ...props})=>{
    return <StyledFormInput>
        <StyledLabel>
            {label}
        </StyledLabel>
        <Input />
    </StyledFormInput>
}

const StyledFormInput=styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const StyledLabel=styled.div`
    color: #777;
`