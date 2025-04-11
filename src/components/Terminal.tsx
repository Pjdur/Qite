import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';
import { ipcRenderer } from 'electron';

const TerminalComponent: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const fitAddon = new FitAddon();
    const xterm = new Terminal();

    useEffect(() => {
        if (terminalRef.current) {
            xterm.loadAddon(fitAddon);
            xterm.open(terminalRef.current);
            fitAddon.fit();

            xterm.onData(data => {
                ipcRenderer.send('terminal-input', data);
            });

            ipcRenderer.on('terminal-output', (event, data) => {
                xterm.write(data);
            });

            return () => {
                ipcRenderer.removeAllListeners('terminal-output');
            };
        }
    }, [xterm, fitAddon]);

    return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalComponent;