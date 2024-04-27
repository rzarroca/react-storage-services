// Vendors
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from 'react'

export type ValuesType = {
  firstValue: string
  secondValue: string
}

const useValues = (initialValues: ValuesType) => {
  const [values, setValues] = useState<ValuesType>(initialValues)
  return {
    values,
    setValues
  } as const
}

const ValuesContext = createContext<ReturnType<typeof useValues> | null>(null)

const ValuesContextProvider: FC<
  PropsWithChildren<{ initialValues?: ValuesType }>
> = ({
  initialValues = {
    firstValue: '',
    secondValue: ''
  },
  children
}) => {
  const state = useValues(initialValues)
  return (
    <ValuesContext.Provider value={state}>
      <div className="border border-gray-200 p-8">
        <h2 className=" text-xl">Context Provider</h2>
        {children}
      </div>
    </ValuesContext.Provider>
  )
}

const useValuesContext = () => {
  const context = useContext(ValuesContext)
  if (!context) {
    throw new Error(
      'useValuesContext must be used within a ValuesContextProvider'
    )
  }
  return context
}

export { ValuesContextProvider, useValuesContext }
