/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatar.vercel.sh",
                port: "",
            }
        ]
    }
};

export default nextConfig;
