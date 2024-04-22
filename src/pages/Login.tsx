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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('로그인 정보가 없습니다. 다시 시도해주세요.');
        }
      })
      .then(data => {
        const accessToken = JSON.parse(data.accessToken);
        sessionStorage.setItem('accessToken', accessToken);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        const errorMessage = '로그인 정보가 없습니다. 다시 시도해주세요.';
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className="flex flex-row items-center ">
      <aside className="m-48">
        <Link to="/">
          <MainLogo2 />
        </Link>
        <p className="font-medium text-xl ">로그인으로 시작하는 빠른 설문 조사 </p>
      </aside>
      <main
        className=" flex flex-col items-center border border-gray-500 mt-20 font-semibold text-xl rounded-lg"
        style={{ width: '554px', height: '700px' }}
      >
        <form onSubmit={onSubmitHandler} className=" flex flex-col items-center">
          <div className="mt-14 ">
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
          <div className="mt-8">
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
          <div className="mt-8 flex flex-col items-center">
            {errorMessage && <p className="text-red-500 text-lg mb-3">{errorMessage}</p>}
            <Button variant="outlined" type="submit" style={{ fontSize: '19px' }} className="w-52 h-16">
              로그인 하기
            </Button>
          </div>
        </form>
        <hr className="mt-8 w-96 border-t border-gray-700"></hr>
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
