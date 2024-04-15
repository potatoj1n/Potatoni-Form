import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as MainLogo2 } from '../assets/mainLogo_2.svg';
import { Button, TextField } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/localhost8080/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        const accessToken = data.accessToken;
        sessionStorage.setItem('accessToken', accessToken);
        navigate('/');
      } else {
        setErrorMessage('로그인 정보가 없습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('로그인 정보가 없습니다. 다시 시도해주세요.');
    }
  };

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
        <form onSubmit={onSubmitHandler}>
          <div className="mt-14 ml-20">
            <h2 className=" mb-3">이메일 주소</h2>
            <TextField
              id="outlined-email-input"
              label="email"
              type="email"
              value={email}
              autoComplete="current-password"
              className="w-96 h-16 p-3 "
              onChange={onEmailHandler}
            />
          </div>
          <div className="mt-8 ml-20">
            <h2 className=" mb-3">비밀 번호</h2>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              autoComplete="current-password"
              className="w-96 h-16 p-3 "
              onChange={onPasswordHandler}
            />
          </div>
          <div className="flex justify-center mt-8 ">
            <Button variant="outlined" type="submit" style={{ fontSize: '19px' }} className="w-52 h-16">
              로그인 하기
            </Button>
          </div>
          {errorMessage && <p className="text-red-500 text-lg flex justify-center mt-3">{errorMessage}</p>}
        </form>
        <hr className="mt-12 w-96 border-t ml-20 border-gray-700"></hr>
        <div className="flex flex-col">
          <Link to="/register">
            <div className="flex justify-center mt-8">
              <Button
                variant="outlined"
                type="submit"
                style={{ fontSize: '19px', color: 'black' }}
                className="w-96 h-16 "
              >
                구글로 로그인, 회원가입 하기
              </Button>
            </div>
          </Link>
          <Link to="/register">
            <div className="flex justify-center mt-8">
              <Button variant="outlined" style={{ fontSize: '19px' }} className="w-52 h-16">
                회원가입 하기
              </Button>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
