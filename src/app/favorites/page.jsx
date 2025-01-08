'use client'

import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Favorite Recipes</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8">Start adding recipes to your favorites to see them here!</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((recipe) => (
              <div 
                key={recipe.uri} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View Recipe
                    </Link>
                    
                    <button
                      onClick={() => removeFromFavorites(recipe.uri)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
