type ErrorWithMessage = {
  message: string
}

class ErrorHandler {
  static isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as Record<string, unknown>).message === 'string'
    )
  }

  static toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (this.isErrorWithMessage(maybeError)) return maybeError

    try {
      return new Error(JSON.stringify(maybeError))
    } catch {
      return new Error(String(maybeError))
    }
  }

  static getErrorMessage(error: unknown): string {
    return this.toErrorWithMessage(error).message
  }
}

export { ErrorHandler }
