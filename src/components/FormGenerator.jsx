import React, { useState } from 'react';
import AceEditor from 'react-ace';
import './FormGenerator.css'

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';

const FormGenerator = () => {
  const [inputFields, setInputFields] = useState([{ type: 'text', label: 'Label' }]);
  const [hasButton, setHasButton] = useState(false);
  const [buttonText, setButtonText] = useState('Submit');
  const [formStyles, setFormStyles] = useState({ width: '400px', padding: '20px' });
  const [htmlCode, setHtmlCode] = useState(`<div style="width: 400px; padding: 20px;">
  <div><label for="Label">Label</label></div>
  <br/>
  <input type="text" name="Label" id="Label">
  <br/>
</div>`);
<br/>
  const [cssCode, setCssCode] = useState(`label {
  margin-bottom: 10px;
  margin-top: 10px;

}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom:10px;
  box-sizing: border-box;
}`);

  const handleAddField = () => {
    setInputFields([...inputFields, { type: 'text', label: 'Label' }]);
    const newHtml = inputFields.reduce((html, field) => {
      return html + `\n  <label for="${field.label}">${field.label}</label>\n  <input type="${field.type}" name="${field.label}" id="${field.label}">`;
    }, '<div style="width: 400px; padding: 20px;">');
    setHtmlCode(newHtml + '\n</div>');
  };

  const handleRemoveField = (index) => {
    setInputFields(inputFields.filter((field, i) => i !== index));
    const newHtml = inputFields.reduce((html, field, i) => {
      if (i !== index) {
        return html + `\n  <label for="${field.label}">${field.label}</label>\n  <input type="${field.type}" name="${field.label}" id="${field.label}">`;
      }
      return html;
    }, '<div style="width: 400px; padding: 20px;">');
    setHtmlCode(newHtml + '\n</div>');
  };

  const handleInputChange = (event, index) => {
    const newInputFields = [...inputFields];
    newInputFields[index][event.target.name] = event.target.value;
  setInputFields(newInputFields);
    const newHtml = inputFields.reduce((html, field) => {
      return html + `\n  <label for="${field.label}">${field.label}</label>\n  <input type="${field.type}" name="${field.label}" id="${field.label}">`;
    }, '<div style="width: 400px; padding: 20px;">');
    setHtmlCode(newHtml + '\n</div>');
  };

  const handleFormStylesChange = (event) => {
    setFormStyles({ ...formStyles, [event.target.name]: event.target.value });
    setHtmlCode(htmlCode.replace(/width: .*?;/, `width: ${formStyles.width};`).replace(/padding: .*?;/, `padding: ${formStyles.padding};`));
    setCssCode(cssCode.replace(/width: .*?;/, `width: ${formStyles.width};`).replace(/padding: .*?;/, `padding: ${formStyles.padding};`));
  };

  const handleToggleButton = () => {
    setHasButton(!hasButton);
    if (!hasButton) {
      setHtmlCode(htmlCode + `\n  <button>${buttonText}</button>`);
    } else {
      setHtmlCode(htmlCode.replace(`\n  <button>${buttonText}</button>`, ''));
    }
  };

  const handleButtonTextChange = (event) => {
    setButtonText(event.target.value);
    setHtmlCode(htmlCode.replace(`\n  <button>${buttonText}</button>`, `\n  <button>${event.target.value}</button>`));
  };

  return (
    <div className="form-generator">
      <div className="form-container mb-10">
        <h2>Form Preview</h2>
        <div
          className="form-preview"
          dangerouslySetInnerHTML={{ __html: htmlCode }}
        />
      </div>
      <div className="options-container mb-10">
        <h2>Form Options</h2>
        <h3>Input Fields</h3>
        {inputFields.map((field, index) => (
          <div key={index} className="input-field">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              value={field.type}
              onChange={(event) => handleInputChange(event, index)}
            >
              <option value="text">Text</option>
              <option value="password">Password</option>
              <option value="checkbox">Checkbox</option>
            </select>
<br/>
<br/>
            <label htmlFor="label">Label</label>
            <input
              type="text"
              name="label"
              id="label"
              value={field.label}
              onChange={(event) => handleInputChange(event, index)}
            />
            <button className='bb' onClick={() => handleRemoveField(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddField}>Add Field</button>
        <h3>Form Styles</h3>
        <div className="form-styles">
          <label htmlFor="width">Width</label>
          <input
            type="text"
            name="width"
            id="width"
            value={formStyles.width}
            onChange={handleFormStylesChange}
          />
<br/>
<br/>
          <label htmlFor="padding">Padding</label>
          <input
            type="text"
            name="padding"
            id="padding"
            value={formStyles.padding}
            onChange={handleFormStylesChange}
          />
        </div>
        <h3>Button</h3>
        <div className="button-options">
          <label htmlFor="has-button">Include Submit Button</label>
          <input
            type="checkbox"
            name="has-button"
            id="has-button"
            checked={hasButton}
            onChange={handleToggleButton}
          />
          <br/>
          <br/>
          <label htmlFor="button-text">Button Text:    </label>
          <input
            type="text"
            name="button-text"
            id="button-text"
            value={buttonText}
            onChange={handleButtonTextChange}
            disabled={!hasButton}
          />
        </div>
      </div>
      <div className="code-container">
        <h2>HTML Code</h2>
        <pre>
          <code>{htmlCode}</code>
        </pre>
        <h2>CSS Code</h2>
        <pre>
          <code>{cssCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default FormGenerator;
