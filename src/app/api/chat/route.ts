import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with fallback handling
const getOpenAIClient = () => {
  try {
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
    return null;
  }
};

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();
    
    if (!openai || !process.env.OPENAI_API_KEY) {
      // If OpenAI client initialization failed or API key is missing, return a styled fallback response
      const fallbackResponses = [
        "I'll personally handle this request for you. My team has been notified and will execute with precision. Regards, Winknell Chivhayo",
        "Consider it done. I've instructed my private office to prioritize your request immediately. Regards, Winknell Chivhayo",
        "Your request has my full attention. I've allocated resources to address this with the excellence you deserve. Regards, Winknell Chivhayo",
        "I appreciate you bringing this to my attention. I'll oversee this matter personally to ensure your complete satisfaction. Regards, Winknell Chivhayo",
        "As always, your needs are my priority. I've initiated the necessary actions to fulfill your request promptly. Regards, Winknell Chivhayo"
      ];
      
      return NextResponse.json({ 
        message: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const message = response.choices[0]?.message?.content || 
      "I'll personally see to this matter immediately. Regards, Winknell Chivhayo";

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return NextResponse.json(
      { message: "I apologize for the technical inconvenience. Rest assured, I've been notified and will address your request personally. Regards, Winknell Chivhayo" }
    );
  }
}