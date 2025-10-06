'use client';

import { useState } from 'react';
import MessageForm from './components/MessageForm';
import FileUpload from './components/FileUpload';
import ProgressTracker from './components/ProgressTracker';
import NumberList from './components/NumberList';

export default function Home() {
  const [numbers, setNumbers] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            WhatsApp Bulk Messenger
          </h1>
          <p className="text-gray-600">
            Send personalized bulk messages easily and efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <MessageForm 
              numbers={numbers}
              isSending={isSending}
              setIsSending={setIsSending}
              setProgress={setProgress}
            />
            
            <FileUpload 
              numbers={numbers}
              setNumbers={setNumbers}
            />
          </div>

          <div className="space-y-6">
            <ProgressTracker 
              total={numbers.length}
              progress={progress}
              isSending={isSending}
            />
            
            <NumberList 
              numbers={numbers}
              setNumbers={setNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}