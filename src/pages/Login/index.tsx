import * as React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { toast } from "react-toastify"

import { AppRoutes } from "@/constants/AppRoutes"
import { InputField } from "@/components/InputField"
import { loginSuccess } from "@/store/slices/auth"
import { userService } from "@/services/api/user-service"
import { ErrorHelper } from "@/utils/error-util"
import { FormWarningsHelper } from "@/utils/form-warnings-util"
import { authService } from "@/services/api/auth-service"

import style from "./style.module.scss"

enum FormFields {
  EMAIL = "email",
  PASSWORD = "password",
}

type ILoginFormData = {
  [FormFields.EMAIL]: string
  [FormFields.PASSWORD]: string
}

const FormExamples = {
  [FormFields.EMAIL]: "john@gmail.com",
}

const loginSchema = yup
  .object({
    [FormFields.EMAIL]: yup
      .string()
      .required(FormWarningsHelper.requiredFieldMsg(FormFields.EMAIL))
      .email(FormWarningsHelper.invalidFieldMsg(FormFields.EMAIL)),
    [FormFields.PASSWORD]: yup
      .string()
      .required(FormWarningsHelper.requiredFieldMsg(FormFields.PASSWORD))
      .min(8, FormWarningsHelper.minLengthMsg(8, FormFields.PASSWORD))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, FormWarningsHelper.passwordRequirementsMsg(8)),
  })
  .required()

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    resetField,
  } = useForm<ILoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  // Show/Hide password logic
  const [shouldShowPassword, setShouldShowPassword] = React.useState(false)
  const toggleShouldShowPassword = () => {
    setShouldShowPassword(!shouldShowPassword)
  }

  const onSubmit = async (data: ILoginFormData) => {
    const { email, password } = data

    try {
      const loginResponse = await authService.login(email, password)

      const { _id } = loginResponse.data

      const { data: user } = await userService.getUserById(_id)

      dispatch(loginSuccess({ user }))

      navigate(AppRoutes.HOME)
    } catch (error: unknown) {
      const message = ErrorHelper.getErrorMessage(error)

      resetField(FormFields.PASSWORD)
      resetField(FormFields.EMAIL)

      toast.error(message)
    }
  }

  return (
    <div className={style["login"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={style["login-form"]}>
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
        <button type='submit' className={"btn"}>
          Login
        </button>
      </form>
      <div className={style["recover-password-section"]}>
        Forgot password?
        <Link to={AppRoutes.RECOVER_ACCESS} className={"link"}>
          Recover access
        </Link>
      </div>
      <div className={style["signup-section"]}>
        Don&apos;t have an account?
        <Link to={AppRoutes.SIGNUP} className={"link"}>
          Register now
        </Link>
      </div>
    </div>
  )
}

export { Login }
