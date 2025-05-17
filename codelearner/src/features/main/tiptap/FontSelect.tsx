import React from "react";
import { Form } from "react-bootstrap";
import { Editor } from "@tiptap/react";

interface FontOption {
  label: string;
  value: string;
  testId: string;
}

interface FontFamilyDropdownProps {
  editor: Editor;
}

const FontSelect: React.FC<FontFamilyDropdownProps> = ({ editor }) => {
  const fontOptions: FontOption[] = [
    { label: "Inter", value: "Inter", testId: "inter" },
    {
      label: "Comic Sans",
      value: '"Comic Sans MS", "Comic Sans"',
      testId: "comic-sans",
    },
    { label: "Serif", value: "serif", testId: "serif" },
    { label: "Monospace", value: "monospace", testId: "monospace" },
    { label: "Cursive", value: "cursive", testId: "cursive" },
    {
      label: "System-UI",
      value: "system-ui",
      testId: "system-ui",
    },
    { label: "Exo 2", value: '"Exo 2"', testId: "exo2" },
  ];

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "system-ui") {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(selectedValue).run();
    }
  };

  const currentFont =
    fontOptions.find((option) =>
      editor.isActive("textStyle", { fontFamily: option.value })
    )?.value || "system-ui";

  return (
    <div className="select-font-group ">
      <Form.Label className="fs-6 mb-0">Select font:</Form.Label>
      <Form.Select
        id="font-family-select"
        value={currentFont}
        onChange={handleSelect}
        data-test-id="font-family-select"
        size="sm"
      >
        {fontOptions.map((option) => (
          <option
            key={option.testId}
            value={option.value}
            data-test-id={option.testId}
          >
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default FontSelect;
