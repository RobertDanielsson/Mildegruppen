import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import options from "./richtextRenderOptions"
import styled, { css } from "styled-components/macro"
import RichTextRenderer from "./RichTextRenderer"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const LeftBlock = styled.div`
  padding: 120px;
  box-shadow: 0 12px 44px 0 rgb(37 25 149 / 22%);
`

const RightBlock = styled.div`
  margin: 40px 0;
  background: #404040;
  color: #fff !important;
  padding: 60px;

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    color: #fff;
  }
`

const SplitBlockText = ({ content }) => {
  return (
    <Wrapper>
      <LeftBlock>
        <RichTextRenderer content={content.leftDescription} />
      </LeftBlock>
      <RightBlock>
        <RichTextRenderer content={content.rightDescription} />
      </RightBlock>
    </Wrapper>
  )
}

export default SplitBlockText
