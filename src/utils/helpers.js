//extract html, css and javascript from the message
//in system message I defined how that ai will send the data
//there we instructed that the code will wrap by ---starthtml--- ---endhtml--- (html, for example)

const extractCode = (message) => {
  const regexHtml = /---starthtml---([\s\S]*?)---endhtml---/;
  const regexCss = /---startcss---([\s\S]*?)---endcss---/;
  const regexJs = /---startjs---([\s\S]*?)---endjs---/;

  const html = message.match(regexHtml) ? message.match(regexHtml)[1] : "";
  const css = message.match(regexCss) ? message.match(regexCss)[1] : "";
  const js = message.match(regexJs) ? message.match(regexJs)[1] : "";
  return { html, css, js };
};

const updatePreview = (codes) => {
  const iframe = document.getElementById("preview");
  const iframeContent = iframe.contentDocument;
  iframeContent.open();
  iframeContent.write(
    `<style>${codes.css}</style>${codes.html}<script>${codes.js}</script>`
  );
  iframeContent.close();
};

export { extractCode, updatePreview };
