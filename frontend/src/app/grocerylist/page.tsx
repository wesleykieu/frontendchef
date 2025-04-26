'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const meals = [
  {
    title: 'Pizza',
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Basil'],
  },
  {
    title: 'Tacos',
    ingredients: ['Tortillas', 'Ground Beef', 'Lettuce', 'Cheddar', 'Salsa'],
  },
  {
    title: 'Pasta',
    ingredients: ['Spaghetti', 'Marinara Sauce', 'Meatballs', 'Parmesan'],
  },
  {
    title: 'Salad',
    ingredients: ['Romaine Lettuce', 'Cherry Tomatoes', 'Cucumber', 'Croutons', 'Ranch Dressing'],
  },
  {
    title: 'Stir Fry',
    ingredients: ['Chicken Breast', 'Broccoli', 'Carrots', 'Soy Sauce', 'Rice'],
  },
]

export default function GroceryListPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null)

  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient))
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const handleAddToInstacart = () => {
    window.open('https://www.instacart.com/', '_blank')
  }

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'unauthenticated') return <p>You must be logged in to view this page.</p>

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Top Profile Section */}
      <div className="flex w-full p-6 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 text-gray-800">
        {/* Left side: Profile Pic + Info */}
        <div className="flex flex-col items-center w-1/3 space-y-4">
          <img
            src={session?.user?.image || 'https://via.placeholder.com/120'}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          <h2 className="text-3xl font-bold">{session?.user?.name || 'Grocery Planner'}</h2>
        </div>

        {/* Right side: Bio/Description */}
        <div className="flex flex-col justify-center w-2/3 pl-10">
          <h3 className="text-xl font-semibold mb-2">Your Grocery List</h3>
          <p className="text-md">
            Pick your ingredients easily and head to Instacart! 🛒
          </p>
        </div>
      </div>

      {/* Main Grocery Section */}
      <div className="flex flex-col items-center mt-8 px-4 w-full">
        <h2 className="text-2xl font-bold mb-6">Saved Meal</h2>

        {/* Meal + Ingredients Section */}
        <div className="flex flex-col gap-6 w-full max-w-4xl">
          {meals.map((meal) => (
            <div key={meal.title} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{meal.title}</h3>
                <button
                  onClick={() => setExpandedMeal(expandedMeal === meal.title ? null : meal.title)}
                  className="text-green-500 hover:underline"
                >
                  {expandedMeal === meal.title ? 'Hide Ingredients' : 'Show Ingredients'}
                </button>
              </div>

              {expandedMeal === meal.title && (
                <div className="mt-4 space-y-2">
                  {meal.ingredients.map((ingredient) => (
                    <div key={ingredient} className="flex items-center">
                      <input
                        type="checkbox"
                        id={ingredient}
                        checked={selectedIngredients.includes(ingredient)}
                        onChange={() => toggleIngredient(ingredient)}
                        className="mr-2"
                      />
                      <label htmlFor={ingredient}>{ingredient}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instacart Button */}
        <button
          onClick={handleAddToInstacart}
          className="mt-8 w-full max-w-md bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-xl font-semibold"
        >
          Open Instacart 🛒
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around items-center h-16 shadow-inner z-50">
        <button onClick={() => router.push('/dashboard')} className="hover:text-green-400">Home</button>
        <button onClick={() => router.push('/meals')} className="hover:text-green-400">Meals</button>
        <button onClick={() => router.push('/grocerylist')} className="hover:text-green-400">Grocery List</button>
        <button onClick={() => router.push('/profile')} className="hover:text-green-400">Profile</button>
      </div>
    </div>
  )
}
