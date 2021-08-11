import { useEffect, useRef } from 'react';

interface PreviewProps {
  inputCode: string;
}
const html = ` 
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (e) => {
          try{
            eval(e.data);
          } catch(err) {
            const root = document.getElementById('root');
            root.style.backgroundColor = '#333'
            root.style.color = '#eee'
            root.innerHTML = '<div style="padding: 1rem"><h4>Runtime Error</h4>'+ err +'</div>'
            console.error(err);
          }
        }, false)
      </script>
    </body>
  </html>
  `;
const CodePreview: React.FC<PreviewProps> = ({ inputCode }) => {
  const previewFrame = useRef<any>();
  useEffect(() => {
    previewFrame.current.srcdoc = html;
    previewFrame.current.contentWindow.postMessage(inputCode, '*');
  }, [inputCode]);
  return (
    <div className='preview-wrapper'>
      <iframe
        className='code-preview'
        ref={previewFrame}
        srcDoc={html}
        title='code-preview'
      />
    </div>
  );
};

export default CodePreview;
