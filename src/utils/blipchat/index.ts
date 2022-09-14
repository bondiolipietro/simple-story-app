/* eslint-disable @typescript-eslint/no-var-requires */
import { BlipChatConfig } from "../../config/BlipChatConfig"

const { BlipChat } = require("blip-chat-widget")

const blipchat = () => {
  const blipChat = new BlipChat()
    .withAppKey(BlipChatConfig.APP_KEY)
    .withButton({ color: BlipChatConfig.BUTTON_COLOR })
    .withCustomCommonUrl(BlipChatConfig.APP_COMMON_URL)
    .build()

  return blipChat
}

export { blipchat }
