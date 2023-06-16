import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders without errors', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
