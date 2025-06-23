import styles from '../../../../assets/modules/CodeBlockComponent.module.css'
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { LANGUAGE_VERSION } from '../../../../data/LanguageVersion'

const allowedLanguages = Object.keys(LANGUAGE_VERSION)

const CodeBlockElement: React.FC<NodeViewProps> = ({
  node: { attrs: { language: defaultLanguage } },
  updateAttributes,
  extension,
}) => (
  <NodeViewWrapper className={styles.codeBlock}>
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={event => updateAttributes({ language: event.target.value })}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight.listLanguages()
        .filter((lang: string) => allowedLanguages.includes(lang))
        .map((lang: string, index: number) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);

export default CodeBlockElement;