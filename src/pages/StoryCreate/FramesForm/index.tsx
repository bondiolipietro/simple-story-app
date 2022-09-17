import * as React from "react"
import { useFieldArray } from "react-hook-form"

import { IFrameCreate } from "../../../types"
import { FrameForm } from "../FrameForm"

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
        <FrameForm key={frame.key} index={i} remove={() => removeFrame(i)} />
      ))}
      <button type='button' onClick={() => addFrame(DEFAULT_FRAME)} className='btn'>
        Add frame
      </button>
    </>
  )
}

export { FramesForm }
