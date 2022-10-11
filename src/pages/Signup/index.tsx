import * as React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import { AppRoutes } from "@/constants/AppRoutes"
import { InputField } from "@/components/InputField"
import { loginSuccess } from "@/store/slices/auth"
import { userService } from "@/services/api/user-service"
import { StringHelper } from "@/utils/string-util"
import { FormWarningsHelper } from "@/utils/form-warnings-util"

import style from "./style.module.scss"

enum FormFields {
  NAME = "name",
  NICKNAME = "nickname",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

type IFormData = {
  [FormFields.NAME]: string
  [FormFields.NICKNAME]: string
  [FormFields.EMAIL]: string
  [FormFields.PASSWORD]: string
  [FormFields.CONFIRM_PASSWORD]: string
}

const FormExamples = {
  [FormFields.NAME]: "John Foo Bar",
  [FormFields.NICKNAME]: "dark shadow killer 12",
  [FormFields.EMAIL]: "john@gmail.com",
}

const FormSchema = yup
  .object({
    [FormFields.NAME]: yup
      .string()
      .required(FormWarningsHelper.requiredFieldMsg(FormFields.NAME))
      .min(8, FormWarningsHelper.minLengthMsg(8))
      .test("", FormWarningsHelper.onlyLettersMsg(FormFields.NAME), (value) =>
        value ? /^[a-zA-Z]+$/.test(StringHelper.removeWhitespace(value)) : false,
      ),
    [FormFields.NICKNAME]: yup
      .string()
      .required(FormWarningsHelper.requiredFieldMsg(FormFields.NICKNAME))
      .min(4, FormWarningsHelper.minLengthMsg(4, FormFields.NICKNAME))
      .max(32, FormWarningsHelper.maxLengthMsg(32, FormFields.NICKNAME)),
    [FormFields.EMAIL]: yup
      .string()
      .required(FormWarningsHelper.requiredFieldMsg(FormFields.EMAIL))
      .email(FormWarningsHelper.invalidFieldMsg(FormFields.EMAIL)),
    [FormFields.PASSWORD]: yup
      .string()
      .required(FormWarningsHelper.requiredFieldMsg(FormFields.PASSWORD))
      .min(8, FormWarningsHelper.passwordRequirementsMsg(8))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, FormWarningsHelper.passwordRequirementsMsg(8)),
    [FormFields.CONFIRM_PASSWORD]: yup
      .string()
      .oneOf([yup.ref(FormFields.PASSWORD), null], FormWarningsHelper.passwordMismatchMsg()),
  })
  .required()

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<IFormData>({
    resolver: yupResolver(FormSchema),
  })

  // Show hide password logic
  const [shouldShowPassword, setShouldShowPassword] = React.useState(false)
  const toggleShouldShowPassword = () => {
    setShouldShowPassword(!shouldShowPassword)
  }

  const [shouldShowConfirmPassword, setShouldShowConfirmPassword] = React.useState(false)
  const toggleShouldShowConfirmPassword = () => {
    setShouldShowConfirmPassword(!shouldShowConfirmPassword)
  }

  const onSubmit = async (data: IFormData) => {
    const { name, nickname, email, password } = data

    const newUserRequest = {
      name,
      nickname,
      email,
      password,
    }

    try {
      const {
        data: { _id },
      } = await userService.register(newUserRequest)

      const { data: user } = await userService.getUserById(_id)

      dispatch(loginSuccess({ user }))

      navigate(AppRoutes.HOME)
    } catch (error: unknown) {
      toast.error("Something went wrong, please try again later")
    }
  }

  return (
    <div className={style["signup"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={style["signup-form"]}>
        <InputField
          name={FormFields.NAME}
          label='Name'
          additionalErrorCondition={isSubmitted}
          error={errors.name?.message}
        >
          <input {...register(FormFields.NAME)} type={"text"} placeholder={FormExamples.name} className={"input"} />
        </InputField>
        <InputField
          name={FormFields.NICKNAME}
          label='Nickname'
          additionalErrorCondition={isSubmitted}
          error={errors.nickname?.message}
        >
          <input
            {...register(FormFields.NICKNAME)}
            type={"text"}
            placeholder={FormExamples.nickname}
            className={"input"}
          />
        </InputField>
        <InputField
          name={FormFields.EMAIL}
          label='Email'
          additionalErrorCondition={isSubmitted}
          error={errors.email?.message}
        >
          <input {...register(FormFields.EMAIL)} type={"email"} placeholder={FormExamples.email} className={"input"} />
        </InputField>
        <InputField
          name={FormFields.PASSWORD}
          label='Password'
          error={errors[FormFields.PASSWORD]?.message}
          additionalErrorCondition={isSubmitted}
        >
          <input
            {...register(FormFields.PASSWORD)}
            type={shouldShowPassword ? "text" : "password"}
            autoComplete='off'
            className={"input"}
          />
          <button type='button' onClick={toggleShouldShowPassword} className={"btn"}>
            {shouldShowPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </InputField>
        <InputField
          name={FormFields.CONFIRM_PASSWORD}
          label='Confirm password'
          error={errors[FormFields.CONFIRM_PASSWORD]?.message}
          additionalErrorCondition={isSubmitted}
        >
          <input
            {...register(FormFields.CONFIRM_PASSWORD)}
            type={shouldShowConfirmPassword ? "text" : "password"}
            autoComplete='off'
            className={"input"}
          />
          <button type='button' onClick={toggleShouldShowConfirmPassword} className={"btn"}>
            {shouldShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </InputField>
        <button type='submit' className={"btn"}>
          Register
        </button>
      </form>
    </div>
  )
}

export { Signup }
