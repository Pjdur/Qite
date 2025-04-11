import React from 'react';
import { ipcRenderer } from 'electron';
import FileExplorer from './components/FileExplorer';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import './styles/app.css';

const App = () => {
    const [currentFile, setCurrentFile] = React.useState(null);

    React.useEffect(() => {
        ipcRenderer.on('file-opened', (event, filePath) => {
            setCurrentFile(filePath);
        });

        return () => {
            ipcRenderer.removeAllListeners('file-opened');
        };
    }, []);

    return (
        <div className="app-container">
            <FileExplorer onFileSelect={setCurrentFile} />
            <Editor filePath={currentFile} />
            <Terminal />
        </div>
    );
};

export default App;