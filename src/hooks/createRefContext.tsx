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

export default function createRefContext<StoreType>(initialState: StoreType) {
  type CallbackFunction = VoidFunction
  type UnsubscribeFunction = VoidFunction

  type useStoreReturnType = {
    get: () => StoreType
    set: (value: Partial<StoreType>) => void
    subscribe: (listener: CallbackFunction) => UnsubscribeFunction
  }

  const useStoreContext = (): useStoreReturnType => {
    const refstore = useRef<StoreType>(initialState)
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

  const StoreProvider: FC<PropsWithChildren> = ({ children }) => (
    <StoreContext.Provider value={useStoreContext()}>
      <div className="border border-gray-200 p-8">
        <h2 className=" text-xl">Context Provider</h2>
        {children}
      </div>
    </StoreContext.Provider>
  )

  function useStore<SelectorOutput>(
    selector: (store: StoreType) => SelectorOutput
  ): [SelectorOutput, (value: Partial<StoreType>) => void] {
    const store = useContext(StoreContext)
    if (!store) {
      throw new Error('useStore must be used inside StoreProvider')
    }

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    )

    return [state, store.set] as const
  }

  return { StoreProvider, useStore }
}
