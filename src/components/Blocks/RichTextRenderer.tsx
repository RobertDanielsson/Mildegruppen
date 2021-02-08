import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import options from "./richtextRenderOptions"

const RichTextRenderer = ({ content }) => {
  if (!content) return <></>

  return <>{renderRichText(content, options)}</>
}

export default RichTextRenderer
