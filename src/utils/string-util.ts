class StringHelper {
  static truncateTextWithEllipsis(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..."
    }

    return text
  }

  static capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  static removeWhitespace(text: string): string {
    return text.replace(/\s/g, "")
  }
}

export { StringHelper }
