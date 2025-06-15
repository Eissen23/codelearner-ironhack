import { getLanguageKey } from "./LanguageMapping";

type language_version = {
  name: string;
  syntax: string;
};

export const LANGUAGE_VERSION: { [key: string]: language_version } = {
  javascript: { name: "Javascript (Node.Js 22.08.0)", syntax: "javascript" },
  python: { name: "Python (3.13.2)", syntax: "python" },
  java: { name: "Java (JDK 17.0.6)", syntax: "java" },
  c: { name: "C (GCC 14.1.0)", syntax: "c" },
  cpp: { name: "C++ (GCC 14.1.0)", syntax: "cpp" },
  go: { name: "Golang (1.22.0)", syntax: "go" },
  rust: { name: "Rust (1.85.0)", syntax: "rust" },
  typescript: { name: "TypeScript (5.6.2)", syntax: "typescript" },
  kotlin: { name: "Kotlin (2.1.10)", syntax: "kotlin" },
  php: { name: "PHP (8.3.11)", syntax: "php" },
  python2: { name: "Python2 (2.7.17)", syntax: "python" },
  python3: { name: "Python3 (3.8.1)", syntax: "python" },
  cpp11: { name: "C++ 11 (GCC 7.4.0)", syntax: "cpp" },
  java8: { name: "Java 8 (OpenJDK 13.0.1)", syntax: "java" },
};

export const getVersionName = (code: number) => {
  return LANGUAGE_VERSION[getLanguageKey(code)].name || "unknown";
};

export const getSyntax = (code: number) => {
  return LANGUAGE_VERSION[getLanguageKey(code)].syntax || "unknown";
};