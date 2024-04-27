// Vendors
import React, { FC } from 'react'
// Types
import { ValuesType } from 'components/form/form.component'

type ValueBoardComponentPropsType = {
  label: string
  value: ValuesType[keyof ValuesType]
}

const ValueBoardComponent: FC<ValueBoardComponentPropsType> = ({
  label,
  value
}) => {
  return (
    <p>
      {label}: {value || 'no value'}
    </p>
  )
}

export default ValueBoardComponent
