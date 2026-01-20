import { Energy3dCard } from './energy-3d-card';
import { Energy3dCardEditor } from './editor';

// Declare card
declare global {
  interface HTMLElementTagNameMap {
    'energy-3d-card': Energy3dCard;
    'energy-3d-card-editor': Energy3dCardEditor;
  }
}

// Log version
console.info(
  `%c ENERGY-3D-CARD %c v1.0.0 `,
  'color: white; background: #ff6b35; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #ff6b35; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0; border: 1px solid #ff6b35;'
);

// Register card
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'energy-3d-card',
  name: 'Energy 3D Card',
  description: 'A beautiful 3D animated energy flow visualization card',
  preview: true,
  documentationURL: 'https://github.com/YOUR_USERNAME/energy-3d-card'
});
