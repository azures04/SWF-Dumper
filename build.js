const packager = require("@electron/packager")
const package = require("./package.json")

packager({
    asar: true,
    buildVersion: package.version,
    electronVersion: package.devDependencies.electron,
})