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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHammer,
  faShieldVirus,
  faShower,
} from "@fortawesome/free-solid-svg-icons"

import Img from "gatsby-image"

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

const stickyVideo = css`
  position: fixed;
  top: -90vh;
  z-index: 1;
`

const Header = styled.header`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: white;
  flex-direction: column;
`

const StyledIntroImg = styled(Img)`
  margin-bottom: 2rem;
  width: 500px;
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
  font-size: 32px;
  font-weight: 700;
  margin-left: 10rem;
`

const AnimatedSpan = styled.span`
  display: inline-block;
  text-transform: lowercase;
`

const AnimatedSpanWrapper = styled.div`
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

  border-bottom: 1px solid #dcdcdc;
`

const Services = styled.div`
  .serviceSection {
    padding: 100px 0;
  }
`

const ServicesIntroTitle = styled.h2`
  font-family: "Playfair Display", serif;
  text-align: center;
  font-weight: 900;
  font-size: 4rem;
  margin-bottom: 20px;
`

const ServicesIntroList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin: 50px 0;
`

const ServiceIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 60px;
  color: #808080;

  .icon {
    margin-bottom: 20px;
    color: #c0c0c0;
  }

  h2 {
    font-weight: 300;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    letter
  }

  h2::after {
    content: "";
    display: block;
    height: 2px;
    width: 110%;
    background: #6ec1e4;
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

const IndexPage = ({ data }) => {
  console.log("data", data)

  const [videoStyle, setVideoStyle] = useState("")
  const heroTitle = useRef(null)
  const texts = [
    "Avlopp",
    "Rivning",
    "Asbest",
    "Relining",
    "Spolning",
    "Filmning",
    "Bilning",
    "Betonghåltagning",
    "Betongsågning",
    "Diamantslipning",
    "Asbestsanering",
    "Asbestprovtagning",
  ]

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    const element = heroTitle.current

    element.addEventListener("animationend", handleHero(element))
  }, [])

  let itemIndex = 0

  const handleHero = element => {
    const numberOfItems = texts.length

    if (element.classList.contains("animate__fadeOutDown")) {
      itemIndex = itemIndex == numberOfItems - 1 ? 0 : ++itemIndex
      element.textContent = texts[itemIndex] + "?"
      element.classList.remove("animate__fadeOutDown")
      element.classList.add("animate__fadeInDown")

      setTimeout(() => {
        element.classList.remove("animate__fadeInDown")
        element.classList.add("animate__fadeOutDown")
        setTimeout(() => {
          handleHero(element)
        }, 500)
      }, 1500)
    } else if (
      !element.classList.contains("animate__fadeOutDown") &&
      !element.classList.contains("animate__fadeInDown")
    ) {
      element.textContent = texts[itemIndex] + "?"
      element.classList.add("animate__fadeInDown")
      setTimeout(() => {
        element.classList.remove("animate__fadeInDown")
        element.classList.add("animate__fadeOutDown")
        setTimeout(() => {
          handleHero(element)
        }, 500)
      }, 1500)
    }
  }

  const handleScroll = () => {
    if (window.pageYOffset > document.documentElement.clientHeight * 0.9) {
      if (videoStyle === "") {
        setVideoStyle(stickyVideo)
      }
    } else {
      setVideoStyle("")
    }
  }

  return (
    <Layout>
      <GridContainer>
        <Video
          css={videoStyle}
          playsinline
          autoPlay
          muted
          loop
          id="bgvid"
          src={backgroundVideo}
          type="video/mp4"
        ></Video>
        <BlurVideo css={videoStyle}></BlurVideo>
        <Header>
          <StyledIntroImg fluid={data.contentfulAsset.sizes}></StyledIntroImg>
          <HeroTitle>
            Behöver ni hjälp med{" "}
            <AnimatedSpanWrapper>
              <AnimatedSpan
                ref={heroTitle}
                className="animate__animated animate__faster blue-bottom-border"
              ></AnimatedSpan>
            </AnimatedSpanWrapper>
          </HeroTitle>
        </Header>
      </GridContainer>

      <Services>
        <ServicesIntroSection className="serviceSection animate__animated animate__fadeIn ">
          <ServicesIntroTitle>Våra tjänster</ServicesIntroTitle>
          <p className="servicesIntro">Vi håller en hög standard.</p>
          <p className="servicesIntro">Detta erbjuder vi er:</p>
          <ServicesIntroList>
            <ServiceIntro>
              <FontAwesomeIcon icon={faShower} className="icon" size="4x" />
              <h2>Avlopp</h2>
              <ul>
                <li>Relning</li>
                <li>Spolning</li>
                <li>Filmning</li>
              </ul>
            </ServiceIntro>
            <ServiceIntro>
              <FontAwesomeIcon icon={faHammer} className="icon" size="4x" />
              <h2>Rivning</h2>
              <ul>
                <li>Relning</li>
                <li>Spolning</li>
                <li>Filmning</li>
                <li>Spolning</li>
                <li>Filmning</li>
              </ul>
            </ServiceIntro>
            <ServiceIntro>
              <FontAwesomeIcon
                icon={faShieldVirus}
                className="icon"
                size="4x"
              />
              <h2>Asbest</h2>
              <ul>
                <li>Relning</li>
                <li>Spolning</li>
              </ul>
            </ServiceIntro>
          </ServicesIntroList>
        </ServicesIntroSection>

        <section
          css={`
            background-color: #222c2a;
            color: white;
          `}
          className="serviceSection"
        >
          <Container
            additionalStyles={`
              display: flex;
              justify-content: space-between;
            `}
          >
            <figure
              css={`
                width: 45%;
              `}
            >
              <img src={Image}></img>
            </figure>
            <div
              css={`
                width: 50%;

                h3 {
                  margin-top: -4px;
                  font-size: 2rem;
                  font-weight: 300;
                }
              `}
            >
              <h3>Avlopp</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
          </Container>
        </section>

        <section className="serviceSection">
          <Container
            additionalStyles={`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 2rem;
            `}
          >
            <div
              css={`
                grid-column: 1 / 2;
                h3 {
                  margin-top: -4px;
                  font-size: 2rem;
                  font-weight: 300;
                  display: inline-block;
                }
              `}
            >
              <h3 className="blue-bottom-border">Avlopp</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
            <figure
              css={`
                grid-column: 2 / 3;
              `}
            >
              <img src={Image}></img>
            </figure>
          </Container>
        </section>

        <section
          css={`
            background-color: #222c2a;
            color: white;
          `}
          className="serviceSection"
        >
          <Container
            additionalStyles={`
              display: flex;
              justify-content: space-between;
            `}
          >
            <figure
              css={`
                width: 45%;
              `}
            >
              <img src={Image}></img>
            </figure>
            <div
              css={`
                width: 50%;

                h3 {
                  margin-top: -4px;
                  font-size: 2rem;
                  font-weight: 300;
                }
              `}
            >
              <h3>Avlopp</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
          </Container>
        </section>
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
    contentfulAsset(title: { eq: "milde-title" }) {
      title
      sizes(quality: 100) {
        ...GatsbyContentfulSizes_withWebp
      }
    }
  }
`
