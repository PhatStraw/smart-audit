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
  const [loading, setLoading] = useState(false); // Add loading state

  const handleAudit = async () => {
    setLoading(true); // Set loading to true when the request starts
    const response = await axios.post('/api/hello', { code });
    console.log(response);
    setResult(response.data.response);
    setLoading(false); // Set loading to false when the request finishes
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-5 text-teal-500">Smart Contract Auditor</h1>
        <AceEditor
          mode="solidity"
          theme="github"
          onChange={setCode}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={code}
          width='100%'
          className="w-100 h-64 p-2 mb-5 bg-gray-800 text-white rounded border border-gray-700 font-mono" 
        />
        <button 
          className="py-2 px-4 bg-teal-500 text-white rounded hover:bg-teal-600" 
          onClick={handleAudit}
          disabled={loading} // Disable the button when loading
        >
          {loading ? 'Loading...' : 'Audit'} 
        </button>
        <div className="mt-5">
          <ReactMarkdown className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
            {result}
          </ReactMarkdown>  
        </div>
      </div>
    </div>
  );
}