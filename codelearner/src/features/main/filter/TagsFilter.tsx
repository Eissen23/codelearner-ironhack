import React, { useRef, useEffect } from "react";
import Tagify, { TagData } from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import suggestions from "../../../data/Suggestion";
import {
  TagifyInputProps,
  TagifyInstance,
} from "../../../types/feature-data/tage.type";

const TagifyInput: React.FC<TagifyInputProps> = ({
  name,
  initialTags = [],
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tagifyRef = useRef<TagifyInstance | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const tagify = new Tagify(inputRef.current, {
        whitelist: suggestions,
        maxTags: 10,
        focusable: false,
        tagTextProp: "label",
        dropdown: {
          maxItems: 5,
          enabled: 0,
          closeOnSelect: true,
        },
        enforceWhitelist: false,
      }) as TagifyInstance;

      tagifyRef.current = tagify;

      tagify.removeAllTags();
      tagify.addTags(initialTags);

      tagify.on("change", (e: CustomEvent<{ value: string }>) => {
        const tags: string[] = JSON.parse(e.detail.value || "[]").map(
          (tag: TagData) => tag.value
        );
        if (onChange && inputRef.current) {
          // Create a synthetic ChangeEvent
          const syntheticEvent = new Event("change", {
            bubbles: true,
            cancelable: true,
          }) as unknown as React.ChangeEvent<HTMLInputElement>;
          Object.defineProperty(syntheticEvent, "target", {
            value: { name, value: tags },
            writable: false,
          });
          onChange(syntheticEvent);
        }
      });
    }

    return () => {
      tagifyRef.current?.destroy();
    };
  }, [name]);

  useEffect(() => {
    if (tagifyRef.current) {
      tagifyRef.current.removeAllTags();
      tagifyRef.current.addTags(initialTags);
    }
  }, [initialTags]);

  return (
    <input
      name={name}
      ref={inputRef}
      className="form-control"
      placeholder="Add tags..."
    />
  );
};

export default TagifyInput;
