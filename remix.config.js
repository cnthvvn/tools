/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  future: {
    v2_routeConvention: true,
    // v2_errorBoundary: true,
  },
};
