import resolve from '@rollup/plugin-node-resolve'; // Utilise la version @rollup
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

export default {
  input: ['src/energy-3d-card.ts'],
  output: {
    dir: './dist',
    format: 'es',
    sourcemap: true, // Très utile pour débugger sur ton Mac
  },
  plugins: [
    resolve(),
    typescript(),
    json(),
    serve({
      contentBase: ['./', './dist'],
      host: '0.0.0.0', // Permet l'accès depuis ton IP locale et localhost
      port: 5001,      // Port 5001 pour éviter le conflit AirPlay du Mac
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
  // On ignore les warnings de circulaire dépendance souvent présents dans Lit
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
};