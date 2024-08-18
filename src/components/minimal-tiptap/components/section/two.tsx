import * as React from 'react'
import type { Editor } from '@tiptap/core'
import { cn } from '@/lib/utils'
import { Ellipsis, Bold, Italic } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ToolbarButton } from '../toolbar-button'
import { ShortcutKey } from '../shortcut-key'

interface FormatAction {
  label: string
  icon?: React.ReactNode
  action: (editor: Editor) => void
  isActive: (editor: Editor) => boolean
  canExecute: (editor: Editor) => boolean
  shortcut?: string[]
}

const formatActions: FormatAction[] = [
  {
    label: 'Bold',
    icon: <Bold className="size-4" />,
    action: editor => editor.chain().focus().toggleBold().run(),
    isActive: editor => editor.isActive('bold'),
    canExecute: editor => editor.can().chain().focus().toggleBold().run() && !editor.isActive('codeBlock')
  },
  {
    label: 'Italic',
    icon: <Italic className="size-4" />,
    action: editor => editor.chain().focus().toggleItalic().run(),
    isActive: editor => editor.isActive('italic'),
    canExecute: editor => editor.can().chain().focus().toggleItalic().run() && !editor.isActive('codeBlock')
  },
  {
    label: 'Strikethrough',
    action: editor => editor.chain().focus().toggleStrike().run(),
    isActive: editor => editor.isActive('strike'),
    canExecute: editor => editor.can().chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
    shortcut: ['mod', 'shift', 'S']
  },
  {
    label: 'Code',
    action: editor => editor.chain().focus().toggleCode().run(),
    isActive: editor => editor.isActive('code'),
    canExecute: editor => editor.can().chain().focus().toggleCode().run() && !editor.isActive('codeBlock'),
    shortcut: ['mod', 'E']
  },
  {
    label: 'Clear formatting',
    action: editor => editor.chain().focus().unsetAllMarks().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().unsetAllMarks().run() && !editor.isActive('codeBlock'),
    shortcut: ['mod', '\\']
  }
]

export const SectionTwo = ({ editor }: { editor: Editor }) => {
  const mainActions = formatActions.slice(0, 2)
  const dropdownActions = formatActions.slice(2)

  const renderToolbarButton = (action: FormatAction) => (
    <ToolbarButton
      key={action.label}
      onClick={() => action.action(editor)}
      disabled={!action.canExecute(editor)}
      isActive={action.isActive(editor)}
      tooltip={action.label}
      aria-label={action.label}
    >
      {action.icon}
    </ToolbarButton>
  )

  const renderDropdownMenuItem = (action: FormatAction) => (
    <DropdownMenuItem
      key={action.label}
      onClick={() => action.action(editor)}
      disabled={!action.canExecute(editor)}
      className={cn('flex flex-row items-center justify-between gap-4', { 'bg-accent': action.isActive(editor) })}
      aria-label={action.label}
    >
      <span className="grow">{action.label}</span>
      {action.shortcut && <ShortcutKey keys={action.shortcut} />}
    </DropdownMenuItem>
  )

  return (
    <>
      {mainActions.map(renderToolbarButton)}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            isActive={dropdownActions.some(action => action.isActive(editor))}
            tooltip="More formatting"
            aria-label="More formatting"
          >
            <Ellipsis className="size-4" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full" onCloseAutoFocus={event => event.preventDefault()}>
          {dropdownActions.map(renderDropdownMenuItem)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default SectionTwo
