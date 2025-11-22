import { Button, Form, Input, message } from 'antd';
import { createTask } from '../api/tasks';

interface TaskFormProps {
	onCreated: () => void;
}

export default function TaskForm({ onCreated }: TaskFormProps) {
	const [form] = Form.useForm();

	const onFinish = async (values: { title: string; description?: string }) => {
		try {
			await createTask(values.title, values.description || '');
			message.success('Задача создана');
			form.resetFields();
			onCreated();
		} catch {
			message.error('Не удалось создать задачу');
		}
	};

	return (
		<Form layout="vertical" form={form} onFinish={onFinish}>
			<Form.Item
				name="title"
				label="Название"
				rules={[{ required: true, message: 'Введите название задачи' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item name="description" label="Описание">
				<Input.TextArea rows={3} />
			</Form.Item>

			<Button type="primary" htmlType="submit" block>
				Создать задачу
			</Button>
		</Form>
	);
}
