import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

import { Slider } from './ui/slider'
import { Wand2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SelectPrompt } from './SelectPrompt'
import { useFormStore } from '@/store/useFormStore'
import { useCompletion } from 'ai/react'

export function FormExecute() {
  const [temperature, setTemperature] = useState<number[]>([0.5])

  const [videoId, prompt, setResult] = useFormStore((state) => [
    state.videoId,
    state.prompt,
    state.setResult,
  ])

  const { handleSubmit, setInput, completion, isLoading } = useCompletion({
    api: 'http://localhost:3333/ia/complete',
    body: {
      videoId,
      prompt,
      temperature: temperature[0],
    },
    headers: {
      'Content-type': 'application/json',
    },
  })

  useEffect(() => {
    setInput(prompt)
  }, [prompt])

  useEffect(() => {
    setResult(completion)
  }, [completion])

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <SelectPrompt />

      <div className="space-y-2">
        <label htmlFor="modelo">Modelo</label>

        <Select>
          <SelectTrigger className="w-full" id="modelo" disabled>
            <SelectValue placeholder="GPT 3.5-turbo 16k" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground">
          Você poderá customizar essa coleção em breve.
        </p>
      </div>

      <Separator className="w-full" />

      <div className="space-y-2">
        <label
          htmlFor="temperature"
          className="w-full flex items-center justify-between"
        >
          Temperatura
          <p className="text-muted-foreground text-sm">{temperature}</p>
        </label>

        <Slider
          id="temperature"
          onValueChange={(value) => setTemperature(value)}
          value={temperature}
          min={0}
          max={1}
          step={0.1}
        />

        <p className="text-sm text-muted-foreground">
          alores mais autos tendem a deixar o resultado mais criativo e com
          possíveis erros.
        </p>
      </div>

      <Separator className="w-full" />

      <Button disabled={isLoading} type="submit" className="w-full gap-2">
        Executar ja <Wand2 className="w-5 h-5" />
      </Button>
    </form>
  )
}
