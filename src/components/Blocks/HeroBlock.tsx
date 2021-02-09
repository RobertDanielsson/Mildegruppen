import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import Container from "../container"
import RichTextRenderer from "./RichTextRenderer"

const HeroImage = styled.div``

const HeroText = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`

const StyledImg = styled(Img)`
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("photographer.jpg");

  /* Set a specific height */
  height: 50%;

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`

const Parallax = styled.div`
  /* The image used */
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props.src});

  /* Set a specific height */
  height: 500px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    background-attachment: unset;
    height: 100vh;
    max-height: 100%;
  }

  @media (min-height: 1200px) {
    height: 700px;
  }

  width: 100%;

  ${props =>
    !props.parallax
      ? `
  background-attachment: unset;
  height: 100vh;
  max-height: 100%;
  `
      : ``}
`

const HeroTitle = styled.h1`
  color: white;
`

const Description = styled.div`
  color: #fff;
  margin: 0 auto;
`

const HeroBlock = ({ content }) => {
  return (
    <div>
      <Parallax parallax={content.parallax} src={content.image.fixed.src}>
        <Container additionalStyles={`text-align: center; color: #fff;`}>
          <HeroTitle>{content.title}</HeroTitle>
          <Description className="max-width">
            <RichTextRenderer content={content.description} />
          </Description>
        </Container>
      </Parallax>
    </div>
  )
}

export default HeroBlock
