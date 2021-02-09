const path = require("path")
const slash = require("slash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // return graphql(
  //   `
  //     {
  //       allContentfulTeam {
  //         edges {
  //           node {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   `
  // )
  //   .then(result => {
  //     if (result.errors) {
  //       console.log("error with contentful data", result.errors)
  //     }

  //     const teamTemplate = path.resolve("./src/templates/team.tsx")

  //     result.data.allContentfulTeam.edges.forEach(team => {
  //       createPage({
  //         path: `/teams/${team.node.slug}`,
  //         component: slash(teamTemplate),
  //         context: {
  //           slug: team.node.slug,
  //         },
  //       })
  //     })
  //   })
  //   .catch(error => {
  //     console.log("Error with contentfl data", error)
  //   })

  return graphql(`
    {
      allContentfulStandardsida {
        nodes {
          slug
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        console.log("error with contentful data", result.errors)
      }

      const standardPageTemplate = path.resolve(
        "./src/templates/StandardPage.tsx"
      )

      result.data.allContentfulStandardsida.nodes.forEach(page => {
        console.log("page", page)
        createPage({
          path: `${page.slug}`,
          component: slash(standardPageTemplate),
          context: {
            slug: page.slug,
          },
        })
      })
    })
    .catch(error => {
      console.log("error with contentful data", error)
    })
}
