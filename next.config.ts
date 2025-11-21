/** @type {import("next").NextConfig} */
const nextConfig = {
  // désactive les source maps (bugs Turbopack sur Windows)
  productionBrowserSourceMaps: false,

  // active Turbopack proprement
  turbopack: {},
};

export default nextConfig;


