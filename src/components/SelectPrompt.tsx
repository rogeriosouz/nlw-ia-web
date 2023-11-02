import { useQuery } from 'react-query'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { api } from '@/lib/api'
import { useFormStore } from '@/store/useFormStore'

type PromptType = {
  id: string
  title: string
  tamplate: string
  createAt: string
}

export function SelectPrompt() {
  const setPrompt = useFormStore((state) => state.setPrompt)
  const { data, status } = useQuery<PromptType[]>(['prompts'], async () => {
    const response = await api.get('/prompts')
    return response.data
  })

  return (
    <div className="space-y-2">
      <label htmlFor="prompt">Prompt</label>

      <Select onValueChange={setPrompt}>
        <SelectTrigger className="w-full" id="prompt">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {status === 'success' && (
            <>
              {data.map((prompt) => (
                <SelectItem value={prompt.tamplate} key={prompt.id}>
                  {prompt.title}
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
