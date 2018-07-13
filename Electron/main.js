// Importar electron
const electron = require('electron')
//  Cargar dinamicamente
const {app, BrowserWindow} = electron

// Cargamos archivos url dinamicamente
const path = require('path')
//Cragar url dentro de nuestro navgeador chrome
const url = require('url')

let win /* Ciclo de vida */
function  createWindow(){
	win = new BrowserWindow({width: 800,height: 600})
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))
	win.webContents.openDevTools() 
}
// Exportar procesos.
// Y llamando una nueva ventana
exports.openWindow = () => {
	let newWin = new BrowserWindow({width: 400,height: 200})
	newWin.loadURL(url.format({
		pathname: path.join(__dirname, 'about.html'),
		protocol: 'file',
		slashes: true
	}))
}

app.on('ready', createWindow)