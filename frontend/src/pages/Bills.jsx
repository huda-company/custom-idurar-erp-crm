import React from 'react';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import BillModule from '@/modules/BillModule';
import { useMoney } from '@/settings';

export default function Bills() {
  const { moneyRowFormatter } = useMoney();

  const entity = 'bill';
  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'name,surname,birthday',
  };
  const entityDisplayLabels = ['number', 'client.company'];
  const dataTableColumns = [
    {
      title: '#N',
      dataIndex: 'number',
    },
    {
      title: 'Suplier',
      dataIndex: ['supplier', 'company'],
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Due date',
      dataIndex: 'expiredDate',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (amount) => moneyRowFormatter({ amount }),
    },
    {
      title: 'Balance',
      dataIndex: 'credit',
      render: (amount) => moneyRowFormatter({ amount }),
    },
    {
      title: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = status === 'draft' ? 'cyan' : status === 'sent' ? 'magenta' : 'gold';

        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      render: (paymentStatus) => {
        let color =
          paymentStatus === 'unpaid'
            ? 'volcano'
            : paymentStatus === 'paid'
            ? 'green'
            : paymentStatus === 'overdue'
            ? 'red'
            : 'purple';

        return <Tag color={color}>{paymentStatus && paymentStatus.toUpperCase()}</Tag>;
      },
    },
  ];

  const PANEL_TITLE = 'bills';
  const dataTableTitle = 'Bills List';
  const ADD_NEW_ENTITY = 'Add new Bills';
  const DATATABLE_TITLE = 'Bills List';
  const ENTITY_NAME = 'bills';
  const CREATE_ENTITY = 'Save Bills';
  const UPDATE_ENTITY = 'Update Bills';

  const config = {
    entity,
    PANEL_TITLE,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <BillModule config={config} />;
}
