import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ContentArea from "../components/ContentArea"
import styled from "styled-components"

const ContentAreaWrapper = styled.div`
  > * {
    margin-bottom: 100px;
  }
`

const StandardPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <ContentAreaWrapper>
        <ContentArea contentTypes={data.page.blocks} />
      </ContentAreaWrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: contentfulStandardsida(slug: { eq: $slug }) {
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
          ... on ContentfulDelatBlockTextBild {
            imageLeftSide
            image {
              fluid(quality: 100) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
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
        }
      }
    }
  }
`

export default StandardPage
