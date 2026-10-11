import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

// Launch Edge with remote debugging
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = 'C:\\Users\\Dilantha\\.gemini\\antigravity-ide\\brain\\10f7a1a3-57c7-4686-ba70-1c4a72231971\\scratch\\edge-profile';

const edge = spawn(edgePath, [
  '--remote-debugging-port=9222',
  `--user-data-dir=${userDataDir}`,
  '--headless',
  '--window-size=390,844',
  'http://localhost:5173'
]);

// Wait 1.5 seconds, then connect to CDP
setTimeout(async () => {
  try {
    const listRes = await fetch('http://localhost:9222/json');
    const tabs = await listRes.json();
    console.log('Tabs:', tabs.map(t => ({ title: t.title, url: t.url, id: t.id })));
    edge.kill();
  } catch (err) {
    console.error('Error:', err);
    edge.kill();
  }
}, 2000);
