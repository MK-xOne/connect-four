import './style.css';
import { renderEmptyGrid } from './ui';

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('#app element not found');
}

renderEmptyGrid(root);
