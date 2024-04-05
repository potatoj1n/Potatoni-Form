import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as MainLogo2 } from '../assets/mainLogo_2.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = () => {};

  return (
    <div className="flex flex-row justify-center ">
      <aside className="m-52 ">
        <Link to="/">
          <MainLogo2 />
        </Link>
        <p className="font-medium text-xl ">로그인으로 시작하는 빠른 설문 조사 </p>
      </aside>
      <main
        className="border border-gray-500 mt-20 font-semibold text-xl rounded-lg"
        style={{ width: '554px', height: '700px' }}
      >
        <form>
          <div className="mt-14 ml-20">
            <h2 className=" mb-3">이메일 주소</h2>
            <input
              type="email"
              value={email}
              className="w-96 h-16 p-3 border rounded-xl outline-none bg-blue-200 focus:border-blue-500"
              onChange={onEmailHandler}
            />
          </div>
          <div className="mt-10 ml-20">
            <h2 className=" mb-3">비밀 번호</h2>
            <input
              type="password"
              value={password}
              className="w-96 h-16 p-3 border rounded-xl  outline-none bg-blue-200 focus:border-blue-500"
              onChange={onPasswordHandler}
            />
          </div>
          <button
            type="submit"
            className="border rounded-xl w-52 h-16  outline-none border-blue-500 mt-12 ml-44 text-blue-500"
            onClick={onSubmitHandler}
          >
            로그인 하기
          </button>
        </form>
        <hr className="mt-12 w-96 border-t ml-20 border-gray-700"></hr>
        <div className="flex flex-col">
          <Link to="/register">
            <button className="w-96 h-16 ml-20 mt-10 border rounded-xl  outline-none border-blue-500 ">
              구글로 로그인, 회원가입 하기
            </button>
          </Link>
          <Link to="/register">
            <button className="w-52 h-16 mt-9 ml-44 border rounded-xl  outline-none border-blue-500 text-blue-500">
              회원가입 하기
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
