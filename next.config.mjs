  /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    i18n: {
      locales: ['en', 'kz', 'ru'],
      defaultLocale: 'kz',
      localeDetection: false,
    },
};

export default nextConfig;
