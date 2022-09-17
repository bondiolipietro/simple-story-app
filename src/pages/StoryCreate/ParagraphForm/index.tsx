import * as React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import style from "./style.module.scss"

import { ImageForm } from "../ImageForm"
import { AccordionDefault } from "../../../components/AccordionDefault"
import { IMediaCreate } from "../../../types"

type IParagraphFormProps = {
  frameIndex: number
  index: number
  remove: () => void
}

const DEFAULT_IMAGE: IMediaCreate = {
  file: undefined,
  alt: "",
}

function ParagraphForm(props: IParagraphFormProps) {
  const { frameIndex, index, remove } = props

  const [expanded, setExpanded] = React.useState<boolean>(false)
  const toggleExpanded = () => setExpanded(!expanded)

  const FIELD_ID = `frames.${frameIndex}.paragraphs.${index}`

  const { register } = useFormContext()

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({
    name: `${FIELD_ID}.images`,
  })

  return (
    <AccordionDefault
      title={`Paragraph Form ${index + 1}`}
      expanded={expanded}
      toggleExpanded={toggleExpanded}
    >
      <div className={style["paragraph-form"]}>
        <div>
          <input
            {...register(`${FIELD_ID}.text`)}
            type='text'
            placeholder='paragraph text'
            className='input'
          />
        </div>
        <div>
          <input
            {...register(`${FIELD_ID}.audio`)}
            type='file'
            accept='audio/*'
            placeholder='paragraph audio'
            className='input'
          />
        </div>
        <div>
          {imageFields.map((frame, i) => (
            <ImageForm
              key={frame.key}
              frameIndex={frameIndex}
              paragraphIndex={index}
              index={i}
              remove={() => removeImage(i)}
            />
          ))}
          <button type='button' onClick={() => addImage(DEFAULT_IMAGE)} className='btn'>
            Add image
          </button>
        </div>
        <button type='button' onClick={remove} className='btn'>
          Remove paragraph
        </button>
      </div>
    </AccordionDefault>
  )
}

export { ParagraphForm }
