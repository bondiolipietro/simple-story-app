import * as React from "react"
import { useFormContext } from "react-hook-form"

import { AccordionDefault } from "@/components/AccordionDefault"
import { FormErrorMsg } from "@/components/FormErrorMsg"
import { FormUtil } from "@/utils/form-util"

import style from "./style.module.scss"

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

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const noteTextError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.text`)

  return (
    <AccordionDefault
      title={`Note ${index + 1}`}
      description={`~ Frame ${frameIndex + 1} > Note ${index + 1}`}
      expanded={expanded}
      toggleExpanded={toggleExpanded}
    >
      <div className={style["note-form"]}>
        <label htmlFor={`${FIELD_ID}.text`}>Text</label>
        <textarea
          {...register(`${FIELD_ID}.text`)}
          maxLength={512}
          rows={4}
          placeholder='note'
          className='input disable-resize'
        />
        {noteTextError && <FormErrorMsg errorMessage={noteTextError} />}
        <div className={style["form-actions"]}>
          <button type='button' onClick={remove} className='red-btn'>
            Remove note
          </button>
        </div>
      </div>
    </AccordionDefault>
  )
}

export { NoteForm }
