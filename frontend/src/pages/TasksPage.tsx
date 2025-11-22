import { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, message } from 'antd';
import type { Task } from '../types/task';
import { deleteTask, getTasks } from '../api/tasks';
import TaskForm from '../components/TaskForm';
import EditTaskModal from '../components/EditTaskModal';
import TasksTable from '../components/TaskTable';

export default function TasksPage() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const loadTasks = async () => {
		try {
			const res = await getTasks();
			setTasks(res.data);
		} catch {
			message.error('Ошибка загрузки задач');
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteTask(id);
			message.success('Задача удалена');
			loadTasks();
		} catch {
			message.error('Ошибка удаления задачи');
		}
	};

	useEffect(() => {
		loadTasks();
	}, []);

	return (
		<>
			<Typography.Title level={2}>Задачи</Typography.Title>

			<Row gutter={20}>
				<Col span={8}>
					<Card title="Создать задачу">
						<TaskForm onCreated={loadTasks} />
					</Card>
				</Col>

				<Col span={16}>
					<Card title="Список задач">
						<TasksTable
							tasks={tasks}
							onDelete={handleDelete}
							onEdit={(task: Task) => {
								setEditingTask(task);
								setModalOpen(true);
							}}
						/>
					</Card>
				</Col>
			</Row>

			<EditTaskModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				task={editingTask}
				onUpdated={loadTasks}
			/>
		</>
	);
}
