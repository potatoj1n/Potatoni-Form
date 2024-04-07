import { Link, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { ReactComponent as MainLogo2 } from '../assets/mainLogo_2.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }
    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }), // 이메일, 비밀번호, 닉네임 등의 정보를 전송
      });
      const data = await response.json();
      console.log(data); // 서버 응답 처리

      // 가입이 성공하면 로그인 페이지로 이동
      if (response.ok) {
        navigate('/login');
      } else {
        setErrorMessage('가입에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('가입에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Link to="/" className="w-36 h-32 mt-20">
        <MainLogo2 />
      </Link>
      <main className=" mt-10 font-semibold text-xl" style={{ width: '554px', height: '700px' }}>
        <form onSubmit={onSubmitHandler}>
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
          {errorMessage && <p className="text-red-500 ml-20">{errorMessage}</p>}
          <button
            type="submit"
            className="px-6 h-16 mt-9 ml-52 border rounded-xl  outline-none border-blue-500 text-blue-500"
          >
            가입 하기
          </button>
        </form>
      </main>
    </div>
  );
}
