import { Button, Card, Form, Input, Typography, message } from 'antd';
import { login } from '../api/auth';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
	const { login: doLogin } = useAuth();
	const navigate = useNavigate();

	const onFinish = async (values: { email: string; password: string }) => {
		try {
			const res = await login(values.email, values.password);
			doLogin(res.data.accessToken);
			message.success('Вы успешно вошли');
			navigate('/tasks');
		} catch {
			message.error('Неверный email или пароль');
		}
	};

	return (
		<Card style={{ maxWidth: 400, margin: '40px auto' }}>
			<Typography.Title level={2}>Вход</Typography.Title>

			<Form layout="vertical" onFinish={onFinish}>
				<Form.Item
					name="email"
					label="Email"
					rules={[{ required: true, message: 'Введите email' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="password"
					label="Пароль"
					rules={[{ required: true, message: 'Введите пароль' }]}
				>
					<Input.Password />
				</Form.Item>

				<Button type="primary" htmlType="submit" block>
					Войти
				</Button>
			</Form>
		</Card>
	);
}
