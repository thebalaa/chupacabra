import { atom } from 'recoil'

export const loggedInState = atom<boolean>({
  key: 'LoggedIn',
  default: false,
})

export const loginErrorState = atom<string>({
  key: 'LoginError',
  default: '',
})
