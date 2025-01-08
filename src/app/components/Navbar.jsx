'use client'

import React from 'react'
import Link from 'next/link'
import { useFavorites } from '../context/FavoritesContext'

export default function Navbar() {
  const { favorites } = useFavorites()

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
              Recipe Finder
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/recipes" 
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Browse Recipes
              </Link>
              <Link 
                href="/saved" 
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Saved Recipes {favorites.length > 0 && `(${favorites.length})`}
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              href="/recipes" 
              className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Browse
            </Link>
            <Link 
              href="/saved" 
              className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Saved ({favorites.length})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
