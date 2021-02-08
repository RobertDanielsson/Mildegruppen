import React from "react"
import SplitBlockText from "../components/Blocks/SplitBlockText"
import TextAreaBlock from "./Blocks/TextAreaBlock"

const ContentArea = ({ contentTypes }) => {
  console.log("contentTypes", contentTypes)

  if (contentTypes !== null) {
    return contentTypes.map((item, index) => {
      console.log(item)
      const DynamicComponent = ComponentList[item.__typename]

      if (DynamicComponent !== undefined) {
        return <DynamicComponent key={index} content={item} />
      } else {
        return <></>
      }
    })
  } else {
    return <></>
  }
}

export default ContentArea

const ComponentList = {
  ContentfulDelatBlockText: SplitBlockText,
  ContentfulTextBlock: TextAreaBlock,
}
