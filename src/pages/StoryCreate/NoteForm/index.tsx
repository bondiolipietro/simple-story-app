import * as React from "react"
import { useFormContext } from "react-hook-form"

import style from "./style.module.scss"

import { AccordionDefault } from "../../../components/AccordionDefault"

type INoteFormProps = {
  frameIndex: number
  index: number
  remove: () => void
}

function NoteForm(props: INoteFormProps) {
  const { frameIndex, index, remove } = props

  const [expanded, setExpanded] = React.useState<boolean>(false)
  const toggleExpanded = () => setExpanded(!expanded)

  const FIELD_ID = `frames.${frameIndex}.notes.${index}`

  const { register } = useFormContext()

  return (
    <AccordionDefault
      title={`Note Form ${index + 1}`}
      expanded={expanded}
      toggleExpanded={toggleExpanded}
    >
      <div className={style["note-form"]}>
        <input {...register(`${FIELD_ID}.text`)} type='text' placeholder='note' className='input' />
        <button type='button' onClick={remove} className='btn'>
          Remove note
        </button>
      </div>
    </AccordionDefault>
  )
}

export { NoteForm }
