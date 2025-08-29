import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
    try {
        console.log('API Key available:', !!process.env.GEMINI_API_KEY)

        const { message } = await request.json()

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required and must be a string' },
                { status: 400 }
            )
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('Gemini API key not found in environment variables')
            return NextResponse.json(
                { error: 'API configuration error. Please check server setup.' },
                { status: 500 }
            )
        }

        console.log('Attempting to generate content for message:', message.substring(0, 50) + '...')

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

        const healthSystemPrompt = `You are a professional AI health assistant for a Smart Healthcare platform. Your role is to:

1. Provide helpful, accurate, and compassionate healthcare guidance
2. Always remind users that your advice is for informational purposes only
3. Encourage users to consult with healthcare professionals for serious concerns
4. Be empathetic and supportive in your responses
5. Use appropriate medical terminology but explain it in simple terms
6. Never diagnose specific conditions, but help users understand their symptoms
7. Provide general health tips and wellness advice
8. Help users understand when to seek immediate medical attention

Guidelines:
- Keep responses concise but informative (under 200 words)
- Use emojis sparingly and appropriately (1-2 per response)
- Be professional yet warm and caring
- If asked about serious symptoms, always recommend consulting a healthcare provider
- For emergency situations, advise calling emergency services immediately
- Focus on general health education and wellness guidance

User message: ${message}`

        const result = await model.generateContent(healthSystemPrompt)
        const response = await result.response
        const text = response.text()

        console.log('Successfully generated response:', text.substring(0, 100) + '...')

        return NextResponse.json({
            response: text || "I'm here to help with your health questions. Could you please provide more details about your concern?"
        })

    } catch (error) {
        console.error('Gemini API Error Details:', error)

        let errorMessage = 'Failed to generate AI response. Please try again.'

        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                name: error.name
            })

            if (error.message.includes('API key')) {
                errorMessage = 'API configuration error. Please check server setup.'
            }
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
