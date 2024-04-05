import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { ReactComponent as MainLogo2 } from '../assets/mainLogo_2.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Link to="/" className="w-36 h-32 mt-20">
        <MainLogo2 />
      </Link>
      <main className=" mt-10 font-semibold text-xl" style={{ width: '554px', height: '700px' }}>
        <div className="ml-20">
          <h2 className=" mb-3">이메일 주소</h2>
          <input
            type="email"
            value={email}
            className="w-96 h-16 p-3 border rounded-xl outline-none bg-blue-200  focus:border-blue-500"
            onChange={onEmailHandler}
          ></input>
        </div>
        <div className="mt-6 ml-20">
          <h2 className=" mb-3">비밀 번호</h2>
          <input
            type="password"
            value={password}
            className="w-96 h-16 p-3 border rounded-xl  outline-none bg-blue-200 focus:border-blue-500"
            onChange={onPasswordHandler}
          ></input>
        </div>
        <div className="mt-6 ml-20">
          <h2 className=" mb-3">비밀 번호 확인</h2>
          <input
            type="password"
            value={confirmPassword}
            className="w-96 h-16 p-3 border rounded-xl  outline-none bg-blue-200 focus:border-blue-500"
            onChange={onConfirmPasswordHandler}
          ></input>
        </div>
        <div className="mt-6 ml-20">
          <h2 className=" mb-3">닉네임</h2>
          <input
            type="text"
            value={name}
            className="w-96 h-16 p-3 border rounded-xl  outline-none bg-blue-200 focus:border-blue-500"
            onChange={onNameHandler}
          ></input>
        </div>
        <hr className="mt-12 w-96 border-t ml-20 border-gray-700"></hr>
        <Link to="/login">
          <button
            className="px-6 h-16 mt-9 ml-52 border rounded-xl  outline-none border-blue-500 text-blue-500"
            onClick={onSubmit}
          >
            가입 하기
          </button>
        </Link>
      </main>
    </div>
  );
}
