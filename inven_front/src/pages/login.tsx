import { Button, ConfigProvider, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

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
                <h2>로그인</h2>
            </div>
            <div>
                <Input
                    placeholder="아이디"
                    size="large"
                    style={{ marginBottom: '10px', fontSize: '15px' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input.Password
                    placeholder="비밀번호"
                    size="large"
                    style={{ marginBottom: '10px', marginTop: '10px', fontSize: '15px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button type="primary" size="large" style={{ width: '410px' }}>
                    로그인
                </Button>
                <Button type="link" onClick={() => navigate('/signup')}>
                    회원가입
                </Button>
            </div>
        </div>
    );
};

export default Login;
