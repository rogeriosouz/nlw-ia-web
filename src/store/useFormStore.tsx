import { create } from 'zustand'

interface UseFormStoreProps {
  prompt: string
  setPrompt: (prompt: string) => void
  videoId: string
  setVideoId: (videoId: string) => void
  result: string
  setResult: (result: string) => void
}

export const useFormStore = create<UseFormStoreProps>((set) => ({
  prompt: '',
  setPrompt: (prompt) => {
    return set({
      prompt,
    })
  },
  videoId: '',
  setVideoId: (videoId) => {
    return set({
      videoId,
    })
  },
  result: '',
  setResult: (result) => {
    return set({
      result,
    })
  },
}))
