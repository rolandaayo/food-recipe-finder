import React from 'react'

export const API_CONFIG = {
    BASE_URL: "https://api.edamam.com/api/recipes/v2",
    APP_ID: "3f53d4ef",
    APP_KEY: "6a4ba6f54568002d7c6dc33e340dcb59",
    TYPE: "public"
};

export const fetchRecipes = async (query) => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}?type=${API_CONFIG.TYPE}&q=${query}&app_id=${API_CONFIG.APP_ID}&app_key=${API_CONFIG.APP_KEY}`
        );
        const data = await response.json();
        return data.hits;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};

export default function Api() {
  return (
    <div>
      
    </div>
  )
}
