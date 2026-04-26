import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, agent, revenue = 0 } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ success: false, error: 'message is required' }, { status: 400 });
    }

    const agentName = (typeof agent === 'string' && agent.trim()) ? agent.trim() : 'Helix';
    const timestamp = new Date().toLocaleTimeString();

    console.log(`🧬 [${timestamp}] ${agentName} → ${message}`);

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const revenueText = typeof revenue === 'number' && revenue > 0 ? `\n💰 \\+$${revenue}` : '';
      const text = `🧬 *${agentName}*\n${message}${revenueText}`;

      const tgRes = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'MarkdownV2',
          }),
        }
      );

      if (!tgRes.ok) {
        const err = await tgRes.text();
        console.error('Telegram error:', err);
      }
    }

    return NextResponse.json({ success: true, status: 'Message received', timestamp });
  } catch (error) {
    console.error('Bot message error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process message' }, { status: 500 });
  }
}
