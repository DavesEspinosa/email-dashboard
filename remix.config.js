/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app", // The directory where your app's source code lives
  assetsBuildDirectory: "public/build", // Where compiled assets are stored
  publicPath: "/build/", // The path Remix will use to locate assets
  serverBuildDirectory: "build", // The directory for the server-side build
  devServerPort: 8002, // Port for the Remix dev server
  tailwind: true, // Enable TailwindCSS support
  postcss: true, // Enable PostCSS support
  routes: require.resolve("./routes"), // The file where your routes are defined
  future: {
    v2_meta: true, // Enables new meta function (v2 feature)
    v2_headers: true, // Enables new headers function (v2 feature)
    v2_normalizeFormMethod: true, // Normalizes form methods to POST (v2 feature)
    v2_routeConvention: true, // Enables the new file-based routing conventions
  },
};
