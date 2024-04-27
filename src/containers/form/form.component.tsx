// Vendors
import { FC, useState } from 'react'
// Components
import ValueInputComponent from 'components/value-input'
import ValueBoardComponent from 'components/value-board'

export type ValuesType = {
  firstValue: string
  secondValue: string
}

const FormComponent: FC = () => {
  const [values, setValues] = useState<ValuesType>({
    firstValue: '',
    secondValue: ''
  })

  const handleUpdateValue = (value: string, id: string) => {
    setValues({ ...values, [id]: value })
  }
  return (
    <article className="grid gap-3">
      <header className="text-center">
        <h2 className="text-lg">Form Test</h2>
        <ValueBoardComponent label="First Value" value={values.firstValue} />
        <ValueBoardComponent label="Second Value" value={values.secondValue} />
      </header>

      <ValueInputComponent
        id="firstValue"
        onClick={handleUpdateValue}
        label="Update First Value"
      />

      <ValueInputComponent
        id="secondValue"
        onClick={handleUpdateValue}
        label="Update Second Value"
      />
    </article>
  )
}

export default FormComponent
