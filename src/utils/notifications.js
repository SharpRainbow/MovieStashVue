import { useToast } from 'vue-toastification'

const toast = useToast()

export function notifySuccess(text) {
  toast.success(text)
}

export function notifyError(text) {
  toast.error(text)
}

export function notifyInfo(text) {
  toast.info(text)
}