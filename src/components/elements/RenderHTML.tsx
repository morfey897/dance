
function RenderHTML({ children, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (typeof children === 'string' && /<[^>]+>/.test(children.toString())) ?
    <div dangerouslySetInnerHTML={{ __html: String(children) }} {...props} /> :
    <div {...props}>{children}</div>;
}

export default RenderHTML;