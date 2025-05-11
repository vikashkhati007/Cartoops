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
    ],
  },
}

export default nextConfig;


