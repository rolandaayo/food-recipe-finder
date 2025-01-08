'use client'

import React from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

export default function page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Header />
      <Body />
      <Footer />
    </main>
  )
}
