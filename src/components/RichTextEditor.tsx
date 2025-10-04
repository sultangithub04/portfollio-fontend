// components/RichTextEditor.tsx
"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link"; // Optional - link support
import Image from "@tiptap/extension-image"; // Optional - image support
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Image,
      Placeholder.configure({ placeholder: "Write your post..." }),
    ],
    content: value ?? "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    // << IMPORTANT: avoid immediate render to prevent SSR/hydration mismatch >>
    // Tiptap will not render the editor output during SSR if this is false.
    immediatelyRender: false,
  });

  // When `value` changes from parent, update editor content (avoid infinite loop)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || "<p></p>", false); // false = don't emit transactions that trigger selection changes
    }
    // Don't destroy editor here — Tiptap's hook will clean up automatically when component unmounts.
  }, [editor, value]);

  return (
    <div className="border rounded-md p-2">
      {/* You can render a toolbar above if you want (see note below) */}
      {editor ? (
        <EditorContent editor={editor} className="prose max-w-none" />
      ) : (
        <div className="p-4 text-sm text-gray-500">Loading editor…</div>
      )}
    </div>
  );
}
