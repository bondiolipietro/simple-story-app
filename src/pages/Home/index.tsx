import * as React from "react"

import style from "./style.module.scss"

import { simpleStoryService } from "../../services/SimpleStoryService"
import { IStoryPreview } from "../../types"
import { StoryList } from "../../components/StoryList"
import { SectionContainer } from "../../components/SectionContainer"

function Home() {
  const [publicStories, setPublicStories] = React.useState<IStoryPreview[]>([])

  React.useEffect(() => {
    const getPublicStoriesPreview = async () => {
      const response = await simpleStoryService.getPublicStoriesPreview()

      setPublicStories(response.data)
    }

    getPublicStoriesPreview()
  }, [])

  return (
    <>
      <SectionContainer>
        <div className={style["presentation"]}>
          <p>
            Simple story, <s>literally as the name says</s>, is a tool to create personalized
            stories and share it with the world. In my case I wanted to somehow show to an special
            person how special and unique she was to me.
          </p>
          <img
            src='https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1494&q=80'
            className={style["presentation__img"]}
            alt=''
          />
        </div>
      </SectionContainer>
      <SectionContainer title='Public Stories'>
        <StoryList stories={publicStories} />
      </SectionContainer>
    </>
  )
}

export { Home }
