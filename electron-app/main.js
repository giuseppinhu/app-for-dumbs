
const { app, BrowserWindow, dialog } = require("electron");
const { spawn } = require("child_process");
const { ipcMain } = require("electron/main");
const path = require("path");
const JSZip = require("jszip");
const fs = require("fs");

let apiProcess

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  const apiPath = path.join(__dirname, "/server/server.js");

  apiProcess = spawn("node", [apiPath], {
    cwd: path.join(__dirname, "/dist"),
    shell: true,
    detached: false
  });

  apiProcess.stdout.on("data", data => {
    console.log(`[API]: ${data}`);
  });

  apiProcess.stderr.on("data", data => {
    console.error(`[API ERROR]: ${data}`);
  });

  createWindow();
});

app.on("will-quit", () => {
  if (apiProcess) {
    apiProcess.kill();  
  }
});

// Donwload and Zip Images

ipcMain.on('download-and-zip', async (event, imageBase64List) => {
  try {
    // Abre o diálogo para o usuário escolher onde salvar o arquivo .zip
    const { filePath } = await dialog.showSaveDialog({
      title: 'Salvar imagens',
      defaultPath: 'imagens.zip',
      filters: [{ name: 'Arquivos ZIP', extensions: ['zip'] }]
    });

    if (!filePath) {
      return; // Usuário cancelou
    }

    const zip = new JSZip();

    imageBase64List.forEach((base64, index) => {
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      zip.file(`imagem_${index + 1}.jpg`, buffer);
    });

    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
    fs.writeFileSync(filePath, zipContent);

    event.sender.send('download-complete');
  } catch (err) {
    console.error('Erro ao salvar imagens:', err);
  }
});