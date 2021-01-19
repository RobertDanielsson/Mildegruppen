import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../images/milde/pipes.jpg"
import SEO from "../components/seo"
import backgroundVideo from "../images/background720.mp4"
import styled, { css } from "styled-components/macro"
import Container from "../components/container"

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

  h2 {
    letterspacing: 3px;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  > * {
    grid-row-start: 1;
    grid-column-start: 1;
  }
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
`

const IntroSection = styled.section`
  section {
    padding: 80px 0 80px;
  }
`

const ServicesTitle = styled.h2`
  padding-top: 80px;
  text-align: center;
  font-weight: 300;
  font-size: 3rem;
`

const IndexPage = () => {
  const [videoStyle, setVideoStyle] = useState("")

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])

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
          <HeroTitle>Mildegruppen</HeroTitle>
        </Header>
      </GridContainer>

      <IntroSection>
        <ServicesTitle>Våra tjänster</ServicesTitle>

        <section>
          <Container
            additionalStyles={`
              display: flex;
              justify-content: space-between;
            `}
          >
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
            <figure
              css={`
                width: 45%;
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

        <section>
          <Container
            additionalStyles={`
              display: flex;
              justify-content: space-between;
            `}
          >
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
            <figure
              css={`
                width: 45%;
              `}
            >
              <img src={Image}></img>
            </figure>
          </Container>
        </section>
      </IntroSection>
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
