import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
    try {
        console.log('API Key available:', !!process.env.GEMINI_API_KEY)
        console.log('Environment variables:', Object.keys(process.env).filter(key => key.includes('GEMINI')))

        const { message } = await request.json()

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required and must be a string' },
                { status: 400 }
            )
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('Gemini API key not found in environment variables')

            // Provide a fallback response when API key is missing
            const fallbackResponse = getFallbackHealthResponse(message)
            if (fallbackResponse) {
                console.log('Using fallback response due to missing API key')
                return NextResponse.json({
                    response: fallbackResponse + "\n\n⚠️ Note: Using fallback response due to API configuration. Please contact support if this issue persists."
                })
            }

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

            if (error.message.includes('API key') || error.message.includes('API_KEY')) {
                errorMessage = 'API configuration error. Please check server setup.'
            }
        }

        // Try to provide a fallback response even on API error
        try {
            const { message } = await request.json()
            const fallbackResponse = getFallbackHealthResponse(message)
            if (fallbackResponse) {
                console.log('Using fallback response due to API error')
                return NextResponse.json({
                    response: fallbackResponse + "\n\n⚠️ Note: Using fallback response due to temporary service issues. Please try again later for AI-powered responses."
                })
            }
        } catch (fallbackError) {
            console.error('Fallback response error:', fallbackError)
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}

// Fallback responses for when Gemini API is unavailable
function getFallbackHealthResponse(message: string): string | null {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
        return "For headaches, try resting in a quiet, dark room and stay hydrated. Apply a cold or warm compress to your head or neck. If headaches are severe, frequent, or accompanied by other symptoms, please consult a healthcare professional. 🩺"
    }

    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
        return "For fever, rest and drink plenty of fluids. You can take over-the-counter fever reducers like acetaminophen or ibuprofen as directed. Seek immediate medical attention if fever is very high (104°F/40°C+) or accompanied by severe symptoms. 🌡️"
    }

    if (lowerMessage.includes('cough') || lowerMessage.includes('throat')) {
        return "For coughs and sore throats, try warm tea with honey, throat lozenges, and plenty of rest. Humidifiers can also help. If symptoms persist for more than a week or worsen, consult a healthcare provider. 🍯"
    }

    if (lowerMessage.includes('chest pain') || lowerMessage.includes('heart')) {
        return "⚠️ IMPORTANT: Chest pain can be serious. If you're experiencing chest pain, especially with shortness of breath, nausea, or arm pain, seek immediate medical attention or call emergency services. Don't delay medical care for chest pain."
    }

    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
        return "🚨 For medical emergencies, please call your local emergency number immediately (911 in the US). Don't rely on online advice for urgent medical situations. Get professional help right away."
    }

    // General health response
    return "I'm here to help with your health questions! For the best personalized advice, please consult with a healthcare professional. In the meantime, maintaining good hygiene, staying hydrated, getting adequate rest, and eating nutritious foods are always beneficial. 💙"
}
