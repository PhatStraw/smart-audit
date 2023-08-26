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
        <h1 className="text-4xl font-bold mb-5 text-teal-500">Smart Contract Auditor</h1>
        <textarea 
          className="w-full h-64 p-2 mb-5 bg-gray-800 text-white rounded border border-gray-700 font-mono" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
        />
        <button 
          className="py-2 px-4 bg-teal-500 text-white rounded hover:bg-teal-600" 
          onClick={handleAudit}
        >
          Audit
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