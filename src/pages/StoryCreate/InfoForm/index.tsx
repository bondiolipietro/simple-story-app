import * as React from "react"
import { useFormContext } from "react-hook-form"

import { FormWarningsHelper } from "@/utils/form-warnings-util"
import { FormErrorMsg } from "@/components/FormErrorMsg"

import style from "./style.module.scss"

function InfoForm() {
  const FIELD_ID = `info`

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className={style["info-form"]}>
      Story Info
      <label htmlFor={`${FIELD_ID}.title`}>Title</label>
      <input {...register(`${FIELD_ID}.title`, { required: true })} type='text' placeholder='title' className='input' />
      {errors[`${FIELD_ID}.title`] && <FormErrorMsg errorMessage={FormWarningsHelper.requiredFieldMsg()} />}
      <label htmlFor={`${FIELD_ID}.description`}>Description</label>
      <input {...register(`${FIELD_ID}.description`)} type='text' placeholder='description' className='input' />
      {errors[`${FIELD_ID}.description`] && <FormErrorMsg errorMessage={FormWarningsHelper.requiredFieldMsg()} />}
      <label htmlFor={`${FIELD_ID}.private`}>Private</label>
      <select {...register(`${FIELD_ID}.private`)}>
        <option value='true'>true</option>
        <option value='false'>false</option>
      </select>
      {errors[`${FIELD_ID}.private`] && <FormErrorMsg errorMessage={FormWarningsHelper.requiredFieldMsg()} />}
      <div>
        <label htmlFor={`${FIELD_ID}.image`}>Image</label>
        <input
          {...register(`${FIELD_ID}.image.file`, {})}
          type='file'
          accept='image/*'
          placeholder='image'
          className='input'
        />
        {errors[`${FIELD_ID}.image.file`] && <FormErrorMsg errorMessage={FormWarningsHelper.requiredFieldMsg()} />}
        <input {...register(`${FIELD_ID}.image.alt`)} type='text' placeholder='image alt' className='input' />
        {errors[`${FIELD_ID}.image.alt`] && <FormErrorMsg errorMessage={FormWarningsHelper.requiredFieldMsg()} />}
      </div>
    </div>
  )
}

export { InfoForm }
