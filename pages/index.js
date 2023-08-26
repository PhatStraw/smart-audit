import React from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

export default function Home() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    setLoading(true);
    const response = await axios.post('/api/hello', { code });
    setResult(response.data.response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-5 text-blue-600">Smart Contract Auditor</h1>
        <div className="shadow-lg bg-white p-5 rounded-lg">
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={setCode}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            value={code}
            width='100%'
            className="w-full h-64 mb-5 rounded border border-gray-300"
            style={{ fontSize: '16px' }}
          />
          <button 
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600" 
            onClick={handleAudit}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Audit'} 
          </button>
        </div>
        <div className="mt-5 shadow-lg bg-white p-5 rounded-lg">
          <ReactMarkdown className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
            {result}
          </ReactMarkdown>  
        </div>
      </div>
    </div>
  );
}