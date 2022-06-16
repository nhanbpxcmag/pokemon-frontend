/* eslint-disable comma-dangle */
/* eslint-disable array-bracket-spacing */
/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ["raw.githubusercontent.com"],
    },
};

module.exports = nextConfig;