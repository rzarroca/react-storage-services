// Vendors
import { FC } from 'react'
// Components
import ValueInputComponent from 'components/value-input'
import ValueBoardComponent from 'components/value-board'
// Contexts
import { ValuesContextProvider } from 'contexts/values.context'

const FormComponent: FC = () => {
  return (
    <ValuesContextProvider>
      <article className="grid gap-3">
        <header className="border border-gray-200 p-8">
          <h3 className="text-lg">Form Test Component</h3>
          <ValueBoardComponent label="First Value" value={'firstValue'} />
          <ValueBoardComponent label="Second Value" value={'secondValue'} />
        </header>

        <div className="border border-gray-200 p-8">
          <header>
            <h3 className="text-lg">Form Updaters Components</h3>
          </header>
          <ValueInputComponent id="firstValue" label="Update First Value" />
          <ValueInputComponent id="secondValue" label="Update Second Value" />
        </div>
      </article>
    </ValuesContextProvider>
  )
}

export default FormComponent
