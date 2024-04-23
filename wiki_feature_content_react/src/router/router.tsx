import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import ContentPage from '../pages/ContentPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/content',
    element: <ContentPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;