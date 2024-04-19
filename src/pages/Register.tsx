import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ReactComponent as MainLogo2 } from '../assets/mainLogo_2.svg';
import { Button, TextField } from '@mui/material';

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

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          return response.json().then(data => {
            throw new Error(data.message || '가입에 실패하였습니다. 다시 시도해주세요.');
          });
        } else {
          throw new Error('Unexpected status code: ' + response.status);
        }
      })
      .then(data => {
        console.log('회원가입 성공! 이메일 주소:', data.email);
        navigate('/login');
      })
      .catch(error => {
        console.error(`Error: ${error}`);
        setErrorMessage(error.message || '가입에 실패하였습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div className="flex flex-col items-center ">
      <Link to="/" className="w-36 h-32 mt-12">
        <MainLogo2 />
      </Link>
      <main
        className=" mt-8 font-medium text-xl flex flex-col items-center justify-center"
        style={{ width: '554px', height: '700px' }}
      >
        <form onSubmit={onSubmitHandler}>
          <div className="ml-5">
            <h2 className=" mb-3">이메일 주소</h2>
            <TextField
              id="outlined-email-input"
              required
              label="email"
              type="email"
              value={email}
              autoComplete="current-password"
              className="w-96 h-16 p-3 "
              onChange={onEmailHandler}
            />
          </div>
          <div className="mt-6 ml-5">
            <h2 className=" mb-3">비밀 번호</h2>
            <TextField
              id="outlined-password-input"
              required
              label="password"
              type="password"
              value={password}
              autoComplete="current-password"
              className="w-96 h-16 p-3 "
              onChange={onPasswordHandler}
            />
          </div>
          <div className="mt-6 ml-5">
            <h2 className=" mb-3">비밀 번호 확인</h2>
            <TextField
              id="outlined-password-input"
              required
              label="password"
              type="password"
              value={confirmPassword}
              autoComplete="none"
              className="w-96 h-16 p-3 "
              onChange={onConfirmPasswordHandler}
            />
          </div>
          <div className="mt-6 ml-5 ">
            <h2 className=" mb-3">닉네임</h2>
            <TextField
              id="outlined-name-input"
              required
              label="name"
              type="name"
              value={name}
              autoComplete="none"
              className="w-96 h-16 p-3 "
              onChange={onNameHandler}
            />
          </div>
          <hr className="mt-8 ml-5 w-96 border-t border-gray-700"></hr>
          <div className="flex flex-col items-center justify-center mt-5">
            {errorMessage && <p className="text-red-500 text-lg mb-3">{errorMessage}</p>}
            <Button variant="outlined" type="submit" style={{ fontSize: '19px' }} className="w-36 h-12">
              가입 하기
            </Button>
          </div>
        </form>
        <p className="p-6 mt-1 font-medium text-lg text-gray-600">
          이미 회원이신가요?&nbsp;
          <Link to="/login" className="hover:underline ml-8 text-gray-600 hover:text-gray-500">
            로그인 하러가기
          </Link>
        </p>
      </main>
    </div>
  );
}
