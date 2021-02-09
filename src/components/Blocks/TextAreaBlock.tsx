import React from "react"
import RichTextRenderer from "./RichTextRenderer"
import styled from "styled-components"
import Container from "../container"

const Wrapper = styled.div`
  margin: 0 auto;
  ${props => (props.centered ? "text-align: center;" : "")}
`

const TextAreaBlock = ({ content }) => {
  return (
    <Container>
      <Wrapper centered={content.centeredText} className="max-width">
        <RichTextRenderer content={content.description} />
      </Wrapper>
    </Container>
  )
}

export default TextAreaBlock
