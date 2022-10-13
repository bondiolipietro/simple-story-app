import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import _ from "lodash"

import { InfoForm } from "@/pages/StoryCreate/InfoForm"
import { FramesForm } from "@/pages/StoryCreate/FramesForm"
import { fileService } from "@/services/api/file-service"
import { logger } from "@/services/winston-logger"

import style from "./style.module.scss"

const MAX_FILE_SIZE = 1024 * 1024 * 3 // 3MB

const IMAGE_SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]
const AUDIO_SUPPORTED_FORMATS = ["audio/mpeg", "audio/mp3", "audio/wav"]

const AudioFileSchema = yup.object().shape({
  file: yup
    .mixed()
    .test("fileRequired", "File is required", (value) => value.length && value[0])
    .test("fileSize", "File too large", (value) => !value.length || (value[0] && value[0].size <= MAX_FILE_SIZE))
    .test(
      "fileFormat",
      "Unsupported file type",
      (value) => !value.length || (value && AUDIO_SUPPORTED_FORMATS.includes(value[0].type)),
    ),
  alt: yup.string(),
})

const ImageFileSchema = yup.object().shape({
  file: yup
    .mixed()
    .test("fileRequired", "File is required", (value) => value && value[0] !== undefined)
    .test("fileSize", "File too large", (value) => value[0] === null || (value[0] && value[0].size <= MAX_FILE_SIZE))
    .test(
      "fileFormat",
      "Unsupported file type",
      (value) => value === null || (value[0] && IMAGE_SUPPORTED_FORMATS.includes(value[0].type)),
    ),
  alt: yup.string(),
})

const StoryCreateFormSchema = yup.object({
  info: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    image: ImageFileSchema,
    isPrivate: yup.boolean().required(),
  }),
  frames: yup.array().of(
    yup.object({
      title: yup.string().required(),
      notes: yup.array().of(
        yup.object({
          text: yup.string().required(),
        }),
      ),
      paragraphs: yup.array().of(
        yup.object({
          text: yup.string().required(),
          audio: AudioFileSchema,
          images: yup.array().of(ImageFileSchema),
        }),
      ),
    }),
  ),
})

function StoryCreate() {
  const methods = useForm<IStoryCreateForm>({ resolver: yupResolver(StoryCreateFormSchema), mode: "onChange" })

  const updloadAllFiles = async (data: IStoryCreateForm) => {
    const files: Array<{ file: File; alt?: string; path: string }> = []

    if (data.info.image.file) {
      files.push({ file: data.info.image.file[0], alt: data.info.image.alt, path: "data.info.image" })
    }

    data.frames.forEach((frame, frame_i) => {
      frame.paragraphs.forEach((paragraph, paragraph_i) => {
        if (paragraph.audio.file) {
          files.push({
            file: paragraph.audio.file[0],
            alt: paragraph.audio.alt,
            path: `frames.${frame_i}.paragraphs.${paragraph_i}.audio`,
          })
        }
        paragraph.images.forEach((image, image_i) => {
          if (image.file) {
            files.push({
              file: image.file[0],
              alt: image.alt,
              path: `frames.${frame_i}.paragraphs.${paragraph_i}.images.${image_i}`,
            })
          }
        })
      })
    })

    const uploadFile = async ({ file, alt, path }: { file: File; alt?: string; path: string }) => {
      try {
        const res = await fileService.uploadFile(file, alt)

        return {
          _id: res.data._id,
          path,
        }
      } catch (error) {
        return {
          _id: null,
          path,
        }
      }
    }

    const uploadFileTasks = files.map(
      ({ file, alt, path }) => new Promise((resolve) => resolve(uploadFile({ file, alt, path }))),
    )

    const tasksResults = (await Promise.all(uploadFileTasks).then((responses) => responses)) as Array<{
      _id: string
      path: string
    }>

    tasksResults.forEach(({ _id, path }) => {
      if (_id) {
        data = _.set(data, path, _id)
      }
    })
    console.log(data)
  }

  const handleSubmit = (data: IStoryCreateForm) => {
    console.info(data)

    updloadAllFiles(data)
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
