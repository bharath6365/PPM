import { RESET_ERRORS } from "./types"

export const resetFormErrors = () => {
  return {
    type: RESET_ERRORS
  }
}