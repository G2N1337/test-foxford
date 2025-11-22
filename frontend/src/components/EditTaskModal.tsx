import { Modal, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { updateTask } from '../api/tasks';
import type { Task } from '../types/task';

interface Props {
	open: boolean;
	onClose: () => void;
	task: Task | null;
	onUpdated: () => void;
}

export default function EditTaskModal({
	open,
	onClose,
	task,
	onUpdated,
}: Props) {
	const [form] = Form.useForm();

	useEffect(() => {
		if (task) {
			form.setFieldsValue({
				title: task.title,
				description: task.description,
			});
		}
	}, [task]);

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			if (!task) return;

			await updateTask(task.id, values);
			message.success('Задача обновлена');
			onUpdated();
			onClose();
		} catch {
			message.error('Ошибка обновления');
		}
	};

	return (
		<Modal
			title="Редактировать задачу"
			open={open}
			onOk={handleOk}
			onCancel={onClose}
			okText="Сохранить"
			cancelText="Отмена"
		>
			<Form layout="vertical" form={form}>
				<Form.Item
					name="title"
					label="Название"
					rules={[{ required: true, message: 'Введите название' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item name="description" label="Описание">
					<Input.TextArea rows={3} />
				</Form.Item>
			</Form>
		</Modal>
	);
}
