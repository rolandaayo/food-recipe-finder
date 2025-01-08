'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useFavorites } from '../../context/FavoritesContext'

const ACCESS_POINT = "https://api.edamam.com/api/recipes/v2"
const APP_ID = "3f53d4ef"
const APP_KEY = "6a4ba6f54568002d7c6dc33e340dcb59"
const TYPE = "public"

export default function RecipeDetails({ params }) {
  const recipeId = React.use(params).id
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${ACCESS_POINT}/${decodeURIComponent(recipeId)}?type=${TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}`
        )
        const data = await response.json()
        setRecipe(data.recipe)
      } catch (error) {
        console.error('Error fetching recipe details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (recipeId) {
      fetchRecipeDetails()
    }
  }, [recipeId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading recipe details...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600 mb-4">Recipe not found</p>
        <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to recipes
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 text-orange-600 hover:text-orange-700 transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to recipes
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative">
            <div className="relative h-[400px] lg:h-[500px] w-full">
              <Image
                src={recipe.image}
                alt={recipe.label}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Favorite Button */}
              <button
                onClick={() => isFavorite(recipe.uri) ? removeFromFavorites(recipe.uri) : addToFavorites(recipe)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <svg
                  className={`w-6 h-6 ${isFavorite(recipe.uri) ? 'text-red-500 fill-current' : 'text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">{recipe.label}</h1>
              <div className="flex flex-wrap gap-3">
                {recipe.cuisineType?.map((cuisine, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Ingredients */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
                  Ingredients
                </h2>
                <ul className="space-y-4">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-orange-600 mr-3 mt-1.5">•</span>
                      <span>{ingredient.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Right Column - Details */}
              <div>
                {/* Quick Facts */}
                <div className="bg-orange-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Facts</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Total Time</p>
                      <p className="text-xl font-semibold text-gray-800">{recipe.totalTime || 'N/A'} min</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Calories</p>
                      <p className="text-xl font-semibold text-gray-800">{Math.round(recipe.calories)}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Servings</p>
                      <p className="text-xl font-semibold text-gray-800">{recipe.yield}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Ingredients</p>
                      <p className="text-xl font-semibold text-gray-800">{recipe.ingredients.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
