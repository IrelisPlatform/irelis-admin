"use client"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { SerializedEditorState } from "lexical"

import { editorTheme } from "@/components/editor/themes/editor-theme"
import { nodes } from "@/components/blocks/editor-00/nodes"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"

type Props = {
    value: SerializedEditorState | null
    namespace: string
}

export function ReadonlyEditor({ value, namespace }: Props) {
    if (!value) return <p className="text-gray-600">Non spécifié</p>

    return (
        <LexicalComposer
            initialConfig={{
                namespace,
                theme: editorTheme,
                nodes,
                editable: false,
                editorState: typeof value === "string" ? value : JSON.stringify(value),
                onError(error) {
                    console.error(error)
                },
            }}
        >
            <RichTextPlugin
                contentEditable={<ContentEditable className="prose max-w-none" />}
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
            />
        </LexicalComposer>
    )
}
