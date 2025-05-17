import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../../../assets/style/RichtextEdit.css";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";

type RichTextEditorProps = {
  content: string;
  onUpdate: (content: string) => void;
  editable: boolean;
};

const linkConfig = {
  defaultProtocol: "https",
  protocols: ["http", "https"],
  openOnClick: true,
  linkOnPaste: true,
  HTMLAttributes: {
    rel: "noopener noreferrer",
    target: null,
  },
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onUpdate,
  editable,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Link.configure(linkConfig),
      TextStyle,
      FontFamily,
    ],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html && html !== "<p></p>") {
        onUpdate(html);
      }
    },
    editable,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
      if (content && content !== editor.getHTML()) {
        editor.commands.setContent(content || "<p></p>");
      }
    }
  }, [editor, editable, content]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default RichTextEditor;
