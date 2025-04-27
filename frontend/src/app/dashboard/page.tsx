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

function ProgressCircle({ label, progress, color }: { label: string; progress: number; color: string }) {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <svg className="w-20 h-20">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span className="mt-2 text-sm font-medium">{label}</span>
      <span className="text-gray-500 text-xs">{progress}%</span>
    </div>
  )
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [analytics, setAnalytics] = useState<any>(null)
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedMeal, setSelectedMeal] = useState<any>(null)

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

  const openModal = (meal: any) => {
    setSelectedMeal(meal)
  }

  const closeModal = () => {
    setSelectedMeal(null)
  }

  if (status === 'loading') return <p>Loading session...</p>
  if (status === 'unauthenticated') return <p>You must be logged in to view this page.</p>

  return (
    <div className="pb-20 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-sm m-6 border">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome, {session?.user?.name}</h1>
        <div className="flex items-center space-x-4">
          {session?.user?.image && (
            <img src={session.user.image} alt="User Profile" className="w-10 h-10 rounded-full object-cover border" />
          )}
          <button onClick={() => signOut()} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700">
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex gap-6 px-6">
        <div className="w-[30%] bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Calendar</h2>
          <iframe
            src={`https://calendar.google.com/calendar/embed?src=${session?.user?.email}&ctz=America%2FNew_York&mode=AGENDA`}
            style={{ border: 0, width: '100%', height: '90%' }}
            frameBorder="0"
          />
        </div>

        <div className="flex flex-col gap-6 w-[50%]">
          {/* Meal Analytics Section */}
          <div className="p-5 bg-white rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">Meal Analytics</h2>
            {analytics ? (
              <div className="flex flex-col items-center">
                <div className="flex space-x-10 mb-6">
                  <ProgressCircle label="Protein" progress={analytics.average_macros_per_meal.protein} color="text-blue-500" />
                  <ProgressCircle label="Carbs" progress={analytics.average_macros_per_meal.carbs} color="text-green-500" />
                  <ProgressCircle label="Fats" progress={analytics.average_macros_per_meal.fats} color="text-yellow-500" />
                </div>
                <div className="text-center text-gray-600 text-sm">
                  <p>Avg Calories: {analytics.average_calories_per_meal} kcal</p>
                  <p>Goal Tracking: {analytics.goal_tracking}</p>
                  <p>Popular Times: {analytics.most_popular_meal_times.join(", ")}</p>
                </div>
              </div>
            ) : (
              <p>Loading analytics...</p>
            )}
          </div>

          {/* Potential Meals Section */}
          <div className="p-5 bg-white rounded-xl shadow-sm border">
            <h2
              className="text-lg font-semibold text-gray-700 mb-6 cursor-pointer hover:underline"
              onClick={() => router.push('/meals')}
            >
              Potential Meals
            </h2>
            <div className="relative w-full overflow-hidden">
            <style jsx>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
              <div className="flex animate-scroll whitespace-nowrap" style={{ animation: 'scroll 20s linear infinite' }}>
                {[...meals, ...meals].map((meal, index) => (
                  <div
                    key={index}
                    onClick={() => openModal(meal)}
                    className="cursor-pointer flex-shrink-0 w-[220px] h-[220px] mx-2 bg-gray-50 rounded-xl shadow-sm flex flex-col justify-center items-center border border-gray-200"
                  >
                    <h3 className="text-base font-semibold text-gray-800">{meal.title}</h3>
                    <p className="mt-2 text-xs text-gray-600 text-center px-4">{meal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[20%] bg-white rounded-xl shadow-sm border p-5 flex flex-col h-[700px]">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Chat Assistant</h2>
          <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`text-${msg.role === 'user' ? 'right' : 'left'}`}>
                <div className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>{msg.content}</div>
              </div>
            ))}
          </div>
          <div className="flex mt-4">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
            />
            <button onClick={handleSend} className="ml-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium">
              Send
            </button>
          </div>
        </div>
      </div>

      {selectedMeal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-md">
            <h2 className="text-xl font-bold mb-4">{selectedMeal.title}</h2>
            <p className="mb-2">Ingredients: Example Ingredients...</p>
            <p>Recipe: Example recipe steps...</p>
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800 font-medium">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-white text-gray-700 border-t flex justify-around items-center h-16 z-50">
        <button onClick={() => router.push('/')} className="hover:text-gray-900">Home</button>
        <button onClick={() => router.push('/meals')} className="hover:text-gray-900">Meals</button>
        <button onClick={() => router.push('/grocerylist')} className="hover:text-gray-900">Grocery List</button>
        <button onClick={() => router.push('/profile')} className="hover:text-gray-900">Profile</button>
      </div>
    </div>
  )
}
