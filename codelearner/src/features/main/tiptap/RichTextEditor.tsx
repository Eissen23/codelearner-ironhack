import React, { useEffect } from "react";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../../../assets/style/RichtextEdit.css";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlockElement from "./elements/CodeBlockElement";
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import typescript from 'highlight.js/lib/languages/typescript';
import kotlin from 'highlight.js/lib/languages/kotlin';
import php from 'highlight.js/lib/languages/php';

import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

lowlight.register('javascript', javascript);
lowlight.register('python', python);
lowlight.register('java', java);
lowlight.register('c', c);
lowlight.register('cpp', cpp);
lowlight.register('go', go);
lowlight.register('rust', rust);
lowlight.register('typescript', typescript);
lowlight.register('kotlin', kotlin);
lowlight.register('php', php);

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
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockElement)
        },
      }).configure({lowlight }),
    ],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html && html !== "<p></p>") {
        onUpdate(html);
      }
    },
    editable: editable,
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
