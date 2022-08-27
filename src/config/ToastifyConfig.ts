import { toast, ToastContainerProps } from "react-toastify";

const ToastifyConfig: ToastContainerProps = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 8000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  limit: 5,
  theme: "colored",
};

export { ToastifyConfig };
