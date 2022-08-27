import { AppConfig } from "../config/AppConfig";

class AppRoutes {
  public static ANY = "*";

  public static BASE = AppConfig.APP_BASE_PATH;

  public static HOME = "/home";

  public static LOGIN = "/login";

  public static RECOVER_ACCESS = "/recover-access";

  public static SIGNUP = "/signup";

  public static USER_AREA = "/user-area";

  public static PRIVACY_POLICY = `/privacy-policy`;
}

export { AppRoutes };
