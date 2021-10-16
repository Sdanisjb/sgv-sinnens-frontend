import React from "react";
import styled from "styled-components";


export const Paper:React.FC=({children})=>{
    return <StyledPaper>
        {children}
    </StyledPaper>
}

const StyledPaper=styled.div`
    padding: 40px 160px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    background-color: #FFF;
`