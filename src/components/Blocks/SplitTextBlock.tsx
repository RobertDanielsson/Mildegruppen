import React from "react"
import styled, { css } from "styled-components/macro"
import RichTextRenderer from "./RichTextRenderer"
import Container from "../container"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const LeftBlock = styled.div`
  padding: 120px;
  box-shadow: 0 12px 44px 0 rgb(37 25 149 / 22%);

  @media (max-width: 900px) {
    padding: 20px;
  }
`

const RightBlock = styled.div`
  margin: 40px 0;
  background: #404040;
  color: #fff;
  padding: 60px;

  @media (max-width: 900px) {
    padding: 20px;
    margin: 0;
  }
`

const SplitTextBlock = ({ content }) => {
  return (
    <Container additionalStyles={`@media (max-width: 900px){padding: 0;}`}>
      <Wrapper>
        <LeftBlock>
          <RichTextRenderer content={content.leftDescription} />
        </LeftBlock>
        <RightBlock>
          <RichTextRenderer content={content.rightDescription} />
        </RightBlock>
      </Wrapper>
    </Container>
  )
}

export default SplitTextBlock
