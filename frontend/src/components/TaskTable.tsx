import { Table, Button, Popconfirm } from 'antd';
import type { Task } from '../types/task';

interface Props {
	tasks: Task[];
	onEdit: (task: Task) => void;
	onDelete: (id: number) => void;
}

export default function TasksTable({ tasks, onEdit, onDelete }: Props) {
	const columns = [
		{ title: 'ID', dataIndex: 'id' },
		{ title: 'Название', dataIndex: 'title' },
		{ title: 'Автор', dataIndex: ['author', 'email'] },
		{ title: 'Исполнитель', dataIndex: ['assignee', 'email'] },
		{ title: 'Создана', dataIndex: 'createdAt' },
		{
			title: 'Действия',
			render: (_: unknown, task: Task) => (
				<>
					<Button type="link" onClick={() => onEdit(task)}>
						Редактировать
					</Button>
					<Popconfirm
						title="Удалить задачу?"
						okText="Да"
						cancelText="Нет"
						onConfirm={() => onDelete(task.id)}
					>
						<Button danger type="link">
							Удалить
						</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return <Table rowKey="id" columns={columns} dataSource={tasks} />;
}
