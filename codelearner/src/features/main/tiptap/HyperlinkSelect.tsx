import { Editor } from "@tiptap/react";
import React, { useCallback } from "react";
import { BsLink45Deg, BsEraser } from "react-icons/bs";

const HyperlinkSelect: React.FC<{ editor: Editor }> = ({ editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="d-flex gap-2 align-items-center">
      <span className="fs-6">Hyperlink:</span>
      <button
        type="button"
        onClick={setLink}
        className={`btn btn-sm border ${
          editor.isActive("link") ? "btn-primary" : ""
        }`}
      >
        <BsLink45Deg />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        type="button"
        disabled={!editor.isActive("link")}
        className={`btn btn-sm border`}
      >
        <BsEraser />
      </button>
    </div>
  );
};

export default HyperlinkSelect;
