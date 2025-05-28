import { Form } from "react-bootstrap";
import { LANGUAGE_VERSION } from "../../../data/LanguageVersion";
interface LanguageSelectorProps {
  language?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const defaultLanguages = Object.entries(LANGUAGE_VERSION);

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onChange,
}) => {
  return (
    <Form.Select
      size="sm"
      value={language}
      onChange={onChange}
      id="language-selector"
      className="w-25 bg-black text-white"
    >
      {defaultLanguages.map(([lang, version]) => (
        <option key={lang} value={lang}>
          {version.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default LanguageSelector;
