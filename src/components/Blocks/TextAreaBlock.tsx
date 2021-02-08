import React from "react"
import RichTextRenderer from "./RichTextRenderer"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 0 auto;
`

const TextAreaBlock = ({ content }) => {
  return (
    <Wrapper className="max-width">
      <RichTextRenderer content={content.description} />
    </Wrapper>
  )
}

export default TextAreaBlock
