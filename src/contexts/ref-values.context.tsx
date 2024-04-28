// Hooks
import createRefContext from 'hooks/createRefContext'

export type StoreType = {
  firstValue: string
  secondValue: string
}

const { StoreProvider, useStore } = createRefContext<StoreType>({
  firstValue: '',
  secondValue: ''
})

export { StoreProvider, useStore }
