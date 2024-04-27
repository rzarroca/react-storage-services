// Vendors
import { FC, FormEvent } from 'react'
// Types
import { ValuesType, useValuesContext } from 'contexts/values.context'

type ValueInputComponentPropsType = {
  id: keyof ValuesType
  label: string
}

const ValueInputComponent: FC<ValueInputComponentPropsType> = ({
  id,
  label
}) => {
  const { setValues } = useValuesContext()

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = data.get(id) as string
    setValues((values) => ({ ...values, [id]: value }))
    event.currentTarget.reset()
  }

  return (
    <form
      className="grid gap-1 border border-gray-200 p-8"
      onSubmit={handleOnSubmit}
    >
      <label htmlFor={id}>{label.slice(label.indexOf(' '))}</label>
      <input type="text" name={id} id={id} className="border" />
      <button className="rounded-sm bg-slate-400 px-5">{label}</button>
    </form>
  )
}

export default ValueInputComponent
