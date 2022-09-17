import * as React from "react"
import { useFormContext } from "react-hook-form"

import style from "./style.module.scss"

import { AccordionDefault } from "../../../components/AccordionDefault"

type IImageFormProps = {
  frameIndex: number
  paragraphIndex: number
  index: number
  remove: () => void
}

function ImageForm(props: IImageFormProps) {
  const { frameIndex, paragraphIndex, index, remove } = props

  const [expanded, setExpanded] = React.useState<boolean>(false)
  const toggleExpanded = () => setExpanded(!expanded)

  const FIELD_ID = `frames.${frameIndex}.paragraphs.${paragraphIndex}.images.${index}`

  const { register } = useFormContext()

  return (
    <AccordionDefault
      title={`Image Form ${index + 1}`}
      expanded={expanded}
      toggleExpanded={toggleExpanded}
    >
      <div className={style["image-form"]}>
        <input
          {...register(`${FIELD_ID}.file`)}
          type='file'
          accept='image/*'
          placeholder='image'
          className='input'
        />
        <input
          {...register(`${FIELD_ID}.alt`)}
          type='text'
          placeholder='image alt'
          className='input'
        />
        <button type='button' onClick={remove} className='btn'>
          Remove image
        </button>
      </div>
    </AccordionDefault>
  )
}

export { ImageForm }
