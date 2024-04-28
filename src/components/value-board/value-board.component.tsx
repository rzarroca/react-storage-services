// Vendors
import { FC } from 'react'
// Types
import { StoreType, useStoreContext } from 'contexts/ref-values.context'

type ValueBoardComponentPropsType = {
  label: string
  value: keyof StoreType
}

const ValueBoardComponent: FC<ValueBoardComponentPropsType> = ({
  label,
  value
}) => {
  const [values] = useStoreContext()
  return (
    <p className="border border-gray-200 p-8 text-center" data-testid={label}>
      {label}: {values[value] || 'no value'}
    </p>
  )
}

export default ValueBoardComponent
