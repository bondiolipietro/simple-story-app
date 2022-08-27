class BlipChatConfig {
  public static APP_KEY = process.env.BLIP_BOT_APP_KEY ?? "";

  public static APP_COMMON_URL = "https://chat.blip.ai/";

  public static BUTTON_COLOR = "#4292B4";
}

export { BlipChatConfig };
