import { NextRequest, NextResponse } from 'next/server';
import { WhatsAppService } from '@/lib/puppeteer';

export async function POST(request: NextRequest) {
  try {
    const { message, numbers }: { message: string; numbers: string[] } = await request.json();

    if (!message || !numbers || numbers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message and numbers are required' },
        { status: 400 }
      );
    }

    const whatsapp = new WhatsAppService();
    await whatsapp.initialize();

    let sentCount = 0;
    let failedCount = 0;
    const results: { number: string; success: boolean; error?: string }[] = [];

    for (const number of numbers) {
      try {
        const success = await whatsapp.sendMessage(number, message);
        if (success) {
          sentCount++;
          results.push({ number, success: true });
        } else {
          failedCount++;
          results.push({ number, success: false, error: 'Failed to send message' });
        }
        // Small delay between messages
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        failedCount++;
        results.push({ number, success: false, error: (error as Error).message });
        console.error(`Error sending to ${number}:`, error);
      }
    }

    await whatsapp.close();

    return NextResponse.json({
      success: true,
      sentCount,
      failedCount,
      results
    });
  } catch (error) {
    console.error('API /api/send-message error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to send messages' },
      { status: 500 }
    );
  }
}