import "fontsource-roboto"

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import styled from "styled-components/macro"
import Img from "gatsby-image"

const Footer = styled.footer`
  width: 100%;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
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
          <div></div>
          {/* <Img fluid={data.footer.fluid}></Img> */}
        </Footer>
      </div>
    </>
  )
}

export default Layout
