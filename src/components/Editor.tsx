import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

const Editor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const editorInstance = useRef<any>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorInstance.current = monaco.editor.create(editorRef.current, {
                value: '// Start coding here...',
                language: 'javascript',
                theme: 'vs-dark',
                automaticLayout: true,
            });
        }

        return () => {
            if (editorInstance.current) {
                editorInstance.current.dispose();
            }
        };
    }, []);

    return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
};

export default Editor;