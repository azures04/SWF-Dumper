const { contextBridge, ipcRenderer, shell } = require("electron")

contextBridge.exposeInMainWorld("swf_dumper", {
    application: {
        close() { ipcRenderer.send("action", { action: "close" }) },
        minimize() { ipcRenderer.send("action", { action: "minimize" }) },
        maximize() { ipcRenderer.send("action", { action: "maximize" }) },
        openDevTools() { ipcRenderer.send("action", { action: "openDevTools" }) },
        openExternal(url) { shell.openExternal(url) }
    }
})