import React, { useState, useEffect, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Image from "../images/milde/pipes.jpg"
import SEO from "../components/seo"
import backgroundVideo from "../images/background720.mp4"
import styled, { css } from "styled-components/macro"
import Container from "../components/container"
import "animate.css"
import size from "../components/utils/breakpoints"
import Img from "gatsby-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import {
  Link as ScrollLink,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll"
import IntroTitle from "../components/IntroTitle"

const options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: ({
      data: {
        target: { slug, title },
      },
    }) => <Link to={slug}>{title}</Link>,
    [BLOCKS.EMBEDDED_ASSET]: node => <Img {...node.data.target} />,
  },
}

const Video = styled.video`
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
  margin-left: 10rem;
  color: white;

  @media (max-width: 900px) {
    flex-direction: column;
    margin-left: 0;
    text-align: center;
    font-size: 1.75rem;
  }
`

const AnimatedSpan = styled.span`
  display: inline-block;
  text-transform: lowercase;
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
  console.log("data", data)
  const heroTitle = useRef(null)
  const servicesIntro = useRef(null)
  const blurRef = useRef(null)
  const videoRef = useRef(null)
  const timeouts = []

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    const element = heroTitle.current

    element.addEventListener("animationend", handleHero(element))

    return () => {
      for (var i = 0; i < timeouts.length; i++) {
        //TODO: Find a better way
        clearTimeout(timeouts[i])
      }
    }
  }, [])

  let itemIndex = 0

  const handleHero = element => {
    if (!element) return
    console.log("handle hero")
    const numberOfItems = data.serviceList.service.length

    if (element.classList.contains("animate__fadeOutDown")) {
      itemIndex = itemIndex == numberOfItems - 1 ? 0 : ++itemIndex
      element.textContent = data.serviceList.service[itemIndex] + "?"
      element.classList.remove("animate__fadeOutDown")
      element.classList.add("animate__fadeInDown")

      timeouts.push(
        setTimeout(() => {
          element.classList.remove("animate__fadeInDown")
          element.classList.add("animate__fadeOutDown")
          timeouts.push(
            setTimeout(() => {
              handleHero(element)
            }, 500)
          )
        }, 1500)
      )
    } else if (
      !element.classList.contains("animate__fadeOutDown") &&
      !element.classList.contains("animate__fadeInDown")
    ) {
      element.textContent = data.serviceList.service[itemIndex] + "?"
      element.classList.add("animate__fadeInDown")
      timeouts.push(
        setTimeout(() => {
          element.classList.remove("animate__fadeInDown")
          element.classList.add("animate__fadeOutDown")
          timeouts.push(
            setTimeout(() => {
              handleHero(element)
            }, 500)
          )
        }, 1500)
      )
    }
  }

  const handleScroll = () => {
    if (!videoRef.current || !blurRef.current) return
    //Adds classes to stick video to top as header background

    const clientHeight =
      document.documentElement.clientWidth >= 900
        ? document.documentElement.clientHeight * 0.9
        : document.documentElement.clientHeight * 0.87

    if (window.pageYOffset > clientHeight) {
      if (!videoRef.current.classList.contains("stickyVideo")) {
        videoRef.current.classList.add("stickyVideo")
        blurRef.current.classList.add("stickyVideo")
      }
    } else {
      if (videoRef.current.classList.contains("stickyVideo")) {
        videoRef.current.classList.remove("stickyVideo")
        blurRef.current.classList.remove("stickyVideo")
      }
    }

    if (
      isInViewport(servicesIntro.current) &&
      !servicesIntro.current.classList.contains("animate__fadeIn")
    ) {
      servicesIntro.current.classList.remove("invisible")
      servicesIntro.current.classList.add("animate__fadeIn")
    }
  }

  const isInViewport = element => {
    const rect = element.getBoundingClientRect()
    return rect.top <= 300
  }

  return (
    <Layout>
      <GridContainer>
        <Video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          loop
          disablePictureInPicture
          id="bgvid"
          poster={data.poster.fluid.src}
        >
          <source src={data.videowebm.file.url} type="video/webm"></source>
          <source src={data.videomp4.file.url} type="video/mp4"></source>
        </Video>
        <BlurVideo ref={blurRef}></BlurVideo>
        <Header className="animate__animated animate__fadeIn">
          <StyledIntroImg
            placeholderStyle={{ visibility: "hidden" }}
            fluid={data.title.fluid}
          ></StyledIntroImg>
          <HeroTitle>
            Behöver ni hjälp med{" "}
            <AnimatedSpanWrapper>
              <AnimatedSpan
                ref={heroTitle}
                className="animate__animated animate__faster bbb"
              ></AnimatedSpan>
            </AnimatedSpanWrapper>
          </HeroTitle>
        </Header>
      </GridContainer>

      <Services>
        <ServicesIntroSection
          ref={servicesIntro}
          className="section-padding animate__animated invisible"
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
      </Services>
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
    title: contentfulAsset(title: { eq: "milde-title" }) {
      title
      fluid(quality: 100) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    poster: contentfulAsset(title: { eq: "poster" }) {
      title
      fluid(quality: 100) {
        src
      }
    }
    videowebm: contentfulAsset(title: { eq: "backgroundvideo" }) {
      file {
        url
      }
    }
    videomp4: contentfulAsset(title: { eq: "backgroundvideomp4" }) {
      file {
        url
      }
    }
    services: allContentfulTjanst {
      nodes {
        title
        serviceList
        description {
          raw
        }
        image {
          fluid(quality: 100) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    serviceList: contentfulTjanstlista {
      service
    }
  }
`
