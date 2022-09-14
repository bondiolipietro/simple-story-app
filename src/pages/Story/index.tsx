import * as React from "react"
import { useParams } from "react-router-dom"

import { StoryComp } from "../../components/StoryComp"

function Story() {
  const { id } = useParams()

  return <StoryComp id={id!} />
}

export { Story }
