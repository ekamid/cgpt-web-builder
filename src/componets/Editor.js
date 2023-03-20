import React, { useEffect, useState } from "react";
import Generator from "@/componets/Generator";

const Editor = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  function updatePreview() {
    const iframe = document.getElementById("preview");
    const iframeContent = iframe.contentDocument;
    iframeContent.open();
    iframeContent.write(`<style>${css}</style>${html}<script>${js}</script>`);
    iframeContent.close();
  }

  function handleHtmlChange(event) {
    setHtml(event.target.value);
  }

  function handleCssChange(event) {
    setCss(event.target.value);
  }

  function handleJsChange(event) {
    setJs(event.target.value);
  }

  const handleCurrentBuild = (message) => {
    extractCode(message);
  };

  const extractCode = (message) => {
    const regexHtml = /---starthtml---([\s\S]*?)---endhtml---/;
    const regexCss = /---startcss---([\s\S]*?)---endcss---/;
    const regexJs = /---startjs---([\s\S]*?)---endjs---/;

    const html = message.match(regexHtml) ? message.match(regexHtml)[1] : "";
    const css = message.match(regexCss) ? message.match(regexCss)[1] : "";
    const js = message.match(regexJs) ? message.match(regexJs)[1] : "";
    setHtml(html);
    setCss(css);
    setJs(js);

    // updatePreview();
  };

  useEffect(() => {
    updatePreview();
  }, [html, css, js]);

  return (
    <div>
      <header>
        <h1>Code Editor</h1>
        <Generator handleCurrentBuild={handleCurrentBuild} />
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
