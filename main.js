const { app, BrowserWindow, dialog } = require("electron")
const path = require("path")
const os = require("os")
let win

function createWindow () {
    if (!os.platform() == "win32") {
        win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js")
            }
        })

        win.loadFile(path.join(__dirname, "app/index.html"))
    } else {
        dialog.showErrorBox("Plateforme nun supportée", `Vous tourner actuellement sur ${os.type()} ${os.release()}, Cette application ne peut tourner que sur Windows`)
    }
}

app.whenReady().then(() => {
    createWindow()
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit()
})