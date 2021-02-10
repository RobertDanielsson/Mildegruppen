import React from "react"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { Link } from "gatsby"

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
    [MARKS.ITALIC]: text => <i>{text}</i>,
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
          <iframe
            width="100%"
            src={node.data.uri.replace("watch?v=", "embed/")}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      } else
        return (
          //TODO fixa website_url
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
        return (
          <Link className="button btn-accent" to={node.data.target.url}>
            {node.data.target.title}
          </Link>
        )
        return <Link to={node.data.target.url}>{node.data.target.title}</Link>
      }
    },
  },
}

export default options
