"use client";

import React from "react";

export default function RecipeSidebar({ filters, setFilters }) {
  const dietTypes = [
    "balanced",
    "high-fiber",
    "high-protein",
    "low-carb",
    "low-fat",
    "low-sodium",
  ];

  const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

  const cuisineTypes = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ];

  const handleCaloriesChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      calories: value,
    }));
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [value]: !prev[type]?.[value],
      },
    }));
  };

  return (
    <div className="w-64 bg-white shadow-lg p-6 h-screen overflow-y-auto fixed">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Filter Recipes
      </h2>

      {/* Calories Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Calories</h3>
        <select
          value={filters.calories}
          onChange={handleCaloriesChange}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Any</option>
          <option value="0-300">Under 300</option>
          <option value="300-500">300-500</option>
          <option value="500-700">500-700</option>
          <option value="700-1000">700-1000</option>
          <option value="1000+">Over 1000</option>
        </select>
      </div>

      {/* Diet Types */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Diet</h3>
        <div className="space-y-2">
          {dietTypes.map((diet) => (
            <label key={diet} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.diet?.[diet] || false}
                onChange={() => handleCheckboxChange("diet", diet)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-600 capitalize">
                {diet.split("-").join(" ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Meal Types */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Meal Type</h3>
        <div className="space-y-2">
          {mealTypes.map((meal) => (
            <label key={meal} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.mealType?.[meal] || false}
                onChange={() => handleCheckboxChange("mealType", meal)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-600 capitalize">
                {meal}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Cuisine Types */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Cuisine</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {cuisineTypes.map((cuisine) => (
            <label key={cuisine} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.cuisine?.[cuisine] || false}
                onChange={() => handleCheckboxChange("cuisine", cuisine)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-600">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => setFilters({})}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
      >
        Clear All Filters
      </button>
    </div>
  );
}
