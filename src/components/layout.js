import "fontsource-roboto"

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import styled from "styled-components/macro"
import Img from "gatsby-image"

const Footer = styled.footer`
  background: #000;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 1rem;
  // grid-template-areas: "left middle right";

  // justify-content: center;
  // align-items: flex-end;
  color: white;

  .copyright {
    // grid-area: right;
    align-self: end;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    justify-items: center;
    // grid-template-areas: "middle";

    // .copyright {
    //   grid-area: middle;
    // }
  }
`

const StyledImg = styled(Img)`
  // grid-area: middle;
  width: 20rem;
  justify-self: center;
  grid-column-start: 2;

  @media (max-width: 900px) {
    width: 15rem;
    grid-column-start: 1;
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
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

  //  footer: contentfulAsset(title: { eq: "footer" }) {
  //       fluid(quality: 100) {
  //         ...GatsbyContentfulFluid_withWebp
  //       }
  //     }

  console.log(data)

  return (
    <>
      <Header />
      <div>
        <main>{children}</main>
        <Footer>
          <StyledImg fluid={data.title.fluid} alt="" />
          <p className="white-color no-margin copyright">
            ©{new Date().getFullYear()}
          </p>
          {/* <Img fluid={data.footer.fluid}></Img> */}
        </Footer>
      </div>
    </>
  )
}

export default Layout
