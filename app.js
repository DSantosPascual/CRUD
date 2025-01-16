const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// Rutas

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const { nombre, edad, lugarProcedencia } = req.body;
    if (!nombre || !edad || !lugarProcedencia) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        edad,
        lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.get('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
});

app.put('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { edad, lugarProcedencia } = req.body;
    const usuarioIndex = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (!edad && !lugarProcedencia) {
        return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
    }
    if (edad) usuarios[usuarioIndex].edad = edad;
    if (lugarProcedencia) usuarios[usuarioIndex].lugarProcedencia = lugarProcedencia;

    res.json(usuarios[usuarioIndex]);
});

app.delete('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const usuarioExistente = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (!usuarioExistente) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    usuarios = usuarios.filter(u => u.nombre.toLowerCase() !== nombre.toLowerCase());
    res.json({ mensaje: 'Usuario eliminado', usuario: usuarioExistente });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
