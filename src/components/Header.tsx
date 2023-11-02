import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export function Header() {
  return (
    <header className="w-full px-6 py-3 border-b flex items-center justify-between">
      <h2 className="text-xl font-bold">upload.ia</h2>
      <div className="flex items-center gap-3">
        <p className="text-muted-foreground text-sm">
          desenvolvido com 💜 com a rocketseat
        </p>
        <Separator orientation="vertical" className="h-6" />
        <Button variant={'outline'} className="gap-2">
          <GitHubLogoIcon className="w-5 h-5" />
          Github
        </Button>
      </div>
    </header>
  )
}
