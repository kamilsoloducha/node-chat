import { useEffect, useRef } from 'react'

export const useEffectOnce = (effect: any, dependencies?: React.DependencyList) => {
  const destroyFunc = useRef<any>()
  const effectCalled = useRef(false)
  const renderAfterCalled = useRef(false)

  if (effectCalled.current) {
    renderAfterCalled.current = true
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFunc.current = effect()
      effectCalled.current = true
    }

    return () => {
      if (!renderAfterCalled.current) {
        return
      }
      if (destroyFunc.current) {
        destroyFunc.current()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies])
}
