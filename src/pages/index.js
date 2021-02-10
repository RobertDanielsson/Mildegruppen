import React, { useState, useEffect, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Image from "../images/milde/pipes.jpg"
import SEO from "../components/seo"
import backgroundVideo from "../images/background720.mp4"
import styled, { css, keyframes } from "styled-components/macro"
import Container from "../components/container"
import "animate.css"
import size from "../components/utils/breakpoints"
import Img from "gatsby-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"
import IntroTitle from "../components/IntroTitle"
import ContentArea from "../components/ContentArea"
import RichTextRenderer from "../components/Blocks/RichTextRenderer"

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
    [MARKS.PARAGRAPH]: text => <p>{text}</p>,
    [MARKS.HYPERLINK]: text => <p>första</p>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p>{children}</p>
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      const {
        fixed: { src },
        title,
      } = node.data.target

      return <img src={src} alt={title} />
    },
    [INLINES.HYPERLINK]: node => {
      if (node.data.uri.includes("iframe")) {
        return <div dangerouslySetInnerHTML={{ __html: node.data.uri }} />
      }
      if (node.data.uri.indexOf("youtube.com") !== -1) {
        return (
          <div>
            <iframe
              width="560"
              height="315"
              src={node.data.uri.replace("watch?v=", "embed/")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )
      } else
        return (
          <a
            href={node.data.uri}
            target={`${
              node.data.uri.startsWith("website_url") ? "_self" : "_blank"
            }`}
            rel={`${
              node.data.uri.startsWith("website_url")
                ? ""
                : "noopener noreferrer"
            }`}
          >
            {node.content[0].value}
          </a>
        )
    },
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.__typename === "ContentfulKnapplank") {
        return (
          <a className="button btn-accent" href={node.data.target.url}>
            {node.data.target.title}
          </a>
        )
      }
    },
  },
}

const heroDescriptionOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="white-text">{children}</p>
    },
    [INLINES.HYPERLINK]: node => {
      return <Link to={node.data.uri}>{node.data.uri}</Link>
    },
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.__typename === "ContentfulKnapplank") {
        if (node.data.target.button) {
          return (
            <Link className="button btn-accent" to={node.data.target.url}>
              {node.data.target.title}
            </Link>
          )
        }
        return <Link to={node.data.target.url}>{node.data.target.title}</Link>
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.__typename === "ContentfulKnapplank") {
        if (node.data.target.button) {
          return (
            <Link className="button btn-accent" to={node.data.target.url}>
              {node.data.target.title}
            </Link>
          )
        }
        return <Link to={node.data.target.url}>{node.data.target.title}</Link>
      }
    },
  },
}

const Hero = styled.div`
  z-index: -1;
  background-color: #404040;
  position: absolute;
  box-shadow: 0 2px 5px 0px black;
  object-fit: cover;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1000;
  overflow: hidden;
`

const BlurVideo = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* margin: auto; */
  height: 100vh;
  width: 100%;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: -1;
`

const Header = styled.header`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: white;
  flex-direction: column;
  margin-top: -3rem;
  text-align: center;
`

const StyledIntroImg = styled(Img)`
  margin-bottom: 2rem;
  max-width: 500px;
  width: 90%;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  > * {
    grid-row-start: 1;
    grid-column-start: 1;
  }
`

const HeroTitle = styled.p`
  display: flex;
  font-size: 2rem;
  font-weight: 700;
  color: white;

  @media (max-width: 900px) {
    flex-direction: column;
    margin-left: 0;
    text-align: center;
    font-size: 1.75rem;
  }
`

const AnimatedSpanWrapper = styled.span`
  width: 301px;
  margin-left: 0.75rem;
`
const ServicesIntroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .servicesIntro {
    color: #808080;
    margin: 0;
  }
`

const Services = styled.div`
  .section-padding {
    padding: 100px 0;
  }

  @media (max-width: 900px) {
    .section-padding {
      padding: 50px 0;
    }
  }
`

const ServicesIntroTitle = styled.h2`
  font-family: "Playfair Display", serif;
  text-align: center;
  font-weight: 900;
  font-size: 3rem;
  margin-bottom: 20px;
`

const ServicesIntroList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 0;

    li {
      margin-left: 10px;
    }
  }
`

const ServiceIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 50px;
  color: #808080;

  h2 {
    font-weight: 300;
    text-transform: uppercase;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-position: inside;
  }

  & + & {
    border-left: 1px solid #d3d3d3;
  }
`

const ServiceListItem = styled.span`
  position: relative;
  left: -10px;
`

const ServiceFigure = styled.figure`
  max-height: 400px;
  overflow: hidden;
`

const ServiceTitle = styled.h3`
  margin-top: -4px;
  font-size: 2rem;
  font-weight: 300;
  display: inline-block;
`

const serviceContainerStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  grid-template-areas: "left right";

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
    grid-template-areas: unset;

    .serviceDescription {
      order: 1;
      grid-area: unset;
    }

    .serviceFigure {
      order: 2;
      grid-area: unset;
    }
  }
