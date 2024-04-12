import { Link } from 'react-router-dom';
import { ReactComponent as Logoimg } from '../../assets/form_logo.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../hooks/authActions';
interface FormHeaderProps {
  title: string;
}

export default function FormHeader({ title }: FormHeaderProps) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
  };

  return (
    <header className="h-28 mt-1 flex justify-between ">
      <div className="flex flex-row align-center">
        <Link to="/">
          <Logoimg />
        </Link>
        <h1 className="text-xl font-medium mt-3 ">{title}</h1>
      </div>
      <div className="flex p-3 font-normal text-base mr-44">
        <button className="border-none rounded-md bg-blue-500 text-white w-24 h-10 mr-3">보내기</button>
        <button onClick={handleLogout} className="border-none rounded- text-blue-500 bg-gray-100 w-24 h-10 mr-2">
          Logout
        </button>
      </div>
    </header>
  );
}
