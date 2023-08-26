import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios'
export default function Home() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  const handleAudit = async () => {
    const response = await axios.post('/api/hello', { code });
    console.log(response)
    setResult(response.data.response);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-5">Smart Contract Auditor</h1>
        <textarea 
          className="w-full h-64 p-2 mb-5 bg-gray-800 text-white rounded border border-gray-700 font-mono" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
        />
        <button 
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600" 
          onClick={handleAudit}
        >
          Audit
        </button>
        <div className="mt-5">
          <ReactMarkdown>
            {result}
          </ReactMarkdown>  
        </div>
      </div>
    </div>
  );
}