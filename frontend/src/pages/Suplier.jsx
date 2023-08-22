import React from 'react';

import CrudModule from '@/modules/CrudModule';
import CustomerForm from '@/forms/CustomerForm';
import SupplierForm from '@/forms/SupplierForm';

function Suplier() {
  const entity = 'supplier';

  const searchConfig = {
    displayLabels: ['company'],
    searchFields: 'company,managerSurname,managerName',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['company'];

  const readColumns = [
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Manager Surname',
      dataIndex: 'managerSurname',
    },
    {
      title: 'Manager Name',
      dataIndex: 'managerName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'tel',
    },
    {
      title: 'Phone',
      dataIndex: 'tel',
    },
    {
      title: 'Bank Account',
      dataIndex: 'bankAccount',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const dataTableColumns = [
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Manager Surname',
      dataIndex: 'managerSurname',
    },
    {
      title: 'Manager Name',
      dataIndex: 'managerName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const ADD_NEW_ENTITY = 'Add New Suplier';
  const DATATABLE_TITLE = 'Suplier List';
  const ENTITY_NAME = 'suplier';
  const CREATE_ENTITY = 'Create suplier';
  const UPDATE_ENTITY = 'Update suplier';
  const PANEL_TITLE = 'Suplier Panel';

  const config = {
    entity,
    PANEL_TITLE,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule

      createForm={<SupplierForm />}
      updateForm={<SupplierForm isUpdateForm={true} />}

      config={config}
    />
  );
}

export default Suplier;
