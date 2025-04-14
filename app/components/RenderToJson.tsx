import { NodeHandler, NodeHandlers, TipTapRender } from "@troop.com/tiptap-react-render";

const doc: NodeHandler = (props: any) => {
    return <>{props.children}</>;
};

const paragraph: NodeHandler = (props: any) => {
    return <p>{props.children}</p>;
};

const text: NodeHandler = (props: any) => {
    if (!props.node.marks || props.node.marks.length === 0) {
        return <>{props.node.text}</>;
    }

    let content = <>{props.node.text}</>;

    [...props.node.marks].reverse().forEach((mark: any) => {
        if (mark.type === 'bold') {
            content = <strong>{content}</strong>;
        } else if (mark.type === 'italic') {
            content = <em>{content}</em>;
        } else if (mark.type === 'strike') {
            content = <s>{content}</s>;
        } else if (mark.type === 'code') {
            content = <code>{content}</code>;
        } else if (mark.type === 'link') {
            content = (
                <a
                    href={mark.attrs.href || '#'}
                    target={mark.attrs.target || '_blank'}
                    rel={mark.attrs.rel || 'noopener noreferrer'}
                >
                    {content}
                </a>
            );
        }
    });

    return content;
};

const heading: NodeHandler = (props: any) => {
    const level = props.node.attrs?.level || 1;
    switch (level) {
        case 1: return <h1>{props.children}</h1>;
        case 2: return <h2>{props.children}</h2>;
        case 3: return <h3>{props.children}</h3>;
        default: return <h4>{props.children}</h4>;
    }
};

const bulletList: NodeHandler = (props: any) => {
    return <ul>{props.children}</ul>;
};

const orderedList: NodeHandler = (props: any) => {
    return <ol>{props.children}</ol>;
};

const listItem: NodeHandler = (props: any) => {
    return <li>{props.children}</li>;
};

const blockquote: NodeHandler = (props: any) => {
    return <blockquote>{props.children}</blockquote>;
};

const codeBlock: NodeHandler = (props: any) => {
    return <pre><code>{props.children}</code></pre>;
};

const handlers: NodeHandlers = {
    doc,
    text,
    paragraph,
    heading,
    bulletList,
    orderedList,
    listItem,
    blockquote,
    codeBlock
};

export function RenderToJson({ data }: { data: any }) {
    if (!data) {
        return <p></p>;
    }

    return (
        <div className="prose dark:prose-invert max-w-none prose-p:leading-snug prose-headings:font-semibold prose-pre:bg-zinc-900 prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <TipTapRender handlers={handlers} node={data} />
        </div>
    );
}