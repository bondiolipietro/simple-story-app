class AppConfig {
  public static APP_BASE_URL = process.env.REACT_APP_APP_BASE_URL ?? ""

  public static APP_BASE_PATH = process.env.REACT_APP_CLIENT_BASE_PATH ?? ""

  public static APP_URL = this.APP_BASE_URL + this.APP_BASE_PATH

  public static API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? ""

  public static API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH ?? ""

  public static API_URL = this.API_BASE_URL + this.API_BASE_PATH
}

export { AppConfig }
