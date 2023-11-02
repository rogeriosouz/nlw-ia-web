import { Separator } from './ui/separator'
import { FormUploadVideo } from './FormUploadVideo'
import { FormExecute } from './FormExecute'

export function Aside() {
  return (
    <aside className="w-80 space-y-6 pb-5">
      <FormUploadVideo />

      <Separator className="w-full" />

      <FormExecute />
    </aside>
  )
}
