import * as React from "react"
import { useFormContext } from "react-hook-form"

import style from "./style.module.scss"

function InfoForm() {
  const FIELD_ID = `info`

  const { register } = useFormContext()

  return (
    <div className={style["info-form"]}>
      Info Form
      <input {...register(`${FIELD_ID}.title`)} type='text' placeholder='title' className='input' />
      <input
        {...register(`${FIELD_ID}.description`)}
        type='text'
        placeholder='description'
        className='input'
      />
      <select {...register(`${FIELD_ID}.private`)}>
        <option value='true'>true</option>
        <option value='false'>false</option>
      </select>
      <div>
        <input
          {...register(`${FIELD_ID}.image.file`)}
          type='file'
          accept='image/*'
          placeholder='image'
          className='input'
        />
        <input
          {...register(`${FIELD_ID}.image.alt`)}
          type='text'
          placeholder='image alt'
          className='input'
        />
      </div>
    </div>
  )
}

export { InfoForm }
