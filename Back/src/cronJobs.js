const cron = require('node-cron');
const pool = require('./db');

// Tarea programada para ejecutarse todos los días a medianoche
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const result = await pool.query(
      'UPDATE convocatoria SET estado = $1 WHERE fecha_fin < $2 AND estado = $3',
      ['CERRADA', now, 'ABIERTA']
    );
    console.log(`Convocatorias cerradas: ${result.rowCount}`);
  } catch (error) {
    console.error('Error al actualizar el estado de las convocatorias:', error);
  }
});