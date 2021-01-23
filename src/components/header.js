import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import Container from "./container"
import styled, { css } from "styled-components/macro"

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: "0 auto";
  padding: 24px 0px 16px;

  a {
    text-decoration: none;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;

  &:hover {
    opacity: 0.7;
  }
`

const imgStyles = css`
  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(114deg)
    brightness(107%) contrast(100%);
  width: 50px;
  margin-bottom: 4px;
`

const Figure = styled.figure`
  margin: 0;
  margin-right: 1rem;
`

const containerStyles = css`
  position: fixed;
  z-index: 500;
  left: 0;
  right: 0;
  margin: 0 auto;
`

const LogoTitle = styled.p`
  font-size: 1rem;
  letter-spacing: 1px;
  margin-bottom: 0;
  color: white;
`

const Nav = styled.nav`
  display: flex;
  z-index: 2;

  ul {
    display: flex;
    align-items: flex-end;
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      margin-left: 8px;
      margin-right: 8px;
    }

    p {
      color: white;
      margin: 0;

      :hover {
        opacity: 0.7;
      }
    }

    p::after {
      content: "";
      display: block;
      margin: auto;
      height: 2px;
      width: 0px;
      background: white;
      transition: width 0.3s ease, background-color 0.5s ease;
    }

    p:hover::after {
      width: 100%;
      background: #6ec1e4;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }
`

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      contentfulAsset(title: { eq: "logo" }) {
        title
        fluid(quality: 100, maxWidth: 50) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  `)

  return (
    <Container additionalStyles={containerStyles}>
      <StyledHeader>
        <Link to="/">
          <LogoWrapper>
            <Figure>
              <Img css={imgStyles} fluid={data.contentfulAsset.fluid}></Img>
            </Figure>
            <LogoTitle>Mildegruppen</LogoTitle>
          </LogoWrapper>
        </Link>
        <Nav>
          <ul>
            <li>
              <Link to="/">
                <p>Item 1</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p>Item 2</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p>Item 3</p>
              </Link>
            </li>
          </ul>
        </Nav>
      </StyledHeader>
    </Container>
  )
}

export default Header
