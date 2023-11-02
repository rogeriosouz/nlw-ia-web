import { Header } from './components/Header'
import { Aside } from './components/Aside'
import { PromptsMain } from './components/PromptsMain'

export function App() {
  return (
    <div className="w-full flex flex-col min-h-screen gap-3">
      <Header />

      <main className="flex-1 h-full px-6 flex gap-5">
        <PromptsMain />

        <Aside />
      </main>
    </div>
  )
}
