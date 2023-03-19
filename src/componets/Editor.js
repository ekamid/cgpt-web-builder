import React, { useState } from "react";
import Preview from "./Preview";

const Editor = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  function updatePreview() {
    const iframe = document.getElementById("preview");
    const iframeContent = iframe.contentDocument;
    iframeContent.open();
    iframeContent.write(`${html}<style>${css}</style><script>${js}</script>`);
    iframeContent.close();
  }

  function handleHtmlChange(event) {
    setHtml(event.target.value);
    updatePreview();
  }

  function handleCssChange(event) {
    setCss(event.target.value);
    updatePreview();
  }

  function handleJsChange(event) {
    setJs(event.target.value);
    updatePreview();
  }

  return (
    <div>
      <header>
        <h1>Code Editor</h1>
      </header>
      <main>
        <div className="editor">
          <div className="code">
            <textarea
              value={html}
              onChange={handleHtmlChange}
              placeholder="Enter HTML code"
            />
            <textarea
              value={css}
              onChange={handleCssChange}
              placeholder="Enter CSS code"
            />
            <textarea
              value={js}
              onChange={handleJsChange}
              placeholder="Enter CSS code"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
