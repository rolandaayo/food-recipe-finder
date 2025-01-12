"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeSidebar from "../components/RecipeSidebar";
import { useFavorites } from "../context/FavoritesContext";

const ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const APP_ID = "3f53d4ef";
const APP_KEY = "6a4ba6f54568002d7c6dc33e340dcb59";
const TYPE = "public";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Build query parameters based on filters
        let queryParams = new URLSearchParams({
          type: TYPE,
          app_id: APP_ID,
          app_key: APP_KEY,
          q: "popular", // Default query
        });

        // Add diet filters
        if (filters.diet) {
          Object.keys(filters.diet).forEach((diet) => {
            if (filters.diet[diet]) {
              queryParams.append("diet", diet);
            }
          });
        }

        // Add meal type filters
        if (filters.mealType) {
          Object.keys(filters.mealType).forEach((meal) => {
            if (filters.mealType[meal]) {
              queryParams.append("mealType", meal);
            }
          });
        }

        // Add cuisine type filters
        if (filters.cuisine) {
          Object.keys(filters.cuisine).forEach((cuisine) => {
            if (filters.cuisine[cuisine]) {
              queryParams.append("cuisineType", cuisine.toLowerCase());
            }
          });
        }

        // Add calories filter
        if (filters.calories) {
          const [min, max] = filters.calories.split("-");
          if (max === "+") {
            queryParams.append("calories", `>${min}`);
          } else {
            queryParams.append("calories", `${min}-${max}`);
          }
        }

        const response = await fetch(
          `${ACCESS_POINT}?${queryParams.toString()}`
        );
        const data = await response.json();

        if (data.hits) {
          setRecipes(data.hits.map((hit) => hit.recipe));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex pt-16">
        <RecipeSidebar filters={filters} setFilters={setFilters} />

        <main className="flex-1 ml-64 p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                No recipes found
              </h2>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <div
                  key={`${recipe.uri}-${index}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <div className="relative h-48">
                      <Image
                        src={recipe.image}
                        alt={recipe.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={() =>
                        isFavorite(recipe.uri)
                          ? removeFromFavorites(recipe.uri)
                          : addToFavorites(recipe)
                      }
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      <svg
                        className={`w-6 h-6 ${
                          isFavorite(recipe.uri)
                            ? "text-red-500 fill-current"
                            : "text-white"
                        }`}
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

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {recipe.label}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {recipe.cuisineType?.map((cuisine, idx) => (
                        <span
                          key={`${cuisine}-${idx}`}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <Link
                        href={`/recipe/${encodeURIComponent(
                          recipe.uri.split("_")[1]
                        )}`}
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                      >
                        View Recipe
                      </Link>

                      <div className="text-sm text-gray-600">
                        {Math.round(recipe.calories)} cal
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
