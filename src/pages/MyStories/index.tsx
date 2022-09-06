import React from 'react'
import { useSelector } from 'react-redux'

import { SectionContainer } from '../../components/SectionContainer'
import { StoryList } from '../../components/StoryList'
import { simpleStoryService } from '../../services/SimpleStoryService'
import { getAuth } from '../../store/selectors'
import { IStoryPreview } from '../../types'

function MyStories() {
  const { user, authToken } = useSelector(getAuth)

  const [stories, setStories] = React.useState<IStoryPreview[]>([])

  React.useEffect(() => {
    const getMyStoriesPreview = async () => {
      const response = await simpleStoryService.getStoriesPreviewByUserId(
        user?.id || '',
        authToken || '',
      )

      setStories(response.data)
    }

    getMyStoriesPreview()
  }, [])

  if (!stories) {
    return <div>Loading...</div>
  }

  return (
    <SectionContainer title='My Stories'>
      <StoryList stories={stories} />
    </SectionContainer>
  )
}

export { MyStories }
