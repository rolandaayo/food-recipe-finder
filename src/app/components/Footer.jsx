'use client'

import React from 'react'
import Link from 'next/link'
import { useFavorites } from '../context/FavoritesContext'

export default function Footer() {
  const { favorites } = useFavorites()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white shadow-lg">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-orange-600 text-lg font-semibold mb-4">Recipe Finder</h3>
            <p className="text-gray-600 text-sm">
              Discover and save your favorite recipes from around the world. 
              Our collection includes dishes from various cuisines and dietary preferences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange-600 text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-700 hover:text-orange-600 transition-colors text-sm">
                  Saved Recipes ({favorites.length})
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-gray-700 hover:text-orange-600 transition-colors text-sm">
                  Popular Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-orange-600 text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.location.href = '/?category=breakfast'}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-sm"
                >
                  Breakfast
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.href = '/?category=lunch'}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-sm"
                >
                  Lunch
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.href = '/?category=dinner'}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-sm"
                >
                  Dinner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.href = '/?category=dessert'}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-sm"
                >
                  Desserts
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-orange-600 text-lg font-semibold mb-4">Stay Updated</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-gray-700 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              {currentYear} Recipe Finder. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
