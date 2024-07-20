import useLocalStorage from './useLocalStorage'

const USER_SESSION_KEY = 'USER_SESSION'

export const useUserStorage = () => {
  const { getItem, setItem, removeItem } = useLocalStorage(USER_SESSION_KEY)

  const set = (userSession: UserSession) => {
    setItem(userSession)
  }

  const get = (): UserSession | undefined => {
    const storageItem = getItem()
    return storageItem as UserSession
  }

  const remove = () => {
    removeItem()
  }
  return { set, get, remove }
}

export type UserSession = {
  id: string | undefined
  name: string
  token: string
  expirationDate: Date
}
