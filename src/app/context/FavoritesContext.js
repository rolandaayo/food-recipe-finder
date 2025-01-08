'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (recipe) => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.uri === recipe.uri)) {
        return [...prev, recipe]
      }
      return prev
    })
  }

  const removeFromFavorites = (recipeUri) => {
    setFavorites(prev => prev.filter(recipe => recipe.uri !== recipeUri))
  }

  const isFavorite = (recipeUri) => {
    return favorites.some(recipe => recipe.uri === recipeUri)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
