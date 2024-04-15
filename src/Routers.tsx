import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Form from './pages/Form';
import ResponseCheck from './pages/ResponseCheck';
import Preview from './pages/PreviewForm';
import Response from './pages/Response';
const Routers = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/form', element: <Form /> },
  { path: '/form/responseCheck', element: <ResponseCheck /> },
  { path: '/preview', element: <Preview /> },
  { path: '/response', element: <Response /> },
]);

export default Routers;
