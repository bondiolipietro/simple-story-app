import * as React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { AccordionDefault } from "@/components/AccordionDefault"
import { ParagraphForm } from "@/pages/StoryCreate/ParagraphForm"
import { NoteForm } from "@/pages/StoryCreate/NoteForm"
import { FormErrorMsg } from "@/components/FormErrorMsg"
import { FormUtil } from "@/utils/form-util"

import style from "./style.module.scss"

type IFrameFormProps = {
  index: number
  remove: () => void
}

const DEFAULT_PARAGRAPH: IParagraphCreate = {
  text: "",
  audio: {
    file: undefined,
    alt: "",
  },
  images: [],
}

const DEFAULT_NOTE = {
  text: "",
}

function FrameForm(props: IFrameFormProps) {
  const { index, remove } = props

  const [expanded, setExpanded] = React.useState<boolean>(false)
  const toggleExpanded = () => setExpanded(!expanded)

  const FIELD_ID = `frames.${index}`

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const {
    fields: paragraphFields,
    append: addParagraph,
    remove: removeParagraph,
  } = useFieldArray({
    name: `${FIELD_ID}.paragraphs`,
  })

  const {
    fields: noteFields,
    append: addNote,
    remove: removeNote,
  } = useFieldArray({
    name: `${FIELD_ID}.notes`,
  })

  const frameTitleError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.title`)

  return (
    <AccordionDefault title={`Frame ${index + 1}`} expanded={expanded} toggleExpanded={toggleExpanded}>
      <div className={style["frame-form"]}>
        <div>
          <input {...register(`${FIELD_ID}.title`)} type='text' placeholder='frame title' className='input' />
          {frameTitleError && <FormErrorMsg errorMessage={frameTitleError} />}
        </div>
        {paragraphFields.map((frame, i) => (
          <ParagraphForm key={frame.id} frameIndex={index} index={i} remove={() => removeParagraph(i)} />
        ))}
        {noteFields.map((frame, i) => (
          <NoteForm key={frame.id} frameIndex={index} index={i} remove={() => removeNote(i)} />
        ))}
        <div className={style["form-actions"]}>
          <button type='button' onClick={() => addParagraph(DEFAULT_PARAGRAPH)} className='blue-btn'>
            Add paragraph
          </button>
          <button type='button' onClick={() => addNote(DEFAULT_NOTE)} className='blue-btn'>
            Add note
          </button>
          <button type='button' onClick={remove} className='red-btn'>
            Remove frame
          </button>
        </div>
      </div>
    </AccordionDefault>
  )
}

export { FrameForm }
