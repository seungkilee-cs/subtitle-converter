import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => setFiles(e.target.files);

  const handleConvert = () => Array.from(files).forEach(convertAndDownloadFile);

  const convertAndDownloadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => downloadConvertedFile(file, e.target.result);
    reader.readAsText(file);
  };

  const downloadConvertedFile = (file, content) => {
    const convertedContent = convertSmiToSrt(content);
    downloadFile(file.name.replace('.smi', '.srt'), convertedContent);
  };

  const convertSmiToSrt = (content) => content; // Placeholder function. Actual implementation would go here.

  const downloadFile = (filename, content) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', filename);
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="App">
      <h1 className="title">Subtitle Converter</h1>
      <input type="file" multiple onChange={handleFileChange} className="file-input"/>
      <button onClick={handleConvert} className="convert-button">Convert</button>
    </div>
  );
};

export default App;
