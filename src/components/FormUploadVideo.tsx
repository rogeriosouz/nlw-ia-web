import { Separator } from './ui/separator'
import { FileUp, Upload } from 'lucide-react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { getFfmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { api } from '@/lib/api'
import { useFormStore } from '@/store/useFormStore'

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages = {
  converting: 'Convertendo...',
  generating: 'Transcrevendo...',
  uploading: 'Carregando...',
  success: 'Sucesso!',
}

export function FormUploadVideo() {
  const setVideoId = useFormStore((state) => state.setVideoId)
  const [videoFile, setVideoFile] = useState<File | null>()
  const [status, setStatus] = useState<Status>('waiting')
  const [prompt, setPrompt] = useState('')

  async function converterVideoToMp3(file: File) {
    setStatus('converting')
    const ffmpeg = await getFfmpeg()
    await ffmpeg.writeFile('input.mp4', await fetchFile(file))

    ffmpeg.on('progress', (progress) => {
      console.log(Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')
    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    return audioFile
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget

    if (!files) {
      return
    }

    const selectFile = files[0]
    setVideoFile(selectFile)
  }

  async function uploadVideo(e: FormEvent) {
    e.preventDefault()

    if (videoFile) {
      const audioFile = await converterVideoToMp3(videoFile)

      const data = new FormData()
      data.append('file', audioFile)

      setStatus('uploading')
      const response = await api.post('/videos', data)
      const videoId = response.data.video.id

      setStatus('generating')
      await api.post(`/videos/${videoId}/transcription`, {
        prompt,
      })

      setVideoId(videoId)
      setStatus('success')
    }
  }

  const previewVideo = useMemo(() => {
    if (!videoFile) {
      return
    }

    const url = URL.createObjectURL(videoFile)

    return url
  }, [videoFile])

  return (
    <form onSubmit={uploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="w-full relative overflow-hidden h-40 hover:bg-primary-foreground transition-all duration-200 ease-in-out rounded border border-dashed cursor-pointer flex items-center justify-center"
      >
        {previewVideo ? (
          <video
            src={previewVideo}
            controls={false}
            className="inset-0 absolute pointer-events-none"
          />
        ) : (
          <p className="text-muted-foreground flex flex-col items-center justify-center gap-1 text-sm">
            <FileUp className="w-5 h-5" />
            Selecione um video
          </p>
        )}
      </label>

      <input
        accept="video/*"
        onChange={handleFileInputChange}
        type="file"
        id="video"
        className="sr-only"
      />

      <Separator className="w-full" />

      <div className="space-y-2">
        <label htmlFor="transcription">Prompt de transcrição</label>
        <Textarea
          disabled={status !== 'waiting'}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          id="transcription"
          className="w-full h-24 resize-none"
          placeholder="eslint, prettier, tailwindcss"
        />
      </div>

      <Button
        data-success={status === 'success'}
        disabled={status !== 'waiting'}
        type="submit"
        className="w-full gap-2 data-[success=true]:bg-emerald-500"
      >
        {status === 'waiting' ? (
          <>
            Carregar video
            <Upload className="w-5 h-5" />
          </>
        ) : (
          <p className="text-base">{statusMessages[status]}</p>
        )}
      </Button>
    </form>
  )
}
