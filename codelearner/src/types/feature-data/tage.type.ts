export interface TagData {
  value: string;
  [key: string]: any;
}

// types/feature-data/tage.type.ts
export interface TagifyInputProps {
  name: string;
  initialTags?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TagifyInstance {
  removeAllTags: () => void;
  addTags: (
    tags: string | string[] | { value: string; label: string }[],
    clearInput?: boolean,
    skipInvalid?: boolean
  ) => HTMLElement[];
  destroy: () => void;
  on: (
    event: string,
    callback: (e: CustomEvent<{ value: string }>) => void
  ) => TagifyInstance;
}
