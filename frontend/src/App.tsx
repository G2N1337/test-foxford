import { Layout, Menu } from 'antd';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';

import { useAuth } from './context/useAuth';

const { Header, Content } = Layout;

export default function App() {
	const { isAuth, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header>
				<Menu theme="dark" mode="horizontal">
					<Menu.Item key="tasks">
						<Link to="/tasks">Задачи</Link>
					</Menu.Item>

					{!isAuth && (
						<>
							<Menu.Item key="login">
								<Link to="/login">Вход</Link>
							</Menu.Item>
							<Menu.Item key="register">
								<Link to="/register">Регистрация</Link>
							</Menu.Item>
						</>
					)}

					{isAuth && (
						<Menu.Item key="logout" onClick={handleLogout}>
							Выйти
						</Menu.Item>
					)}
				</Menu>
			</Header>

			<Content style={{ padding: 24 }}>
				<Routes>
					<Route path="/tasks" element={<TasksPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</Content>
		</Layout>
	);
}
