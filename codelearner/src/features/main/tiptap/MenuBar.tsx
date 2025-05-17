import { Editor } from "@tiptap/react";
import "../../../assets/style/RichtextEdit.css"; // Import your CSS for styling

/* eslint-disable @typescript-eslint/ban-ts-comment
 */
// @ts-ignore
import Highlight from "@tiptap/extension-highlight";
// @ts-ignore
import TextAlign from "@tiptap/extension-text-align";
import {
  BsHighlighter,
  BsJustify,
  BsParagraph,
  BsTextCenter,
  BsTextLeft,
  BsTextRight,
  BsTypeBold,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsListUl,
  BsListOl,
} from "react-icons/bs";

// Define the props interface for MenuBar
interface MenuBarProps {
  editor: Editor | null; // Editor can be null if not initialized
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const menuOption = [
    {
      icon: <BsTypeH1 />,
      onclick: () =>
        editor.chain().focus(null).toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <BsTypeH2 />,
      onclick: () =>
        editor.chain().focus(null).toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <BsTypeH3 />,
      onclick: () =>
        editor.chain().focus(null).toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <BsParagraph />,
      onclick: () => editor.chain().focus(null).setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <BsTypeBold />,
      onclick: () => editor.chain().focus(null).toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <BsTypeItalic />,
      onclick: () => editor.chain().focus(null).toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <BsTypeStrikethrough />,
      onclick: () => editor.chain().focus(null).toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <BsHighlighter />,
      onclick: () => editor.chain().focus(null).toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <BsListUl />,
      onclick: () => editor.chain().focus(null).toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <BsListOl />,
      onclick: () => editor.chain().focus(null).toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <BsTextLeft />,
      onclick: () => editor.chain().focus(null).setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <BsTextCenter />,
      onclick: () => editor.chain().focus(null).setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <BsTextRight />,
      onclick: () => editor.chain().focus(null).setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <BsJustify />,
      onclick: () => editor.chain().focus(null).setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
    },
  ];

  return (
    <div className="border border-3 rounded-2 bg-light p-1">
      {menuOption.map((option, index) => (
        <button
          type="button"
          className={`btn btn-sm ${option.pressed ? "btn-primary" : ""}`}
          key={index}
          onClick={option.onclick}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};

export default MenuBar;
