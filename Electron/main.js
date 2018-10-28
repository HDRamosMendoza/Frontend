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
	win = new BrowserWindow({
		
		center: true,
		title: "Automatic Continuum Analysis of Reflectance Spectra",
    	resizable: true,
    	transparent: true,
		width: 900,
		height: 700,
     	backgroundColor: '#312450',
     	show: true,
     	icon: path.join(__dirname, 'icons8-informe-gráfico-64.png')
     	//frame: false
     })

	// y carga el archivo index.html de la aplicación.
    //win.loadFile('index.html')

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))

	win.setMenu(null);
	win.webContents.openDevTools() 

	// Emitido cuando la ventana es cerrada.
    win.on('closed', () => {
    	// Desreferencia el objeto ventana, usualmente tu guardarias ventanas
      	// en un arreglo si tu aplicación soporta multi ventanas, este es el momento
      	// cuando tu deberías borrar el elemento correspiente.
      	win = null
    })
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

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.on('ready', createWindow)

// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
	// En macOS es común para las aplicaciones y sus barras de menú
	// que estén activas hasta que el usuario salga explicitamente con Cmd + Q
	if (process.platform !== 'darwin') {
	  app.quit()
	}
})