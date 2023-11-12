const { contextBridge, ipcRenderer, shell } = require("electron")

contextBridge.exposeInMainWorld("swf_dumper", {
    window: {
        close() { ipcRenderer.send("action", { action: "close" }) },
        minimize() { ipcRenderer.send("action", { action: "minimize" }) },
        maximize() { ipcRenderer.send("action", { action: "maximize" }) },
        openExternal(url) { shell.openExternal(url) },
        handleResize() { ipcRenderer.send("action", { action: "handleResize" }) }
    },
    dumper: {
        dump(input, output) {
            console.log(input, output)
            if (input && output) {
                ipcRenderer.send("action", { action: "dump", data: { input, output } })
            } else {
                alert(new Error("Paramètres manquant"))
            }
        }
    }
})