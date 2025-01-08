'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useFavorites } from '../context/FavoritesContext'

export default function SavedRecipes() {
  const { favorites, removeFromFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Recipes</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl text-gray-700 mb-4">No saved recipes yet</h2>
            <p className="text-gray-600 mb-6">Start exploring and save your favorite recipes!</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Explore Recipes
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((recipe) => (
            <div 
              key={recipe.uri} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.label}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {recipe.label}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.cuisineType?.map((cuisine, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <Link
                    href={`/recipe/${encodeURIComponent(recipe.uri.split('_')[1])}`}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    View Recipe
                  </Link>
                  
                  <button
                    onClick={() => removeFromFavorites(recipe.uri)}
                    className="text-sm px-3 py-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
