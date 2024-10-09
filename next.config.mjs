/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Экспорт проекта как статические файлы
    trailingSlash: true, // Добавляет слеш к каждому URL, что нужно для корректной работы на GitHub Pages
};

export default nextConfig;
