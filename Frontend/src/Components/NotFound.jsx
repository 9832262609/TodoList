import React from 'react'

const NotFound = () => {
  return (
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
  <div class="text-center">
    <h1 class="text-6xl font-bold text-blue-500">404</h1>
    <p class="text-2xl font-semibold text-gray-800 mt-4">
      Oops! Page not found.
    </p>
    <p class="text-gray-600 mt-2">
      Sorry, the page you’re looking for doesn’t exist.
    </p>
    <a
      href="/"
      class="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      Go back to Homepage
    </a>
  </div>
  <div class="mt-8">
    <img
      src="https://via.placeholder.com/400x300?text=404+Image"
      alt="404 Illustration"
      class="max-w-md mx-auto"
    />
  </div>
</div>

  )
}

export default NotFound