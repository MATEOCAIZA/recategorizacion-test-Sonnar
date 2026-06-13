const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

const adicionalRoutes = require('./routes/adicional.routes');
const articuloRoutes = require('./routes/articulo.routes');
const capacitacionRoutes = require('./routes/capacitacion.routes');
const categoriaPaRoutes = require('./routes/categoria_pa.routes');
const certificadoIdiomaRoutes = require('./routes/certificadoidioma.routes');
const comisionRoutes = require('./routes/comision.routes');
const convocatoriaRoutes = require('./routes/convocatoria.routes');
const convocatoriasGradosRoutes = require('./routes/convocatorias_grados.routes');
const evaluacionRoutes = require('./routes/evaldocente.routes');
const gradoRoutes = require('./routes/grado.routes');
const investigacionRoutes = require('./routes/investigacion.routes');
const jwtAuthRoutes = require('./routes/jwtAuth.routes');
const nivelRoutes = require('./routes/nivel.routes');
const ponenciaRoutes = require('./routes/ponencia.routes');
const postulacionRouters = require('./routes/postulacion.routes');
const rolRoutes = require('./routes/rol.routes');
const tesisRoutes = require('./routes/tesis.routes');
const userRoutes = require('./routes/user.routes');

app.use(cors({
  origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());

app.use(adicionalRoutes);
app.use(articuloRoutes);
app.use(capacitacionRoutes);
app.use(categoriaPaRoutes);
app.use(certificadoIdiomaRoutes);
app.use(comisionRoutes);
app.use(convocatoriaRoutes);
app.use(convocatoriasGradosRoutes);
app.use(evaluacionRoutes);
app.use(gradoRoutes);
app.use(investigacionRoutes);
app.use(jwtAuthRoutes);
app.use(nivelRoutes);
app.use(ponenciaRoutes);
app.use(postulacionRouters);
app.use(rolRoutes);
app.use(tesisRoutes);
app.use(userRoutes);

console.log(path.join(__dirname, 'uploads'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

require('./cronJobs');

app.use((err, req, res, next) => {
  return res.json({message: err.message});
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});