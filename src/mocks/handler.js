import { http, HttpResponse } from 'msw';

const members = [{ email: 'eunjin4671@naver.com', password: '1234' }];

export const handler = [
  // 회원가입 API
  http.post('/signup', async ({ request }) => {
    const requestData = await request.json();

    // 입력 받은 이메일이 이미 등록되어 있는지 확인
    const existingMember = members.find(member => member.email === requestData.email);
    if (existingMember) {
      return new HttpResponse({ message: '해당 이메일은 이미 등록되어 있습니다.' }, { status: 400 });
    }

    // 비밀번호의 유효성 검사
    const { password } = requestData;
    if (password.length < 6) {
      return new HttpResponse({ message: '비밀번호는 최소 6자 이상이어야 합니다.' }, { status: 400 });
    }

    // 회원 추가
    members.push(requestData);
    console.log('가입한 회원:', requestData);

    // 성공 응답 반환
    return new HttpResponse(null, { status: 201 });
  }),
  // 로그인 API
  http.post('/login', async ({ request }) => {
    const { email, password } = await request.json();

    for (const member of members) {
      if (email === member.email && password === member.password) {
        const accessToken = Math.random().toString(36).substring(2);
        return new HttpResponse(
          { access_token: accessToken },
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Set-Cookie': `token=1`,
            },
          },
        );
      }
    }

    return new HttpResponse(null, { status: 401 });
  }),
];
