import * as React from "react"
import { useFormContext } from "react-hook-form"

import { AccordionDefault } from "@/components/AccordionDefault"
import { FormErrorMsg } from "@/components/FormErrorMsg"
import { FormUtil } from "@/utils/form-util"

import style from "./style.module.scss"

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

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const imageFileError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.file`)
  const imageAltError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.alt`)

  return (
    <AccordionDefault
      title={`Image ${index + 1}`}
      description={`~ Frame ${frameIndex + 1} > Paragraph ${paragraphIndex + 1} > Image ${index + 1}`}
      expanded={expanded}
      toggleExpanded={toggleExpanded}
    >
      <div className={style["image-form"]}>
        <input {...register(`${FIELD_ID}.file`)} type='file' accept='image/*' placeholder='image' className='input' />
        {imageFileError && <FormErrorMsg errorMessage={imageFileError} />}
        <input {...register(`${FIELD_ID}.alt`)} type='text' placeholder='image alt' className='input' />
        {imageAltError && <FormErrorMsg errorMessage={imageAltError} />}
        <button type='button' onClick={remove} className='red-btn'>
          Remove image
        </button>
      </div>
    </AccordionDefault>
  )
}

export { ImageForm }
