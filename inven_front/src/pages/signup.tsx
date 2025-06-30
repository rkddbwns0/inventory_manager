import { Button, Input } from 'antd';
import React from 'react';

const Signup = () => {
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordCheck, setPasswordCheck] = React.useState<string>('');

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
            <div style={{ width: '30%' }}>
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
                        style={{ marginBottom: '10px', fontSize: '15px', width: '75%' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="primary" style={{ height: '35px', alignItems: 'center' }}>
                        아이디 확인
                    </Button>
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
            <div style={{ width: '30%' }}>
                <Button type="primary" style={{ marginTop: '10px', width: '100%', height: '40px' }}>
                    회원가입
                </Button>
            </div>
        </div>
    );
};
export default Signup;
