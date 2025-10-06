'use client';

import { useState } from 'react';

interface MessageFormProps {
  numbers: string[];
  isSending: boolean;
  setIsSending: (sending: boolean) => void;
  setProgress: (progress: number) => void;
}

export default function MessageForm({ numbers, isSending, setIsSending, setProgress }: MessageFormProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || numbers.length === 0) {
      alert('Please enter a message and add phone numbers');
      return;
    }

    setIsSending(true);
    setProgress(0);

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          numbers,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Successfully sent ${result.sentCount} messages. Failed: ${result.failedCount}`);
        setProgress(100);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert('Failed to send messages');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Compose Message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your message here..."
            disabled={isSending}
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {numbers.length} numbers ready
          </span>
          
          <button
            type="submit"
            disabled={isSending || numbers.length === 0 || !message.trim()}
            className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? 'Sending...' : 'Send Messages'}
          </button>
        </div>
      </form>
    </div>
  );
}