`

const IndexPage = ({ data }) => {
  const heroTitle = useRef(null)
  const servicesIntro = useRef(null)
  const blurRef = useRef(null)
  const videoRef = useRef(null)

  const isInViewport = element => {
    const rect = element.getBoundingClientRect()
    return rect.top <= 300
  }

  return (
    <Layout>
      <GridContainer>
        <Hero>
          <Img
            style={{ position: "unset" }}
            fluid={data.startPage.heroImg.fluid}
          ></Img>
        </Hero>
        <BlurVideo ref={blurRef}></BlurVideo>
        <Header className="animate__animated animate__fadeIn">
          <StyledIntroImg
            placeholderStyle={{ visibility: "hidden" }}
            fluid={data.startPage.heroTitleImg.fluid}
          ></StyledIntroImg>
          <HeroTitle>{data.startPage.heroIntro}</HeroTitle>
          <Container>
            <div className="max-width align-center">
              <RichTextRenderer content={data.startPage.heroDescription} />
            </div>
          </Container>
        </Header>
      </GridContainer>

      <div
        css={`
          padding: 120px 0;
          > * + * {
            margin-top: 100px !important;
          }
        `}
      >
        <ContentArea contentTypes={data.startBlocks.blocks}></ContentArea>
      </div>
      {/* <Services>
        <ServicesIntroSection
          ref={servicesIntro}
          className="section-padding animate__animated"
        >
          <IntroTitle
            title="Våra tjänster"
            description={
              <>
                <p>Vi håller en hög standard.</p>
                <p>Detta erbjuder vi er:</p>
              </>
            }
          ></IntroTitle>
          <ServicesIntroList>
            {data.services.nodes.map((service, i) => (
              <ServiceIntro key={service.title}>
                <ScrollLink
                  spy={true}
                  offset={-150}
                  smooth={true}
                  duration={500}
                  to={`${service.title}`}
                >
                  <h2 className="bbb">{service.title}</h2>
                </ScrollLink>
                <ul>
                  {service.serviceList.map((listItem, i) => (
                    <li key={listItem}>
                      <ServiceListItem>{listItem}</ServiceListItem>
                    </li>
                  ))}
                </ul>
              </ServiceIntro>
            ))}
          </ServicesIntroList>
        </ServicesIntroSection>

        {data.services.nodes.map((service, i) => (
          <section
            key={service.title}
            className={`${i % 2 == 0 ? "dark-section" : null} section-padding`}
          >
            <Container additionalStyles={serviceContainerStyles}>
              <ServiceFigure
                className="serviceFigure"
                css={`
                  ${i % 2 == 0 ? "grid-area: left;" : "grid-area: right;"}
                `}
              >
                <Img fluid={service.image.fluid} alt=""></Img>
              </ServiceFigure>
              <div
                className={`${
                  i % 2 == 0 ? "dark" : "light"
                } serviceDescription`}
                css={`
                  ${i % 2 == 0 ? "grid-area: right;" : "grid-area: left;"}
                `}
              >
                <ServiceTitle className="bbb" id={service.title}>
                  {service.title}
                </ServiceTitle>
                <div>
                  {service.description &&
                    renderRichText(service.description, options)}
                </div>
              </div>
            </Container>
          </section>
        ))}
      </Services> */}
    </Layout>
  )
}

export default IndexPage

// <Layout>
//   <SEO title="Home" />
//   <h1>Hi people</h1>
//   <p>Welcome to your new Gatsby site.</p>
//   <p>Now go build something great.</p>
//   <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//     <Image />
//   </div>
//   <Link to="/page-2/">Go to page 2</Link> <br />
//   <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
// </Layout>

export const query = graphql`
  query indexQuery {
    startPage: contentfulStartsida {
      heroImg {
        fluid(quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      heroTitleImg {
        fluid(quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      heroIntro
      heroDescription {
        raw
        references {
          ... on ContentfulKnapplank {
            contentful_id
            __typename
            url
            title
          }
        }
      }
    }

    startBlocks: contentfulStandardsida(slug: { eq: "testsida" }) {
      title
      blocks {
        __typename
        ... on Node {
          ... on ContentfulDelatBlockText {
            leftDescription {
              raw
              references {
                ... on ContentfulKnapplank {
                  contentful_id
                  __typename
                  url
                  title
                }
              }
            }
            rightDescription {
              raw
              references {
                ... on ContentfulKnapplank {
                  contentful_id
                  __typename
                  url
                  title
                }
              }
            }
          }
          ... on ContentfulTextBlock {
            id
            centeredText
            description {
              raw
              references {
                ... on ContentfulKnapplank {
                  contentful_id
                  __typename
                  url
                  title
                }
              }
            }
          }
          ... on ContentfulHeroBlock {
            title
            parallax
            description {
              raw
              references {
                ... on ContentfulKnapplank {
                  contentful_id
                  __typename
                  url
                  title
                }
              }
            }
            image {
              fixed(quality: 100, width: 2000) {
                src
              }
            }
          }
        }
      }
    }
  }
`
// services: allContentfulTjanst {
//   nodes {
//     title
//     serviceList
//     description {
//       raw
//       references {
//         ... on ContentfulAsset {
//           contentful_id
//           __typename
//           title
//           fixed(width: 750) {
//             src
//           }
//         }
//       }
//     }
//     image {
//       fluid(quality: 100) {
//         ...GatsbyContentfulFluid_withWebp
//       }
//     }
//   }
// }
// serviceList: contentfulTjanstlista {
//   service
// }
