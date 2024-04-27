// Vendors
import { FC } from 'react'
// Types
import { ValuesType, useValuesContext } from 'contexts/values.context'

type ValueBoardComponentPropsType = {
  label: string
  value: keyof ValuesType
}

const ValueBoardComponent: FC<ValueBoardComponentPropsType> = ({
  label,
  value
}) => {
  const { values } = useValuesContext()
  return (
    <p className="border border-gray-200 p-8 text-center" data-testId={label}>
      {label}: {values[value] || 'no value'}
    </p>
  )
}

export default ValueBoardComponent
