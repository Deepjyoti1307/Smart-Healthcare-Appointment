/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['example.com'],
    },
    env: {
        CUSTOM_KEY: 'my-value',
    },
}

module.exports = nextConfig