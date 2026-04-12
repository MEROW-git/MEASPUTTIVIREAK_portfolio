type RichContentProps = {
  html: string
}

export function RichContent({ html }: RichContentProps) {
  return <div className="prose-portfolio" dangerouslySetInnerHTML={{ __html: html }} />
}
