import { useEffect } from 'react'
import { headerTitle } from '../atom/common'
import { useSetAtom } from 'jotai'

export const useTitle = (title) => {
  const setTitle = useSetAtom(headerTitle)

  useEffect(() => {
    setTitle(title || '')

    return () => setTitle(null)
  }, [])
}
