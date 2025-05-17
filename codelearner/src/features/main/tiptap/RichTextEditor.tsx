import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../../../assets/style/RichtextEdit.css";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

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
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
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
    }
  }, [editable, editor]);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default RichTextEditor;
