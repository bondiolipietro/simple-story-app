import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'

import style from './style.module.scss'

import { userService } from '../../services/UserService'
import { loginSuccess } from '../../store/slices/auth'
import { AppRoutes } from '../../constants/AppRoutes'
import { ErrorHandler } from '../../utils/ErrorHandler'

enum LoginFormFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

enum LoginFormErrors {
  EMAIL_REQUIRED = 'Email is required',
  EMAIL_INVALID = 'Email is invalid',
  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_MIN_LENGTH = 'Password must be at least 8 characters',
  PASSWORD_REQUIREMENTS = 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
}

type ILoginFormData = {
  [LoginFormFields.EMAIL]: string
  [LoginFormFields.PASSWORD]: string
}

const loginSchema = yup
  .object({
    [LoginFormFields.EMAIL]: yup
      .string()
      .required(LoginFormErrors.EMAIL_REQUIRED)
      .email(LoginFormErrors.EMAIL_INVALID),
    [LoginFormFields.PASSWORD]: yup
      .string()
      .required(LoginFormErrors.PASSWORD_REQUIRED)
      .min(8, LoginFormErrors.PASSWORD_MIN_LENGTH)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, LoginFormErrors.PASSWORD_REQUIREMENTS),
  })
  .required()

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid: isFormValid, isSubmitted },
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
      const { authToken, userId } = await userService.login(email, password)

      const user = await userService.getUserInfo(userId, authToken)

      dispatch(loginSuccess({ authToken, user }))

      navigate(AppRoutes.HOME)
    } catch (error: unknown) {
      const message = ErrorHandler.getErrorMessage(error)

      resetField(LoginFormFields.PASSWORD)
      resetField(LoginFormFields.EMAIL)

      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style['login-form']}>
      <div className={style['login-form__field']}>
        <label htmlFor={LoginFormFields.EMAIL}>Email</label>
        <input {...register(LoginFormFields.EMAIL)} className={style['input']} />
        {isSubmitted && errors[LoginFormFields.EMAIL]?.message && (
          <span className={style['error-msg']}>{errors[LoginFormFields.EMAIL]?.message}</span>
        )}
      </div>
      <div className={style['login-form__field']}>
        <label htmlFor={LoginFormFields.PASSWORD}>Password</label>
        <div className={style['password-input']}>
          <input
            {...register(LoginFormFields.PASSWORD)}
            type={shouldShowPassword ? 'text' : LoginFormFields.PASSWORD}
            autoComplete='off'
            className={style['input']}
          />
          <button
            type='button'
            onClick={toggleShouldShowPassword}
            className={style['hide-password-btn']}
          >
            {shouldShowPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {isSubmitted && errors[LoginFormFields.PASSWORD]?.message && (
          <span className={style['error-msg']}>{errors[LoginFormFields.PASSWORD]?.message}</span>
        )}
      </div>
      <button type='submit' className={style['submit-btn']}>
        Login
      </button>
      Don&apos;t have an account?
      <Link to={AppRoutes.SIGNUP} className={style['register-link']}>
        Register
      </Link>
    </form>
  )
}

export { Login }
