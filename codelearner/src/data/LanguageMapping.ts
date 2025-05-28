export const LANGUAGE_MAPPING: { [key: string]: number } = {
  javascript: 102,
  python: 109,
  java: 91,
  c: 103,
  cpp: 105,
  go: 106,
  rust: 108,
  typescript: 101,
  kotlin: 111,
  php: 98,
  python2: 70,
  python3: 71,
  cpp11: 52,
  java8: 62,
};

export const getLanguageKey = (code: number): string => {
  const entry = Object.entries(LANGUAGE_MAPPING).find(
    ([_, value]) => value === code
  );
  return entry ? entry[0] : "unknown";
};
