'use strict'

import { app, protocol, Tray, BrowserWindow } from 'electron'
import { join } from 'path'
import { menubar } from 'menubar'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  const mb = menubar({
    tooltip: 'Remote Report',
    index: isDevelopment
            ? process.env.WEBPACK_DEV_SERVER_URL
            : 'app://./index.html',
    browserWindow: {
      width: 360,
      height: 360,
      minWidth: 360,
      minHeight: 360,
      resizable: isDevelopment,
      alwaysOnTop: isDevelopment,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      }
    },
    tray: new Tray(join(__static, 'IconTemplate.png'))
  })

  mb.on('ready', () => {
    mb.showWindow()
  })

  
  mb.on('after-create-window', () => {
    // Load the url of the dev server if in development mode
    if (isDevelopment && !process.env.IS_TEST) {
      // mb.window.webContents.openDevTools()
    }
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app')
  }

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
