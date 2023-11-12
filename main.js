const { app, BrowserWindow, dialog } = require("electron")
const path = require("path")
const os = require("os")
let win

function createWindow () {
    if (os.platform() == "win32") {
        if (os.release().split(".")[0] == "10") {
            if (os.release().split(".")[2] >= "22000") {
                const { MicaBrowserWindow } = require("mica-electron")
                win = new MicaBrowserWindow({
                    width: 800,
                    height: 600,
                    show: false,
                    transparent: true,
                    autoHideMenuBar: true,
                    frame: true,
                    webPreferences: {
                        preload: path.join(__dirname, "preload.js")
                    }
                })
                win.setDarkTheme()
                win.setMicaEffect()
            } else {
                win = new BrowserWindow({
                    width: 800,
                    height: 600,
                    autoHideMenuBar: true,
                    show: false,
                    frame: false,
                    titleBarStyle: "hidden",
                    transparent: true,
                    webPreferences: {
                        preload: path.join(__dirname, "preload.js")
                    }
                })
            }
            win.setIcon(path.join(__dirname, "logo.png"))
            win.loadFile(path.join(__dirname, "app/index.html"))
            win.webContents.once("dom-ready", () => {
                win.show()
            })
        }
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

app.on("browser-window-created", (event, win) => {
    win.removeMenu()
})