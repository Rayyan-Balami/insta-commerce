import * as React from 'react'
import './styles/index.css'

import { EditorContent } from '@tiptap/react'
import { Content, Editor } from '@tiptap/core'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SectionOne } from './components/section/one'
import { SectionTwo } from './components/section/two'
import { SectionThree } from './components/section/three'
import { SectionFour } from './components/section/four'
import { SectionFive } from './components/section/five'
import { LinkBubbleMenu } from './components/bubble-menu/link-bubble-menu'
import { ImageBubbleMenu } from './components/bubble-menu/image-bubble-menu'
import { useMinimalTiptapEditor, UseMinimalTiptapEditorProps } from './hooks/use-minimal-tiptap'

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate' | 'onBlur'> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="border-b border-border px-2 py-1">
    <div className="flex w-full flex-wrap items-center gap-2">
      <SectionOne editor={editor} />
      <Separator orientation="vertical" className="mx-2 h-7" />
      <SectionTwo editor={editor} />
      <Separator orientation="vertical" className="mx-2 h-7" />
      <SectionThree editor={editor} />
      <Separator orientation="vertical" className="mx-2 h-7" />
      <SectionFour editor={editor} />
      <Separator orientation="vertical" className="mx-2 h-7" />
      <SectionFive editor={editor} />
    </div>
  </div>
)

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props
    })

    const handleClick = () => {
      if (editor && !editor?.isFocused) {
        editor?.chain().focus().run()
      }
    }

    if (!editor) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-auto min-h-72 w-full flex-col rounded-md border border-input focus-within:border-primary bg-background',
          className
        )}
      >
        <Toolbar editor={editor} />

        <div onClick={handleClick}>
          <EditorContent editor={editor} className={cn('minimal-tiptap-editor text-sm px-3 py-2 min-h-10', editorContentClassName)} />
        </div>

        <LinkBubbleMenu editor={editor} />
        <ImageBubbleMenu editor={editor} />
      </div>
    )
  }
)

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor'

export default MinimalTiptapEditor
