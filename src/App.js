import React, { useState } from 'react';

function App() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  }

  const handleConvert = () => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const convertedContent = convertSmiToSrt(content); // Placeholder function
        downloadFile(file.name.replace('.smi', '.srt'), convertedContent);
      };
      reader.readAsText(file);
    });
  }

  const convertSmiToSrt = (content) => {
    // Placeholder function. Actual implementation would go here.
    return content;
  }

  const downloadFile = (filename, content) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="App">
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
}

export default App;
