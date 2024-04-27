// Vendors
import { FC } from 'react'
// Types
import { ValuesType } from 'containers/form/form.component'

type ValueBoardComponentPropsType = {
  label: string
  value: ValuesType[keyof ValuesType]
}

const ValueBoardComponent: FC<ValueBoardComponentPropsType> = ({
  label,
  value
}) => {
  return (
    <p data-testId={label}>
      {label}: {value || 'no value'}
    </p>
  )
}

export default ValueBoardComponent
