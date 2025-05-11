'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'

interface Message {
  type: 'user' | 'bot'
  text: string
}

interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

export default function ProductChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', text: 'Hello! I can help you check product availability. What are you looking for?' }
  ])
  const [input, setInput] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { type: 'user' as const, text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simple search logic
    const searchTerms = input.toLowerCase().split(' ')
    const matchedProducts = products.filter(product =>
      searchTerms.some(term =>
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      )
    )

    let botResponse = ''
    if (matchedProducts.length > 0) {
      botResponse = `I found ${matchedProducts.length} products matching your search:\n\n${matchedProducts
        .slice(0, 3)
        .map(p => `- ${p.title} ($${p.price})`)
        .join('\n')}`
      if (matchedProducts.length > 3) {
        botResponse += '\n\n...and more. Can you be more specific about what you\'re looking for?'
      }
    } else {
      botResponse = "I couldn't find any products matching your description. Try using different keywords or ask about a specific category."
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }])
    }, 500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-xl w-[360px] max-w-[calc(100vw-2rem)] border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Product Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={chatRef}
            className="p-4 h-[400px] overflow-y-auto space-y-4 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] ${message.type === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'}`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about product availability..."
                className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSend}
                className="p-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}