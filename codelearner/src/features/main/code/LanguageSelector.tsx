import { Dropdown } from "react-bootstrap";
import { LANGUAGE_VERSION } from "../../../data/LanguageVersion";
interface LanguageSelectorProps {   
  language?: string;
  onChange?: (eventKey: any, event: Object) => any;
}

const defaultLanguages = Object.entries(LANGUAGE_VERSION)

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language , onChange }) => {
  return (
      <Dropdown onSelect={onChange}>
        <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
          {language}
        </Dropdown.Toggle>
        <Dropdown.Menu >
          {defaultLanguages.map(([lang, version]) => (
            <Dropdown.Item 
              key={lang} 
              eventKey={lang}
              active={lang === language}
            >
              {lang} - {version}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
  );
};

export default LanguageSelector;
