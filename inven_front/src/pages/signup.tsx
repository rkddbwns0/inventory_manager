import { Alert, Button, Input } from 'antd';
import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordMsg, setPasswordMsg] = React.useState<string>('');
    const [dupEmailMsg, setDupEmailMsg] = React.useState<string>('');
    const [errorMsg, setErrorMsg] = React.useState<string>('');

    const checkList = {
        chkDupEmail: false,
        chkPassword: false,
        chkPasswordCheck: false,
    };

    const handleDupEmail = async () => {
        if (email === '') {
            setDupEmailMsg('아이디를 입력해 주세요.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/users/`, {
                params: {
                    email: email,
                },
            });

            console.log(response);

            if (response.data.available) {
                setDupEmailMsg('사용 가능한 이메일입니다.');
                checkList.chkDupEmail = true;
            }
        } catch (e: any) {
            if (e.response.status === 409) {
                setDupEmailMsg(e.response.data.error);
                checkList.chkDupEmail = false;
            } else {
                setDupEmailMsg('중복 검사 중 문제가 발생하였습니다. 다시 시도해 주세요.');
                checkList.chkDupEmail = false;
            }
        }
    };

    const validatePassword = (value: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

        if (value === '') {
            setPasswordMsg('');
            return;
        }

        if (!passwordRegex.test(value)) {
            setPasswordMsg('8~16자의 알파벳과 숫자를 사용해 주세요.');
            checkList.chkPassword = false;
        } else {
            setPasswordMsg('사용 가능한 비밀번호 입니다.');
            checkList.chkPassword = true;
        }
    };

    const handlePasswordChange = (e: any) => {
        const value = e.target.value;
        setPassword(value);

        validatePassword(value);
    };

    const handleSignup = async () => {
        if (name === '' || email === '' || password === '') {
            setErrorMsg('정보를 모두 입력해 주세요.');
            return;
        }

        if (name !== '' && checkList.chkDupEmail === true && checkList.chkPassword === true) {
            try {
                const response = await axios.post('http://localhost:8080/users', {
                    name: name,
                    email: email,
                    password: password,
                });
                console.log(response);
                navigate('/login');
            } catch (e) {
                console.error(e);
            }
        } else {
            setErrorMsg('회원가입 중 문제가 발생하였습니다.');
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
                    <Button
                        type="primary"
                        style={{ height: '35px', alignItems: 'center' }}
                        onClick={() => handleDupEmail()}
                    >
                        중복검사
                    </Button>
                </div>
                <div>
                    {dupEmailMsg && (
                        <Alert
                            message={dupEmailMsg}
                            type={dupEmailMsg === '사용 가능한 이메일입니다.' ? 'success' : 'error'}
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
                        onChange={handlePasswordChange}
                    />
                </div>
                {passwordMsg && (
                    <div>
                        <Alert
                            message={passwordMsg}
                            type={checkList.chkPassword === true ? 'success' : 'error'}
                            showIcon
                            style={{ marginTop: '5px', marginBottom: '10px', fontSize: '13px' }}
                        />
                    </div>
                )}
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
