'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, common } from 'lowlight'

import { Button } from '@/components/ui/button'

const lowlight = createLowlight(common)

type JournalEditorProps = {
  value: string
  onChange: (value: string) => void
}

export function JournalEditor({ value, onChange }: JournalEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'min-h-[320px] rounded-[1.25rem] border border-white/10 bg-slate-950/60 px-4 py-4 text-slate-100 focus:outline-none',
      },
    },
    onUpdate({ editor: nextEditor }) {
      onChange(nextEditor.getHTML())
    },
    immediatelyRender: false,
  })

  if (!editor) return null

  function addLink() {
    const currentEditor = editor
    if (!currentEditor) return
    const url = window.prompt('Enter a URL')
    if (!url) return
    currentEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  function addImage() {
    const currentEditor = editor
    if (!currentEditor) return
    const url = window.prompt('Paste an image URL')
    if (!url) return
    currentEditor.chain().focus().setImage({ src: url, alt: 'Journal image' }).run()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </Button>
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </Button>
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Button>
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet
        </Button>
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Numbered
        </Button>
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Quote
        </Button>
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code
        </Button>
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={addLink}>
          Link
        </Button>
        <Button type="button" variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5" onClick={addImage}>
          Image URL
        </Button>
      </div>
      <EditorContent editor={editor} />
      <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/30 p-4 text-xs text-slate-400">
        Tip: this editor stores HTML. For code snippets, switch to code block and paste commands like:
        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950 px-3 py-3 text-cyan-100">
          <code>{`npm install\nnpm run dev`}</code>
        </pre>
      </div>
    </div>
  )
}
