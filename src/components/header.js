import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect, useRef } from "react"
import Img from "gatsby-image"
import Container from "./container"
import styled, { css } from "styled-components/macro"
import { globalHistory } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const StyledHeader = styled.header`
  position: sticky;
  z-index: 500;
  left: 0;
  right: 0;
  top: 0;
  margin: 0 auto;

  ${props =>
    props.path !== "/"
      ? "background-color: rgba(0, 0, 0, 1); box-shadow: 0 4px 2px 0 black;"
      : ""}

  ${props => (!props.path ? "background-color: rgba(0, 0, 0, 1);" : "")}
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
  margin-right: 0.5rem;
`

const containerStyles = css`
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: 12px;

  a {
    text-decoration: none;
  }
`

const DesktopNav = styled.nav`
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

    a:not(.active)::after {
      content: "";
      display: block;
      margin: auto;
      height: 2px;
      width: 0px;
      background: white;
      transition: width 0.3s ease, background-color 0.5s ease;
    }

    a:not(.active):hover::after {
      width: 100%;
      background: #6ec1e4;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }
`

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  .nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 3rem;
    font-weight: 700;
  }

  // .nav-item + .nav-item {
  //   margin-top: 1em;
  // }

  .nav-link:hover,
  .nav-link:focus {
    color: #6ec1e4;
  }
`

const MobileNav = styled.nav`
  position: fixed;
  background: #000;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 100%;
  transform: translateX(0);
  transition: transform 250ms;

  .close-nav {
    border: 0;
    background: 0;
    color: #6ec1e4;
    font-weight: 700;
    font-size: 3rem;
    cursor: pointer;
    padding: 0.5em;
    position: absolute;
  }

  @media (min-width: 900px) {
    display: none;
  }
`

const OpenMobileNavBtn = styled.button`
  border: 0;
  background: 0;
  color: #fff;
  cursor: pointer;
  margin-left: auto;
  font-size: 1.5em;
  align-self: flex-end;

  @media (min-width: 900px) {
    display: none;
  }
`

const Header = () => {
  const [open, setOpen] = useState(false)
  const path = globalHistory.location.pathname
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      contentfulAsset(title: { eq: "logo" }) {
        title
        fluid(quality: 100, maxWidth: 50) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      title: contentfulAsset(title: { eq: "milde-title" }) {
        title
        fluid(quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  `)

  console.log("path", path)

  const handleMenu = () => {
    setOpen(!open)
  }

  return (
    <StyledHeader path={path}>
      <Container additionalStyles={containerStyles}>
        <Link to="/">
          <LogoWrapper>
            <Figure>
              <Img
                placeholderStyle={{ visibility: "hidden" }}
                css={imgStyles}
                fluid={data.contentfulAsset.fluid}
              ></Img>
            </Figure>
            <Img
              placeholderStyle={{ visibility: "hidden" }}
              css={`
                width: 125px;
                margin-bottom: 3px;
              `}
              fluid={data.title.fluid}
            ></Img>
          </LogoWrapper>
        </Link>
        <DesktopNav>
          <ul>
            <li>
              <Link activeClassName="active" to="/">
                <p>Start</p>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/contact">
                <p>Kontakt</p>
              </Link>
            </li>
          </ul>
        </DesktopNav>
        <OpenMobileNavBtn
          aria-label="Open navigation"
          className="open-nav"
          onClick={handleMenu}
        >
          &#9776;
        </OpenMobileNavBtn>
        <MobileNav className={`nav ${open ? "navigation-open" : ""}`}>
          <button
            aria-label="Close navigation"
            className="close-nav"
            onClick={handleMenu}
          >
            &times;
          </button>
          <NavList className="nav-list">
            <li className="nav-item">
              <Link activeClassName="active" to="/" className="nav-link">
                Start
              </Link>
            </li>
            <li className="nav-item">
              <Link activeClassName="active" to="/contact" className="nav-link">
                Kontakt
              </Link>
            </li>
          </NavList>
        </MobileNav>
      </Container>
    </StyledHeader>
  )
}

export default Header

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener("mousedown", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
    }
  }, [ref, handler])
}
