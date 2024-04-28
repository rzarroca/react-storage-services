// Vendors
import { FC, useCallback } from 'react'
// Types
import { useStore } from 'contexts/ref-values.context'

const SwapperButtonComponent: FC = () => {
  const [, setStore] = useStore(() => null)

  const handleClick = useCallback(
    () =>
      setStore((store) => ({
        firstValue: store.secondValue,
        secondValue: store.firstValue
      })),
    [setStore]
  )

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-sm bg-slate-400 px-5"
    >
      Switch Values
    </button>
  )
}

export default SwapperButtonComponent
