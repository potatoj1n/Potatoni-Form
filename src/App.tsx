import './styles/App.css';
import { RouterProvider } from 'react-router-dom';
import Routers from './Routers';

export default function App() {
  return (
    <div className='App text-gray-700 mx-32 cursor-pointer"'>
      <RouterProvider router={Routers}></RouterProvider>
    </div>
  );
}
