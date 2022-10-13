import * as React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { ImageForm } from "@/pages/StoryCreate/ImageForm"
import { AccordionDefault } from "@/components/AccordionDefault"
import { FormErrorMsg } from "@/components/FormErrorMsg"
import { FormUtil } from "@/utils/form-util"

import style from "./style.module.scss"

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

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({
    name: `${FIELD_ID}.images`,
  })

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const paragraphTextError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.text`)
  const paragraphAudioFileError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.audio.file`)
  const paragraphAudioAltError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.audio.alt`)

  return (
    <AccordionDefault
      title={`Paragraph ${index + 1}`}
      description={`~ Frame ${frameIndex + 1} > Paragraph ${index + 1}`}
      expanded={expanded}
      toggleExpanded={toggleExpanded}
    >
      <div className={style["paragraph-form"]}>
        <label htmlFor={`${FIELD_ID}.text`}>Text</label>
        <textarea
          {...register(`${FIELD_ID}.text`)}
          maxLength={2048}
          rows={6}
          placeholder='paragraph text'
          className='input disable-resize'
        />
        {paragraphTextError && <FormErrorMsg errorMessage={paragraphTextError} />}
        <label htmlFor={`${FIELD_ID}.audio.file`}>Audio</label>
        <input {...register(`${FIELD_ID}.audio.file`)} type='file' accept='audio/*' className='input' />
        {paragraphAudioFileError && <FormErrorMsg errorMessage={paragraphAudioFileError} />}
        <label htmlFor={`${FIELD_ID}.audio.alt`}>Audio Alt</label>
        <input {...register(`${FIELD_ID}.audio.alt`)} type='text' placeholder='audio alt' className='input' />
        {paragraphAudioAltError && <FormErrorMsg errorMessage={paragraphAudioAltError} />}
        {imageFields.map((frame, i) => (
          <ImageForm
            key={frame.id}
            frameIndex={frameIndex}
            paragraphIndex={index}
            index={i}
            remove={() => removeImage(i)}
          />
        ))}
        <div className={style["form-actions"]}>
          <button type='button' onClick={() => addImage(DEFAULT_IMAGE)} className='blue-btn'>
            Add image
          </button>
          <button type='button' onClick={remove} className='red-btn'>
            Remove paragraph
          </button>
        </div>
      </div>
    </AccordionDefault>
  )
}

export { ParagraphForm }
