import React from 'react'
import styled from 'styled-components/macro'

const Root = styled.div`
    max-width: 1280px;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
`


export default function Container({children, additionalStyles}) {
    return (
        <Root css={additionalStyles}>
            {children}
        </Root>
    )
}
