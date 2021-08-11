import { useEffect, useRef } from 'react';

interface PreviewProps {
  inputCode: string;
  bundleStatus: string;
}
const html = ` 
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.getElementById('root');
            root.style.backgroundColor = '#333'
            root.style.color = '#eee'
            root.innerHTML = '<div style="padding: 1rem"><h4>Runtime Error</h4>'+ err +'</div>'
            console.error(err);
        }
        window.addEventListener('error', (e) => {
          e.preventDefault();
          handleError(e.error);
        })
        window.addEventListener('message', (e) => {
          try{
            eval(e.data);
          } catch(err) {
            handleError(err)
          }
        }, false)
      </script>
    </body>
  </html>
  `;
const CodePreview: React.FC<PreviewProps> = ({ inputCode, bundleStatus }) => {
  const previewFrame = useRef<any>();
  useEffect(() => {
    previewFrame.current.srcdoc = html;
    setTimeout(() => {
      previewFrame.current.contentWindow.postMessage(inputCode, '*');
    }, 75);
  }, [inputCode]);
  if (bundleStatus) {
    console.log(bundleStatus);
  }
  return (
    <div className='preview-wrapper'>
      {bundleStatus && (
        <div className='preview-error'>
          <div>
            <span role='alert'>Build Failed</span>
            <pre>{bundleStatus}</pre>
          </div>
        </div>
      )}
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
