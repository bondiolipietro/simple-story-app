import { toast } from "react-toastify"

class ToastsHelper {
  static warnActionNeedAuthentification() {
    toast.warn("You need to be logged in to perform this action")
  }
}

export { ToastsHelper }
