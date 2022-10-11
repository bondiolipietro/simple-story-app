import { StringHelper } from "./string-util"

class FormWarningsHelper {
  static requiredFieldMsg = (fieldName?: string) => {
    return StringHelper.capitalizeFirstLetter(`${fieldName ?? "field"} is required`)
  }

  static invalidFieldMsg = (fieldName?: string) => {
    return `Invalid ${fieldName ?? "field"}`
  }

  static passwordMismatchMsg = () => {
    return "Passwords don't match"
  }

  static onlyLettersMsg = (fieldName: string) => {
    return StringHelper.capitalizeFirstLetter(`${fieldName} must contain only letters`)
  }

  static passwordRequirementsMsg = (minLength: number) => {
    return `Password must contain at least ${minLength} characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character`
  }

  static minLengthMsg = (minLength: number, fieldName?: string) => {
    return StringHelper.capitalizeFirstLetter(`${fieldName ?? "field"} must be at least ${minLength} characters long`)
  }

  static maxLengthMsg = (maxLength: number, fieldName?: string) => {
    return StringHelper.capitalizeFirstLetter(`${fieldName ?? "field"} must be at most ${maxLength} characters long`)
  }

  static nicknameCharactersMsg = () => {
    return "Nickname can only contain letters, numbers, underscores and dashes"
  }
}

export { FormWarningsHelper }
