import { FieldError, FieldErrors, get } from "react-hook-form"

class FormUtil {
  static getFieldErrorMessage(errors: FieldErrors, field: string): string | undefined {
    return (get(errors, field) as FieldError)?.message
  }
}

export { FormUtil }
