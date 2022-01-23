import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store';

function wrapComponent(Component: React.ReactNode) {
  return (
    <Provider store={store}>
      <MemoryRouter>{Component}</MemoryRouter>
    </Provider>
  );
}

export default {
  wrapComponent,
};
