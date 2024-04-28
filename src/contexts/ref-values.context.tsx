// Vendors
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

export type StoreType = {
  firstValue: string
  secondValue: string
}

type CallbackFunction = VoidFunction
type UnsubscribeFunction = VoidFunction

type useStoreReturnType = {
  store: () => StoreType
  setStore: (value: Partial<StoreType>) => void
  subscribe: (listener: CallbackFunction) => UnsubscribeFunction
}

const useStore = (initialValues: StoreType): useStoreReturnType => {
  const refstore = useRef<StoreType>(initialValues)
  const listeners = useRef(new Set<CallbackFunction>())

  const store = useCallback(() => refstore.current, [])
  const setStore = useCallback((value: Partial<StoreType>) => {
    refstore.current = { ...refstore.current, ...value }
    listeners.current.forEach((listener) => listener())
  }, [])
  const subscribe = useCallback((listener: CallbackFunction) => {
    listeners.current.add(listener)
    return () => listeners.current.delete(listener)
  }, [])

  return {
    store,
    setStore,
    subscribe
  } as const
}

const StoreContext = createContext<ReturnType<typeof useStore> | null>(null)

const StoreContextProvider: FC<
  PropsWithChildren<{ initialValues?: StoreType }>
> = ({
  initialValues = {
    firstValue: '',
    secondValue: ''
  },
  children
}) => (
  <StoreContext.Provider value={useStore(initialValues)}>
    <div className="border border-gray-200 p-8">
      <h2 className=" text-xl">Context Provider</h2>
      {children}
    </div>
  </StoreContext.Provider>
)

const useStoreContext = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error(
      'useStoreContext must be used within a StoreContextProvider'
    )
  }
  const [state, setState] = useState<StoreType>(context.store())
  useEffect(() => {
    const unsubscribe = context.subscribe(() => setState(context.store()))
    return () => unsubscribe()
  })

  return [state, context.setStore] as const
}

export { StoreContextProvider, useStoreContext }
