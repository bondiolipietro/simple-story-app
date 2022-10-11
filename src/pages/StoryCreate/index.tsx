import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"

import { InfoForm } from "@/pages/StoryCreate/InfoForm"
import { FramesForm } from "@/pages/StoryCreate/FramesForm"
import { logger } from "@/services/winston-logger"

import style from "./style.module.scss"

function StoryCreate() {
  const methods = useForm<IStoryCreateForm>()

  const handleSubmit = (data: any) => {
    logger.info(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={style["story-create-form"]}>
        <InfoForm />
        <FramesForm />
        <button type='submit' className='green-btn'>
          Create story
        </button>
      </form>
    </FormProvider>
  )
}

export { StoryCreate }
