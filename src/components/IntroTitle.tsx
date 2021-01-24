import React from "react"
import styled from "styled-components/macro"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: #808080;
    margin: 0;
  }
`

const ServicesIntroTitle = styled.h2`
  font-family: "Playfair Display", serif;
  text-align: center;
  font-weight: 900;
  font-size: 3rem;
  margin-bottom: 20px;
`

export default function IntroTitle({ title, description }) {
  return (
    <Wrapper>
      <ServicesIntroTitle>{title}</ServicesIntroTitle>
      {description}
    </Wrapper>
  )
}
