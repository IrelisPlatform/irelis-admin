"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

// ⚠️ CKEditor doit être chargé dynamiquement
const CKEditor = dynamic(
    () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
    { ssr: false }
);

// ✅ Build officiel compatible Next.js
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export function RichTextEditor({ value, onChange, placeholder }: Props) {
    const config = useMemo(
        () => ({
            placeholder,
            toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "bulletedList",
                "numberedList",
                "|",
                "link",
                "|",
                "undo",
                "redo",
            ],
        }),
        [placeholder]
    );

    return (
        <div className="rounded-md border bg-background">
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={config}
                onChange={(_, editor) => {
                    onChange(editor.getData());
                }}
            />
        </div>
    );
}
