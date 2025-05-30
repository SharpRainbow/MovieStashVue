import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function notifySuccess(text) {
  toast.success(text, {
    position: toast.POSITION.TOP_RIGHT,
    theme: 'dark',
  })
}

export function notifyError(text) {
  toast.error(text, {
    position: toast.POSITION.TOP_RIGHT,
    theme: 'dark',
  })
}

export function notifyInfo(text) {
  toast.info(text, {
    position: toast.POSITION.TOP_RIGHT,
    theme: 'dark',
  })
}