'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SavedRecipes from '../components/SavedRecipes'

export default function SavedRecipesPage() {
  return (
    <>
      <Navbar />
      <SavedRecipes />
      <Footer />
    </>
  )
}
