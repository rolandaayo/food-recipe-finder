'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  // Initialize state from localStorage if available, otherwise empty array
  const [favorites, setFavorites] = useState([])
  const [initialized, setInitialized] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem('recipeFavorites')
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error)
      } finally {
        setInitialized(true)
      }
    }

    loadFavorites()
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (initialized) {
      try {
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites))
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error)
      }
    }
  }, [favorites, initialized])

  const addToFavorites = (recipe) => {
    setFavorites(prev => {
      // Check if recipe is already in favorites
      const isExisting = prev.some(fav => fav.uri === recipe.uri)
      if (isExisting) return prev
      
      // Add new recipe to favorites
      return [...prev, recipe]
    })
  }

  const removeFromFavorites = (uri) => {
    setFavorites(prev => prev.filter(recipe => recipe.uri !== uri))
  }

  const isFavorite = (uri) => {
    return favorites.some(recipe => recipe.uri === uri)
  }

  const clearAllFavorites = () => {
    setFavorites([])
    try {
      localStorage.removeItem('recipeFavorites')
    } catch (error) {
      console.error('Error clearing favorites from localStorage:', error)
    }
  }

  // Don't render children until we've initialized favorites from localStorage
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite,
        clearAllFavorites,
        totalFavorites: favorites.length 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
