import React from 'react'
import Layout from '../components/layout'
import styled  from 'styled-components/macro';
import Img from 'gatsby-image'
import Container from '../components/container';
import IntroTitle from './../components/IntroTitle';
import { graphql } from 'gatsby';

const HeroWrapper = styled.div`
    background-color: black;
    // height: 70vh;
    padding-top: 50px;
    height: 92vh;
`

const Parallax = styled.div`
/* The image used */
  background-image: url(${props => props.src});

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
`

const HeroTitle = styled.h1`
    color: white;
`

const ContactSection = styled.div`

`

const ContactTitle = styled.h2`
  font-family: "Playfair Display", serif;
  text-align: center;
  font-weight: 900;
  font-size: 3rem;
`

const ContactList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;

    @media (max-width: 900px) {
        grid-template-columns: repeat(1, 1fr);
        justify-items: center;
    }
`

const PersonWrapper = styled.div`
    box-shadow: 0 0 5px black;
    // border-bottom-left-radius: 10px;
    // border-bottom-right-radius: 10px;
    max-width: 350px;
    width: 100%;
`

const PersonImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`

const PersonImage = styled.div`
    background-image: url(https://source.unsplash.com/1600x900/?face);
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
`

const PersonInfo = styled.div`
  padding: 1rem;
  // text-align: center;

  p {
    font-weight: bold;
  }

  span {
    font-weight: normal;
  }

  h3 {
    text-align: center;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
`

const FormWrapper = styled.div`
  color: #824936;
  background-color: #F3EED9;

  h2 {
     color: #824936;
  }
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  input, textarea {
    margin-top: 0.5em;
  }

  .name, .email, .subject {
    width: 45%;
  }

  .body {
    width: 100%;
  }

  @media (max-width: 900px){
    .name, .email, .subject, .body {
      width: 100%;
    }
  }

`

export default function Contact({data}) {
    console.log(data)
    return (
        <Layout>
            <HeroWrapper>
                <Parallax src={data.contact.heroImage.fixed.src}><Container additionalStyles={`text-align: center;`}><HeroTitle>{data.contact.heroText}</HeroTitle></Container></Parallax>
            </HeroWrapper>
            <ContactSection className="section-padding">
                <Container>
                    <IntroTitle
            title="Våra medarbetare"
            description={
              <>
                <p>Intresserad av våra tjänster?</p>
                <p>Hitta din kontakt nedan.</p>
              </>
            }
          ></IntroTitle>
                    <ContactList className="section-padding">
                        {data.persons.nodes.map((person, i) => (
                            <PersonWrapper>
                                <PersonImageWrapper>
                                    <PersonImage>
                                        {/* <p>{person.name.split(' ')[0].slice(0, 1)}</p>
                                        <p>{person.name.split(' ')[1].slice(0, 1)}</p> */}
                                        <div></div>
                                    </PersonImage>
                                </PersonImageWrapper>
                                <PersonInfo>
                                  <h3 className="bbb">{person.name}</h3>
                                  <p>Befattning: <span>{person.title}</span></p>
                                  <p>Tel: <span>{person.phone}</span></p>
                                  <p >Email: <a href={`mailto:${person.email}`}><span>{person.email}</span></a></p>
                                </PersonInfo>
                                </PersonWrapper>
                        ))}
                    </ContactList>
                </Container>
            </ContactSection>

            <FormWrapper className="section-padding">
              <Container >
                <IntroTitle title="Kontakta oss" color="#824936" description={<p>Fyll i formuläret nedan så återkommer vi.</p>}></IntroTitle>
                <Form>
                  <div className="name">
                    <label htmlFor="name">
                      Ditt namn (obligatoriskt)
                      <input  id="name" type="text"></input>
                    </label>
                  </div>

                  <div className="email">
                    <label htmlFor="email">
                      Din e-post (obligatoriskt)
                      <input  id="email" type="text"></input>
                    </label>
                  </div>

                  <div className="subject">
                    <label htmlFor="subject">
                      Ämne
                      <input  id="subject" type="text"></input>
                    </label>
                  </div>

                  <div className="body">
                    <label htmlFor="body">
                      Meddelande
                      <textarea  id="body" type="text"></textarea>
                    </label>
                  </div>
                  <div>
                    <button className="button">Skicka</button>
                  </div>
                </Form>
              </Container>
            </FormWrapper>
        </Layout>
    )
}

export const query = graphql`
  query contactQuery {
    contact: contentfulKontaktsida {
    heroImage {
      fixed(quality: 100, width: 3840) {
        src
      }
    }
    heroText
  }
  persons: allContentfulAnstalld {
    nodes {
      name
      phone
      title
      email
    }
  }
  }
`