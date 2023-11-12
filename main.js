const { app, BrowserWindow, dialog, ipcMain } = require("electron")
const path = require("path")
const os = require("os")
const fs = require("fs")
const childProcess = require("child_process")
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
        case "handleResize":
            win.webContents.executeJavaScript(`handleResize(${win.isMaximized()})`)
            break
        case "dump":
            if (fs.existsSync(path.join(data.data.input))) {
                if (!fs.existsSync(data.data.output)) {
                    const dumperProcess = childProcess.spawn("tool.exe", ["--input", data.data.input, "--output", data.data.output] )
                    dumperProcess.stdout.setEncoding("utf-8")
                    dumperProcess.stdout.on("data", (buffer) => {
                        console.log(buffer)
                    })
                    
                } else {
                    dialog.showErrorBox("Fichier déjà existant", "Le fichier selectionner est visiblement déjà présent (fichier de sortie)")
                }
            } else {
                dialog.showErrorBox("Fichier introuvable", "Le fichier selectionner est visiblement introuvable (fichier d'entré)")
            }
            break
    }
})