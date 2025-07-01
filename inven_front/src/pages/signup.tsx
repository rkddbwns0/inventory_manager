import { Alert, Button, Input } from 'antd';
import axios from 'axios';
import React from 'react';

const Signup = () => {
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordCheck, setPasswordCheck] = React.useState<string>('');
    const [dupEmailMsg, setDupEmailMsg] = React.useState<string>('');
    const [errorMsg, setErrorMsg] = React.useState<string>('');

    const handleDupEmail = async () => {
        if (email === '') {
            setDupEmailMsg('아이디를 입력해 주세요.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/users/${email}`);
            console.log(response);
            if (response?.data?.available === true) {
                setDupEmailMsg(response.data.message);
            } else {
                setDupEmailMsg(response.data.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSignup = async () => {
        if (name === '' || email === '' || password === '' || passwordCheck === '') {
            setErrorMsg('정보를 모두 입력해 주세요.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/users', {
                name: name,
                email: email,
                password: password,
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <div>
                <h3>회원가입</h3>
            </div>
            <div style={{ width: '500px' }}>
                <div>
                    <Input
                        placeholder="이름"
                        size="large"
                        style={{ marginBottom: '10px', fontSize: '15px' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Input
                        placeholder="아이디"
                        size="large"
                        style={{ marginBottom: '10px', fontSize: '15px', width: '380px' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="primary" style={{ height: '35px', alignItems: 'center' }} onClick={handleDupEmail}>
                        중복검사
                    </Button>
                </div>
                <div>
                    {dupEmailMsg && (
                        <Alert
                            message={dupEmailMsg}
                            type={
                                dupEmailMsg === '아이디를 입력해 주세요.' ||
                                dupEmailMsg === '이미 존재하는 아이디입니다.'
                                    ? 'error'
                                    : 'success'
                            }
                            showIcon
                            style={{ marginTop: '5px', marginBottom: '10px', fontSize: '13px' }}
                        />
                    )}
                </div>
                <div>
                    <Input.Password
                        placeholder="비밀번호"
                        size="large"
                        style={{ marginBottom: '10px', fontSize: '15px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Input.Password
                        placeholder="비밀번호 확인"
                        size="large"
                        style={{ marginBottom: '10px', fontSize: '15px' }}
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </div>
            </div>
            <div style={{ width: '500px' }}>
                <Button
                    type="primary"
                    style={{ marginTop: '10px', width: '100%', height: '40px' }}
                    onClick={handleSignup}
                >
                    회원가입
                </Button>
                <div>
                    {errorMsg && (
                        <Alert
                            message={errorMsg}
                            type="error"
                            showIcon
                            style={{ marginTop: '10px', fontSize: '13px' }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default Signup;
