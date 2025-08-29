'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Phone, Calendar, AlertTriangle, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
    conditions?: string[]
}

interface PossibleCondition {
    name: string
    probability: number
    severity: 'low' | 'medium' | 'high'
    description: string
}

const SymptomChecker: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '👋 Hi! I\'m your AI Health Assistant. Please describe your symptoms and I\'ll help analyze them. Remember, this is for guidance only - always consult a healthcare professional for proper diagnosis.',
            sender: 'bot',
            timestamp: new Date(),
        }
    ])
    const [inputText, setInputText] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [language, setLanguage] = useState('en')
    const [possibleConditions, setPossibleConditions] = useState<PossibleCondition[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const analyzeSymptoms = async (symptoms: string) => {
        try {
            setIsTyping(true)
            // Replace with your Flask API endpoint
            const response = await fetch('http://localhost:5000/analyze_symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms, language }),
            })

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error analyzing symptoms:', error)
            // Mock response for development
            return {
                response: 'Based on your symptoms, I understand you may be experiencing some discomfort. Here are some possible causes to consider:',
                conditions: [
                    { name: 'Common Cold', probability: 75, severity: 'low', description: 'Viral infection affecting nose and throat' },
                    { name: 'Allergic Reaction', probability: 45, severity: 'medium', description: 'Body\'s immune response to allergens' },
                    { name: 'Stress-related symptoms', probability: 30, severity: 'low', description: 'Physical symptoms caused by stress' }
                ]
            }
        } finally {
            setIsTyping(false)
        }
    }

    const handleSendMessage = async () => {
        if (!inputText.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        }

        setMessages(prev => [...prev, userMessage])
        const symptoms = inputText
        setInputText('')

        // Analyze symptoms with AI
        const analysis = await analyzeSymptoms(symptoms)

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: analysis.response,
            sender: 'bot',
            timestamp: new Date(),
            conditions: analysis.conditions?.map((c: any) => c.name)
        }

        setMessages(prev => [...prev, botMessage])
        setPossibleConditions(analysis.conditions || [])
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleVoiceInput = () => {
        if (!isRecording) {
            // Start recording
            setIsRecording(true)
            // Add voice recognition logic here
            setTimeout(() => {
                setIsRecording(false)
                setInputText('I have been experiencing headache and fever since yesterday')
            }, 3000)
        } else {
            setIsRecording(false)
        }
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'text-red-500 bg-red-500/10'
            case 'medium': return 'text-yellow-500 bg-yellow-500/10'
            case 'low': return 'text-green-500 bg-green-500/10'
            default: return 'text-gray-500 bg-gray-500/10'
        }
    }

    return (
        <div className="min-h-screen bg-black flex">
            {/* Main Chat Panel */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-gray-900 border-b border-gray-800 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                                🤖
                            </div>
                            <div>
                                <h1 className="text-white font-semibold">AI Symptom Checker</h1>
                                <p className="text-gray-400 text-sm">
                                    {isTyping ? 'AI is typing...' : 'Online • Ready to help'}
                                </p>
                            </div>
                        </div>

                        {/* Language Selector */}
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-1 text-sm"
                        >
                            <option value="en">🇺🇸 English</option>
                            <option value="es">🇪🇸 Spanish</option>
                            <option value="fr">🇫🇷 French</option>
                            <option value="hi">🇮🇳 Hindi</option>
                        </select>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] p-3 rounded-2xl ${message.sender === 'user'
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-800 text-white'
                                    }`}>
                                    <p className="whitespace-pre-line">{message.text}</p>
                                    <span className="text-xs opacity-60 mt-1 block">
                                        {message.timestamp.toLocaleTimeString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Typing indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-gray-800 p-3 rounded-2xl">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-t border-gray-800">
                    <div className="flex space-x-2 mb-4">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                            <Calendar className="w-4 h-4" />
                            <span>Find Doctor</span>
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Emergency Help</span>
                        </button>
                        <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                            <Phone className="w-4 h-4" />
                            <span>Book Appointment</span>
                        </button>
                    </div>

                    {/* Input Area */}
                    <div className="flex space-x-2">
                        <button
                            onClick={handleVoiceInput}
                            className={`p-3 rounded-lg border-2 transition-all ${isRecording
                                    ? 'bg-red-600 border-red-600 text-white animate-pulse'
                                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-emerald-500'
                                }`}
                        >
                            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>

                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Describe your symptoms..."
                            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                        />

                        <button
                            onClick={handleSendMessage}
                            disabled={!inputText.trim()}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:opacity-50 text-white p-3 rounded-lg transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Possible Conditions */}
            <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-800">
                    <h2 className="text-white font-semibold mb-2">Possible Conditions</h2>
                    <p className="text-gray-400 text-sm">AI analysis based on your symptoms</p>
                </div>

                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    {possibleConditions.length > 0 ? (
                        <AnimatePresence>
                            {possibleConditions.map((condition, index) => (
                                <motion.div
                                    key={condition.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-4 rounded-lg border-2 ${getSeverityColor(condition.severity)}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{condition.name}</h3>
                                        <span className="text-sm font-bold">{condition.probability}%</span>
                                    </div>
                                    <p className="text-sm opacity-80 mb-2">{condition.description}</p>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${condition.severity === 'high' ? 'bg-red-500' :
                                                    condition.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${condition.probability}%` }}
                                        ></div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div className="text-center text-gray-500 mt-8">
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                🔍
                            </div>
                            <p className="text-sm">Start describing your symptoms to see possible conditions</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t border-gray-800 space-y-2">
                    <h3 className="text-white font-medium mb-3">Quick Actions</h3>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                        🔍 Detailed Analysis
                    </button>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                        📋 Health Report
                    </button>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                        💡 Health Tips
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SymptomChecker
