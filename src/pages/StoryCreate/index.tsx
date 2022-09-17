import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"

import { InfoForm } from "./InfoForm"
import { FramesForm } from "./FramesForm"
import style from "./style.module.scss"

import { IStoryCreateForm } from "../../types"

function StoryCreate() {
  const methods = useForm<IStoryCreateForm>()

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={style["story-create-form"]}>
        <InfoForm />
        <FramesForm />
        <button type='submit' className='btn'>
          create
        </button>
      </form>
    </FormProvider>
  )
}

export { StoryCreate }
