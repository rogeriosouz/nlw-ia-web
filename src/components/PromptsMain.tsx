import { useFormStore } from '@/store/useFormStore'
import { Textarea } from './ui/textarea'

export function PromptsMain() {
  const [prompt, setPrompt, result] = useFormStore((state) => [
    state.prompt,
    state.setPrompt,
    state.result,
  ])

  return (
    <div className="w-full flex-1 flex flex-col gap-3 pb-3">
      <div className="w-full grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="resize-none p-4"
          value={prompt}
          onChange={(v) => setPrompt(v.target.value)}
          placeholder="inclua o prompt para a IA..."
        />

        <Textarea
          className="resize-none p-4"
          placeholder="Resultado gerado pela IA..."
          readOnly
          value={result}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Lembre-se você pode utilizar a variável{' '}
        <code className="text-purple-500">{'{transcription}'}</code> no seu
        prompt para adicionar o conteúdo da transcrição do video selecionado
      </p>
    </div>
  )
}
