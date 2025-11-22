import { Button, Card, Form, Input, Typography, message } from 'antd';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
	const navigate = useNavigate();

	const onFinish = async (values: { email: string; password: string }) => {
		try {
			await registerUser(values.email, values.password);
			message.success('Аккаунт создан, можно войти');
			navigate('/login');
		} catch {
			message.error('Ошибка регистрации');
		}
	};

	return (
		<Card style={{ maxWidth: 400, margin: '40px auto' }}>
			<Typography.Title level={2}>Регистрация</Typography.Title>

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
					Зарегистрироваться
				</Button>
			</Form>
		</Card>
	);
}
