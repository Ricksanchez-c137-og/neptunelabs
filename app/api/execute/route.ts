// app/api/execute/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { command } = await req.json();

    if (!command) {
      return NextResponse.json({ error: 'No command provided' }, { status: 400 });
    }

    // Vulnerable to command injection
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      return NextResponse.json({ error: stderr }, { status: 400 });
    }

    return NextResponse.json({ output: stdout }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
