import { atom } from 'recoil'

export const chatModalState = atom<boolean>({
  key: "ChatModalState",
  default: false
})
