'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CommandConsole() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const handleExecute = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(data.output); // Display command output
      } else {
        setOutput(`Error: ${data.error}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center p-4 text-white">
      <main className="bg-purple-950 text-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Command Console</h1>
        <form onSubmit={handleExecute} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            required
            className="w-full text-gray-200 bg-purple-800"
          />
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Execute</Button>
        </form>
        {output && (
          <div className="mt-6 p-4 bg-purple-800 rounded-md text-gray-300 whitespace-pre-wrap">
            <h3 className="text-lg font-bold">Output:</h3>
            <pre>{output}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
