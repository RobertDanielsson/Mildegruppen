// import React from "react"
// import { graphql } from "gatsby"

// const Team = ({ data }) => {
//   console.log(data)
//   return (
//     <div>
//       <h1>{data.team.teamInfo.name}</h1>
//       <p>{data.team.teamInfo.sport}</p>
//       <div>
//         {data.team.coaches.map(coach => (
//           <p>{coach}</p>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Team

// export const pageQuery = graphql`
//   query($slug: String!) {
//     team: contentfulTeam(slug: { eq: $slug }) {
//       slug
//       teeball
//       coed
//       coaches
//       teamInfo {
//         name
//         sport
//         league
//       }
//     }
//   }
// `
