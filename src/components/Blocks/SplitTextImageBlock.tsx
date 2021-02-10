import React from "react"
import styled, { css } from "styled-components/macro"
import RichTextRenderer from "./RichTextRenderer"
import Container from "../container"
import Img from "gatsby-image"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`

const LeftBlock = styled.div`
  ${props => (props.left ? "order: 2;" : "order: 1;")}

  @media (max-width: 900px) {
    order: 1;
  }
`

const RightBlock = styled.div`
  color: #fff;
  align-self: center;
  ${props => (props.left ? "order: 1;" : "order: 2;")}

  @media (max-width: 900px) {
    order: 2;
  }
`

const SplitTextImageBlock = ({ content }) => {
  return (
    <Container
      additionalStyles={`
        @media (max-width: 900px) {
          padding: 0;
        }
      `}
    >
      <Wrapper>
        <LeftBlock left={content.imageLeftSide}>
          <Container
            additionalStyles={`
        @media (min-width: 900px) {
          padding-left: 24px; padding-right: 24px;
        }
      `}
          >
            <RichTextRenderer content={content.description} />
          </Container>
        </LeftBlock>
        <RightBlock left={content.imageLeftSide}>
          <Img alt="" fluid={content.image.fluid} />
        </RightBlock>
      </Wrapper>
    </Container>
  )
}

export default SplitTextImageBlock
