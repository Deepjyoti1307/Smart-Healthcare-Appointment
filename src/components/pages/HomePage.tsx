'use client'

import React from 'react'
import { AuroraBackground } from '@/components/animation/AuroraBackground'
import { HeroHighlight, Highlight } from '@/components/ui/HeroHighlight'

const HomePage: React.FC = () => {
    return (
        <AuroraBackground className="min-h-screen">
            <HeroHighlight containerClassName="min-h-screen">
                <div className="text-center max-w-6xl mx-auto px-4">
                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-none">
                        <Highlight className="text-black dark:text-white">
                            Smart Healthcare
                        </Highlight>
                    </h1>
                    <p className="text-xl lg:text-2xl font-bold text-gray-300 mb-12 leading-relaxed">
                        Your AI Healthcare Assistant
                    </p>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Get Started
                    </button>
                </div>
            </HeroHighlight>
        </AuroraBackground>
    )
}

export default HomePage
