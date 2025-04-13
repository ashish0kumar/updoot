"use client"

import { Button } from "@/components/ui/button";
import { Editor, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder';
import Link from "@tiptap/extension-link";

import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Code2,
    Link as LinkIcon
} from "lucide-react";

export const Menubar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-3 mt-5 px-2">
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={editor.isActive("bold") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Bold />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                variant={editor.isActive("italic") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Italic />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                variant={editor.isActive("strike") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Strikethrough />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Heading1 />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Heading2 />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                variant={editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Heading3 />
            </Button>

            <Button
                type="button"
                onClick={() => {
                    const url = prompt("Enter URL");
                    if (url) {
                        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                    }
                }}
                variant={editor.isActive("link") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <LinkIcon />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <List />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <ListOrdered />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Quote />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                variant={editor.isActive("code") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Code />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
                className="w-8 h-8 p-0"
            >
                <Code2 />
            </Button>
        </div>
    );
};

export function TiptapEditor({setJson, json}: {setJson: any, json: JSONContent | null}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                linkOnPaste: true,
                autolink: true,
            }),
            Placeholder.configure({
                placeholder: 'Body',
            }),
        ],
        content: json ?? "<p></p>",
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none prose-p:leading-snug prose-headings:font-semibold prose-pre:bg-zinc-900 prose-a:text-blue-600 dark:prose-a:text-blue-400'
            }
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            setJson(json);
        }
    });

    return (
        <div>
            <Menubar editor={editor} />
            <EditorContent
                editor={editor}
                className="rounded-lg border p-4 min-h-[150px] mt-2 bg-background text-foreground"
            />
        </div>
    );
}