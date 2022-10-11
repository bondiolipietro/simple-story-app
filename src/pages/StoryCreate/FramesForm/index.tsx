import * as React from "react"
import { useFieldArray } from "react-hook-form"

import { FrameForm } from "@/pages/StoryCreate/FrameForm"

const DEFAULT_FRAME: IFrameCreate = {
  title: "",
  paragraphs: [],
  notes: [],
}

function FramesForm() {
  const {
    fields: frameFields,
    append: addFrame,
    remove: removeFrame,
  } = useFieldArray({
    name: "frames",
  })

  return (
    <>
      {frameFields.map((frame, i) => (
        <FrameForm key={frame.id} index={i} remove={() => removeFrame(i)} />
      ))}
      <button type='button' onClick={() => addFrame(DEFAULT_FRAME)} className='blue-btn'>
        Add frame
      </button>
    </>
  )
}

export { FramesForm }
