import { Link } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';
import Header from '../components/header';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { IconButton } from '@material-ui/core';

export default function Main() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const userForms = useAppSelector(state => state.form);

  return (
    <div>
      <Header />
      <div className="mx-28">
        <div className="flex justify-between border-none rounded-2xl h-72 bg-gray-100 mt-3  p-12">
          <div>
            <h1 className="font-bold sm:text-xl lg:text-3xl mb-9">새 질문 생성하기</h1>
            <h2 className="font-medium sm:text-base lg:text-xl mb-3">
              사용자들의 의견으로 미래를 함께 그려봅시다! 함께해요!
            </h2>
            <p className="font-normal text-base">
              당신의 의견을 효과적으로 모아줄 혁신적인 플랫폼, 새로운 아이디어를 발견하세요!
            </p>
          </div>
          {isLoggedIn ? (
            <>
              <button className="border bg-white rounded-2xl lg:w-80 h-52 mr-36 mb-10 px-28 py-8">
                <Link to="/form">
                  <LibraryAddIcon sx={{ fontSize: 80 }} />
                </Link>
              </button>
            </>
          ) : (
            <>
              <button className="border bg-white rounded-2xl w-80 h-52 mr-36 mb-10 px-28 py-8">
                <Link to="/form">
                  <IconButton>
                    <LibraryAddIcon sx={{ fontSize: 80 }} />
                  </IconButton>
                </Link>
              </button>
            </>
          )}
        </div>
        <div>
          <h2 className="font-bold text-2xl mt-14 mb-3">최근 설문지</h2>
          {isLoggedIn ? (
            <ul>
              {Array.isArray(userForms) &&
                userForms.map(form => (
                  <li key={form.id}>
                    <Link to={`/form/${form.id}`}>
                      <button className="border bg-white rounded-xl w-52 h-60 mr-36 mb-10 p-3"></button>
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">
                  <button className="border bg-white rounded-xl w-52 h-60 mr-36 mb-10 p-3">
                    <NoteAddIcon sx={{ fontSize: 50 }} />
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
