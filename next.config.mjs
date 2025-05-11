const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      // Add more domains if needed for other images
    ],
    unoptimized: true, // Add this for static exports
  },
}

export default nextConfig;


