/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL,
    },
    images: {
        domains: ['randomuser.me'],
    },
    compiler: {
        styledComponents: true
    }
}

module.exports = nextConfig
