// Vendors
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore
} from 'react'

export type StoreType = {
  firstValue: string
  secondValue: string
}

type CallbackFunction = VoidFunction
type UnsubscribeFunction = VoidFunction

type useStoreReturnType = {
  get: () => StoreType
  set: (value: Partial<StoreType>) => void
  subscribe: (listener: CallbackFunction) => UnsubscribeFunction
}

const useStoreContext = (initialValues: StoreType): useStoreReturnType => {
  const refstore = useRef<StoreType>(initialValues)
  const listeners = useRef(new Set<CallbackFunction>())

  const get = useCallback(() => refstore.current, [])
  const set = useCallback((value: Partial<StoreType>) => {
    refstore.current = { ...refstore.current, ...value }
    listeners.current.forEach((listener) => listener())
  }, [])
  const subscribe = useCallback((listener: CallbackFunction) => {
    listeners.current.add(listener)
    return () => listeners.current.delete(listener)
  }, [])

  return {
    get,
    set,
    subscribe
  } as const
}

const StoreContext = createContext<ReturnType<typeof useStoreContext> | null>(
  null
)

const StoreProvider: FC<PropsWithChildren<{ initialValues?: StoreType }>> = ({
  initialValues = {
    firstValue: '',
    secondValue: ''
  },
  children
}) => (
  <StoreContext.Provider value={useStoreContext(initialValues)}>
    <div className="border border-gray-200 p-8">
      <h2 className=" text-xl">Context Provider</h2>
      {children}
    </div>
  </StoreContext.Provider>
)

const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  const state = useSyncExternalStore(context.subscribe, context.get)
  return [state, context.set] as const
}

export { StoreProvider, useStore }
