import * as React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import style from "./style.module.scss"

import { ParagraphForm } from "../ParagraphForm"
import { NoteForm } from "../NoteForm"
import { IParagraphCreate } from "../../../types"
import { AccordionDefault } from "../../../components/AccordionDefault"

type IFrameFormProps = {
  index: number
  remove: () => void
}

const DEFAULT_PARAGRAPH: IParagraphCreate = {
  text: "",
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

  const { register } = useFormContext()

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

  return (
    <AccordionDefault
      title={`Frame Form ${index + 1}`}
      expanded={expanded}
      toggleExpanded={toggleExpanded}
    >
      <div className={style["frame-form"]}>
        <div>
          <input
            {...register(`${FIELD_ID}.title`)}
            type='text'
            placeholder='frame title'
            className='input'
          />
        </div>
        <div>
          {paragraphFields.map((frame, i) => (
            <ParagraphForm
              key={frame.key}
              frameIndex={index}
              index={i}
              remove={() => removeParagraph(i)}
            />
          ))}
          <button type='button' onClick={() => addParagraph(DEFAULT_PARAGRAPH)} className='btn'>
            Add paragraph
          </button>
        </div>
        <div>
          {noteFields.map((frame, i) => (
            <NoteForm key={frame.key} frameIndex={index} index={i} remove={() => removeNote(i)} />
          ))}
          <button type='button' onClick={() => addNote(DEFAULT_NOTE)} className='btn'>
            Add note
          </button>
        </div>
        <button type='button' onClick={remove} className='btn'>
          Remove frame
        </button>
      </div>
    </AccordionDefault>
  )
}

export { FrameForm }
