const { app, BrowserWindow, dialog, ipcMain } = require("electron")
const path = require("path")
const os = require("os")
let win

function createWindow () {
    if (os.platform() == "win32") {
        if (os.release().split(".")[0] == "10") {
            if (os.release().split[2] == "22000") {
                const { MicaBrowserWindow } = require("mica-electron")
                win = new MicaBrowserWindow({
                    width: 900,
                    height: 600,
                    minHeight: 600,
                    minWidth: 900,
                    autoHideMenuBar: true,
                    show: false,
                    titleBarStyle: "hidden",
                    webPreferences: {
                        preload: path.join(__dirname, "preload.js"),
                        contextIsolation: true,
                        nodeIntegration: true,
                        defaultEncoding: "utf8",
                        experimentalFeatures: true
                    }
                })
                win.setRoundedCorner()
            } else {
                win = new BrowserWindow({
                    width: 900,
                    height: 600,
                    minHeight: 600,
                    minWidth: 900,
                    show: false,
                    frame: false,
                    transparent: true,
                    autoHideMenuBar: true,
                    titleBarStyle: "hidden",
                    webPreferences: {
                        preload: path.join(__dirname, "preload.js"),
                        contextIsolation: true,
                        nodeIntegration: true,
                        defaultEncoding: "utf8",
                        experimentalFeatures: true
                    }
                })
            }
            win.loadFile(path.join(__dirname, "app/index.html"))
            win.webContents.once("dom-ready", () => {
                win.show()
            })
            win.setIcon(path.join(__dirname, "logo.png"))
            win.webContents.openDevTools()
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

ipcMain.on("action", (evt, data) => {
    switch (data.action) {
        case "close":
            app.quit()
            break
        case "minimize":
            win.minimize()
            break
        case "maximize":
            if (win.isMaximized()) {
                win.unmaximize()
            } else {
                win.maximize()
            }
            break
    }
})