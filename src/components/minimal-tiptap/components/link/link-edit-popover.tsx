import type { Editor } from '@tiptap/core'
import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Link } from 'lucide-react'
import { ToolbarButton } from '../toolbar-button'
import { LinkEditBlock } from './link-edit-block'
import { LinkProps } from '../../types'
import { setLink } from '../../utils'

const LinkEditPopover = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = React.useState(false)

  const onSetLink = (props: LinkProps) => {
    setLink(editor, props)
    editor.commands.enter()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive('link')}
          tooltip="Link"
          aria-label="Insert link"
          disabled={editor.isActive('codeBlock')}
        >
          <Link className="size-4" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent>
        <LinkEditBlock editor={editor} close={() => setOpen(false)} onSetLink={onSetLink} />
      </PopoverContent>
    </Popover>
  )
}

export { LinkEditPopover }
