module.exports = {
  presets: [
    '@vue/app'
  ],

  plugins: [
    ["babel-plugin-root-import", {
      paths: [{
        "rootPathPrefix": "~", // `~` is the default so you can remove this if you want
        "rootPathSuffix": "src/"
      }]
    }]
  ]
}
