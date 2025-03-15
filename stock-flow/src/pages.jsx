import React from "react";

const StockFlowLogin = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover filter grayscale">
        <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
      </video>

      {/* Logo */}
      <div className="absolute top-4 left-4 flex items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-lg text-lg font-bold">
            Sf.
          </div>
          <span className="ml-2 text-lg font-bold text-shadow-lg">STOCKFLOW</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-4xl p-8 items-center justify-between">
        {/* Left Side - Welcome Message */}
        <div className="w-1/2 text-left">
          <h1 className="text-4xl font-bold text-shadow-lg">Welcome to <br />StockFlow!</h1>
          <p className="text-lg text-gray-300 mt-2 text-shadow-md">Precision Inventory Management For Modern Enterprises</p>
        </div>

        {/* Separator Line with Fading Ends (Increased Length) */}
        <div className="w-px h-80 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4 text-shadow-lg">Login</h2>
          <form className="w-3/4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 bg-transparent text-white rounded-md mb-4 placeholder-gray-300 text-shadow-md"
              placeholder="Username"
              required
            />
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 bg-transparent text-white rounded-md mb-4 placeholder-gray-300 text-shadow-md"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-bold hover:bg-grey-800 text-shadow-md"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockFlowLogin;