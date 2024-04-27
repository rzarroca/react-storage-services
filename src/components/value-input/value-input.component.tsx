// Vendors
import { FC, FormEvent } from 'react'
// Types
import { ValuesType } from 'containers/form/form.component'

type ValueInputComponentPropsType = {
  id: keyof ValuesType
  onClick: (value: string, id: string) => void
  label: string
}

const ValueInputComponent: FC<ValueInputComponentPropsType> = ({
  id,
  onClick,
  label
}) => {
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = data.get(id) as string
    onClick(value, id)
    event.currentTarget.reset()
  }

  return (
    <form className="grid gap-1" onSubmit={handleOnSubmit}>
      <label htmlFor={id}>{label}</label>
      <input type="text" name={id} id={id} className="border" />
      <button className="rounded-sm bg-slate-400 px-5">
        `Update ${label}`
      </button>
    </form>
  )
}

export default ValueInputComponent
