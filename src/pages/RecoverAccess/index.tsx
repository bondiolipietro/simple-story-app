import * as React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify"

import { userService } from "@/services/api/user-service"
import { FormWarningsHelper } from "@/utils/form-warnings-util"
import { authService } from "@/services/api/auth-service"

import style from "./style.module.scss"

enum FormFields {
  EMAIL = "email",
}

type IFormData = {
  [FormFields.EMAIL]: string
}

const FormExamples = {
  [FormFields.EMAIL]: "john@gmail.com",
}

const FormSchema = yup
  .object({
    [FormFields.EMAIL]: yup
      .string()
      .required(FormWarningsHelper.requiredFieldMsg(FormFields.EMAIL))
      .email(FormWarningsHelper.invalidFieldMsg(FormFields.EMAIL)),
  })
  .required()

function RecoverAccess() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    resetField,
  } = useForm<IFormData>({
    resolver: yupResolver(FormSchema),
  })

  const onSubmit = async (data: IFormData) => {
    const { email } = data

    try {
      await authService.sendRecoverPasswordEmail(email)

      toast.info(`An recovery link will be sent to ${email} if it's a valid email`)
    } catch (error: unknown) {
      toast.error("Something went wrong, please try again later")
    } finally {
      resetField(FormFields.EMAIL)
    }
  }

  return (
    <div className={style["recover-access"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={style["recover-access-form"]}>
        <div className={style["recover-access-form__title"]}>Recover Access</div>
        <div className={style["recover-access-form__info"]}>
          Insert the account email and an recovery link &apos;ll be sent to you
        </div>
        <div className={style["recover-access-form__field"]}>
          <label htmlFor={FormFields.EMAIL}>Email</label>
          <input {...register(FormFields.EMAIL)} placeholder={FormExamples[FormFields.EMAIL]} className={"input"} />
          {isSubmitted && errors[FormFields.EMAIL]?.message && (
            <span className={style["error-msg"]}>{errors[FormFields.EMAIL]?.message}</span>
          )}
        </div>
        <button type='submit' className={"btn"}>
          Recover
        </button>
      </form>
    </div>
  )
}

export { RecoverAccess }
