import * as React from "react"
import { useFormContext } from "react-hook-form"

import { FormErrorMsg } from "@/components/FormErrorMsg"
import { FormUtil } from "@/utils/form-util"

import style from "./style.module.scss"

function InfoForm() {
  const FIELD_ID = `info`

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const titleError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.title`)
  const descriptionError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.description`)
  const imageFileError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.image.file`)
  const imageAltError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.image.alt`)
  const isPrivateError = FormUtil.getFieldErrorMessage(errors, `${FIELD_ID}.isPrivate`)

  return (
    <div className={style["info-form"]}>
      Story Info
      <label htmlFor={`${FIELD_ID}.title`}>Title</label>
      <input {...register(`${FIELD_ID}.title`, { required: true })} type='text' placeholder='title' className='input' />
      {titleError && <FormErrorMsg errorMessage={titleError} />}
      <label htmlFor={`${FIELD_ID}.description`}>Description</label>
      <input {...register(`${FIELD_ID}.description`)} type='text' placeholder='description' className='input' />
      {descriptionError && <FormErrorMsg errorMessage={descriptionError} />}
      <label htmlFor={`${FIELD_ID}.isPrivate`}>Private</label>
      <select {...register(`${FIELD_ID}.isPrivate`)}>
        <option value='true'>true</option>
        <option value='false'>false</option>
      </select>
      {isPrivateError && <FormErrorMsg errorMessage={isPrivateError} />}
      <div>
        <label htmlFor={`${FIELD_ID}.image`}>Image</label>
        <input
          {...register(`${FIELD_ID}.image.file`, {})}
          type='file'
          accept='image/*'
          placeholder='image'
          className='input'
        />
        {imageFileError && <FormErrorMsg errorMessage={imageFileError} />}
        <input {...register(`${FIELD_ID}.image.alt`)} type='text' placeholder='image alt' className='input' />
        {imageAltError && <FormErrorMsg errorMessage={imageAltError} />}
      </div>
    </div>
  )
}

export { InfoForm }
