import { NodeHandler, NodeHandlers, TipTapRender } from "@troop.com/tiptap-react-render";

const doc: NodeHandler = (props) => {
    return <>{props.children}</>;
}

const paragraph: NodeHandler = (props) => {
    return <p>{props.children}</p>;
}

const text: NodeHandler = (props) => {
    return <span>{props.node.text}</span>;
}

const handlers: NodeHandlers = {
    doc: doc,
    text: text,
    paragraph: paragraph,
}

export function RenderToJson({data}: {data: any}) {
    return (
        <div className="prose dark:prose-invert max-w-none prose-p:leading-snug prose-headings:font-semibold prose-pre:bg-zinc-900 prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <TipTapRender handlers={handlers} node={data} />
        </div>
    )
}