module.exports = {
  presets: [
    '@vue/app'
  ],

  plugins: [
    ["babel-plugin-root-import", {
      paths: [{
        "rootPathPrefix": "~",
        "rootPathSuffix": "src/"
      },
      {
        "rootPathPrefix": "@",
        "rootPathSuffix": "src/components"
      }]
    }]
  ]
}
