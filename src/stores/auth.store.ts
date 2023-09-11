import { create } from 'zustand'

export type Token = {
  accessToken: string
}

type AuthStore = Partial<Token> & {
  setAccessToken: (token: string) => void
  resetAccessToken: () => void
}

export const authStore = create<AuthStore>()((set) => ({
  setAccessToken: (t) => set({ accessToken: t }),
  resetAccessToken: () => set({ accessToken: undefined })
}))
