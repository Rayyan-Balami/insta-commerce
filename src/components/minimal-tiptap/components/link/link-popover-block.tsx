import { Separator } from '@/components/ui/separator'
import { ToolbarButton } from '../toolbar-button'
import { Copy, Link, Unlink } from 'lucide-react'
import { useState } from 'react'

const LinkPopoverBlock = ({
  link,
  onClear,
  onEdit
}: {
  link: Record<string, unknown>
  onClear: () => void
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  const [copyTitle, setCopyTitle] = useState<string>('Copy')

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setCopyTitle('Copied!')
    navigator.clipboard.writeText(link.href as string)

    setTimeout(() => {
      setCopyTitle('Copy')
    }, 1000)
  }

  return (
    <div className="flex h-10 overflow-hidden rounded bg-background p-2 shadow-lg">
      <div className="inline-flex items-center gap-1">
        <ToolbarButton tooltip="Edit link" onClick={onEdit} className="w-auto px-2">
          Edit link
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="Open link in a new tab" onClick={() => window.open(link.href as string, '_blank')}>
          <Link className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="Clear link" onClick={onClear}>
          <Unlink className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          tooltip={copyTitle}
          onClick={handleCopy}
          tooltipOptions={{
            onPointerDownOutside: (e: Event) => {
              if (e.target === e.currentTarget) e.preventDefault()
            }
          }}
        >
          <Copy className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  )
}

export { LinkPopoverBlock }
