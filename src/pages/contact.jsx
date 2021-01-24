import React from 'react'
import Layout from '../components/layout'
import styled  from 'styled-components/macro';
import Img from 'gatsby-image'
import Container from '../components/container';
import IntroTitle from './../components/IntroTitle';

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
    }
`

const PersonWrapper = styled.div`
    box-shadow: 0 0 2px black;
    border-radius: 2px;
    max-width: 350px;
`

const PersonImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
`

const PersonImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    background: white;
    font-family: "Playfair Display", serif;
    font-size: 2rem;

    p {
        margin: 0;
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
                    <ContactList>
                        {data.persons.nodes.map((person, i) => (
                            <PersonWrapper>
                                <PersonImageWrapper>
                                    <PersonImage>
                                        <p>{person.name.split(' ')[0].slice(0, 1)}</p>
                                        <p>{person.name.split(' ')[1].slice(0, 1)}</p>
                                    </PersonImage>
                                </PersonImageWrapper>
                                <p>{person.name}</p>
                                <p>Befattning: {person.title}</p>
                                <p>Tel: {person.phone}</p>
                                <p>Email: <a href={`mailto:${person.email}`}>{person.email}</a></p>
                                </PersonWrapper>
                        ))}
                    </ContactList>
                </Container>
            </ContactSection>
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