// Component
import FormComponent from 'containers/form'

function App() {
  return (
    <main className="grid place-content-center gap-2">
      <header className="text-center">
        <h1 className="text-2xl font-bold">Welcome!</h1>
        <p className="text-xl">
          This is the showcase app for faster context management
        </p>
      </header>

      <FormComponent />
    </main>
  )
}

export default App
