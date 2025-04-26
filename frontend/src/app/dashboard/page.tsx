'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import backendAPI from '@/lib/axiosInstance'

const meals = [
  { title: 'Meal 1', description: 'Description of meal 1.' },
  { title: 'Meal 2', description: 'Description of meal 2.' },
  { title: 'Meal 3', description: 'Description of meal 3.' },
  { title: 'Meal 4', description: 'Description of meal 4.' },
]

// Progress Circle Component for Analytics
function ProgressCircle({ label, progress, color }: { label: string; progress: number; color: string }) {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <svg className="w-32 h-32">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="64"
          cy="64"
        />
        <circle
          className={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="64"
          cy="64"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span className="mt-2 text-lg font-semibold">{label}</span>
      <span className="text-gray-600">{progress}%</span>
    </div>
  )
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [currentMealIndex, setCurrentMealIndex] = useState(0)
  const [analytics, setAnalytics] = useState<any>(null)

  // Chatbot states
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMealIndex((prevIndex) => (prevIndex + 1) % meals.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await backendAPI.get("/user/analytics")
        setAnalytics(response.data.analytics)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      }
    }

    if (status === "authenticated") {
      fetchAnalytics()
    }
  }, [status])

  const handleSend = async () => {
    if (!newMessage.trim()) return

    setMessages((prev) => [...prev, { role: 'user', content: newMessage }])

    try {
      const response = await axios.post('http://127.0.0.1:8000/chatbot/', { prompt: newMessage })
      const aiReply = response.data.response

      setMessages((prev) => [...prev, { role: 'user', content: newMessage }, { role: 'ai', content: aiReply }])
    } catch (error) {
      console.error('Error sending message:', error)
    }

    setNewMessage('')
  }

  if (status === 'loading') return <p>Loading session...</p>
  if (status === 'unauthenticated') return <p>You must be logged in to view this page.</p>

  return (
    <div className="pb-20">
      <div className="flex p-6">
        {/* Left Side: Google Calendar */}
        <div className="w-1/3 pr-6 mt-1">
          <h2 className="text-xl font-semibold mb-4">Your Google Calendar</h2>
          <iframe
            src={`https://calendar.google.com/calendar/embed?src=${session?.user?.email}&ctz=America%2FNew_York&mode=AGENDA`}
            style={{
              border: 0,
              width: '100%',
              height: '90vh',
            }}
            frameBorder="0"
          />
        </div>

        {/* Right Side: Profile and Content */}
        <div className="flex flex-col w-2/3 space-y-6">
          {/* Profile Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Hello, {session?.user?.name}!</h1>
            <div className="flex items-center space-x-4">
              {session?.user?.image && (
                <img
                  src={session.user.image}
                  alt="User Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Analytics + Meals + Chat sections */}
          <div className="flex gap-6">
            {/* Analytics + Meals */}
            <div className="flex flex-col w-2/3 space-y-6">
              {/* Analytics Section */}
              <div id="analytics" className="p-6 bg-gray-100 rounded-xl shadow-md w-full">
                <h2 className="text-2xl font-semibold mb-6 text-gray-950">Your Meal Analytics</h2>
                {analytics ? (
                  <div className="flex flex-col items-center">
                    {/* Macro Progress Circles */}
                    <div className="flex space-x-12 mb-6">
                      <ProgressCircle label="Protein" progress={analytics.average_macros_per_meal.protein} color="text-blue-500" />
                      <ProgressCircle label="Carbs" progress={analytics.average_macros_per_meal.carbs} color="text-green-500" />
                      <ProgressCircle label="Fats" progress={analytics.average_macros_per_meal.fats} color="text-yellow-500" />
                    </div>

                    {/* Extra Stats */}
                    <div className="space-y-2 text-gray-800 text-center">
                      <p><strong>Average Calories per Meal:</strong> {analytics.average_calories_per_meal} kcal</p>
                      <p><strong>Goal Tracking:</strong> {analytics.goal_tracking}</p>
                      <p><strong>Most Popular Meal Times:</strong> {analytics.most_popular_meal_times.join(", ")}</p>
                    </div>
                  </div>
                ) : (
                  <p>Loading analytics...</p>
                )}
              </div>

              {/* Potential Meals Section */}
              <div id="meals" className="p-4 bg-gray-100 rounded-xl shadow-md w-[350px] h-[350px] overflow-hidden flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-950 text-center">Potential Meal</h2>
                {/* Meal Carousel */}
                <div className="relative overflow-hidden w-[220px] h-[220px]">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${currentMealIndex * 220}px)`,
                    }}
                  >
                    {meals.map((meal, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-[220px] h-[220px] p-4 bg-gray-300 rounded-lg shadow-md flex flex-col justify-center items-center text-gray-950"
                      >
                        <h3 className="font-semibold text-lg text-center">{meal.title}</h3>
                        <p className="mt-2 text-gray-700 text-center text-sm">{meal.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Bot Section */}
            <div id="chat" className="w-1/3 p-6 bg-gray-100 rounded-xl shadow-md flex flex-col h-[500px]">
              <h2 className="text-2xl font-semibold mb-4 text-gray-950">Chat Assistant</h2>

              {/* Chat messages */}
              <div className="flex-1 bg-white rounded-lg p-4 overflow-y-auto shadow-inner space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`text-${msg.role === 'user' ? 'right' : 'left'}`}>
                    <div className={`inline-block px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input + Send */}
              <div className="flex mt-4">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleSend}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around items-center h-16 shadow-inner z-50">
        <button onClick={() => router.push('/')} className="hover:text-blue-400">Home</button>
        <button onClick={() => router.push('/meals')} className="hover:text-blue-400">Meals</button>
        <button onClick={() => router.push('/grocery-list')} className="hover:text-blue-400">Grocery List</button>
        <button onClick={() => router.push('/profile')} className="hover:text-blue-400">Profile</button>
      </div>
    </div>
  )
}
