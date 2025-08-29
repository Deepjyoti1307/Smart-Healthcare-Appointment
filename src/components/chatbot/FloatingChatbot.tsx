'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const FloatingChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot'; timestamp: string }>>([
        {
            text: 'Hello! I\'m your AI health assistant. How can I help you today?',
            sender: 'bot',
            timestamp: new Date().toISOString()
        }
    ])
    const { t } = useLanguage()

    const handleSendMessage = () => {
        if (!message.trim()) return

        const newMessage = {
            text: message,
            sender: 'user' as const,
            timestamp: new Date().toISOString()
        }

        setMessages(prev => [...prev, newMessage])
        setMessage('')

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                text: 'Thank you for your message. I\'m here to help with health-related questions. Could you please describe your symptoms in more detail?',
                sender: 'bot' as const,
                timestamp: new Date().toISOString()
            }
            setMessages(prev => [...prev, botResponse])
        }, 1000)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                    <MessageCircle className="h-6 w-6" />
                </button>
            ) : (
                <div className="bg-card border rounded-lg shadow-xl w-80 h-96 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium text-sm">Health Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] p-2 rounded-lg text-sm ${msg.sender === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-lg"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FloatingChatbot
