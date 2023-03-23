//extract html, css and javascript from the message
//in system message I defined how that ai will send the data
//instructed that the code will wrap by ---starthtml--- ---endhtml--- (html, for example)

const extractCode = (message: string) => {
  const regexHtml: RegExp = /---starthtml---([\s\S]*?)---endhtml---/;
  const regexCss: RegExp = /---startcss---([\s\S]*?)---endcss---/;
  const regexJs: RegExp = /---startjs---([\s\S]*?)---endjs---/;

  const html = message.match(regexHtml) ? message.match(regexHtml)[1] : "";
  const css = message.match(regexCss) ? message.match(regexCss)[1] : "";
  const js = message.match(regexJs) ? message.match(regexJs)[1] : "";
  return { html, css, js };
};

//updating preview
const updatePreview = (codes) => {
  const iframe: any = document.getElementById("preview"); //iframe with id 'preview' in Preview component
  const iframeContent: any = iframe.contentDocument;
  iframeContent.open();
  iframeContent.write(
    `<style>${codes.css}</style>${codes.html}<script>${codes.js}</script>` //write content in iFrame with the extracted code from message
  );
  iframeContent.close();
};

export { extractCode, updatePreview };
