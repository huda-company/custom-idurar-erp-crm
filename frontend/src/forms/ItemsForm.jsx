import React from 'react';
import { Form, Input } from 'antd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';

export default function ItemsForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="categoryId"
        name="categoryId"
        rules={[
          {
            required: true,
            message: 'Please input your !',
          },
        ]}
      >
        <AutoCompleteAsync
          entity={'itemCategories'}
          displayLabels={['name']}
          searchFields={'name,categoryId'}
          value={isUpdateForm === false ? '_id' : 'name'}
        />
      </Form.Item>
      <Form.Item
        label="description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your surname!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your manager name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item name="enabled" valuePropName="checked">
        <Checkbox>Enabled</Checkbox>
      </Form.Item> */}
    </>
  );
}
