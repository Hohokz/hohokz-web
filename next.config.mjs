/** @type {import('next').NextConfig} */
const nextConfig = {
  // สั่งให้ Next.js ส่งออกเป็น Static HTML/CSS/JS
  output: 'export', 
  
  // (ถ้าใช้ Project Pages) กำหนด base path สำหรับ GitHub Pages
  // แทนที่ 'repository-name' ด้วยชื่อ GitHub Repository ของคุณ
  basePath: process.env.NODE_ENV === 'production' ? 'https://hohokz.github.io/hohokz-web/' : '',
  
  // ปรับการตั้งค่าอื่นๆ ที่จำเป็นสำหรับ Static Export
  images: {
    // ต้องยกเลิกการใช้ Image Optimization ของ Next.js
    unoptimized: true, 
  },
};

export default nextConfig;