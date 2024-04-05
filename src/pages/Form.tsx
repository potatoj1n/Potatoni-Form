import { Link } from 'react-router-dom';
import HeaderUser from '../components/header';
export default function Main() {
  return (
    <div className="">
      <HeaderUser />
      <button>
        <Link to="/form">Form</Link>
      </button>
      <Link to="/response">응답</Link>
    </div>
  );
}
