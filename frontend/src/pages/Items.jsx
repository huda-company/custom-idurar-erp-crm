import React from 'react';

import CrudModule from '@/modules/CrudModule';
import ItemsForm from '@/forms/ItemsForm';

function Items() {
  const entity = 'item';

  const searchConfig = {
    displayLabels: ['item'],
    searchFields: 'categoryId,name,description',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['item'];

  const readColumns = [
    {
      title: 'categoryId',
      dataIndex: 'categoryId',
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'enabled',
      dataIndex: 'enabled',
    },
  ];
  const dataTableColumns = [
    {
      title: 'categoryId',
      dataIndex: 'categoryId',
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'enabled',
      dataIndex: 'enabled',
    },
  ];

  const ADD_NEW_ENTITY = 'Add New Item';
  const DATATABLE_TITLE = 'Item List';
  const ENTITY_NAME = 'Item';
  const CREATE_ENTITY = 'Create Item';
  const UPDATE_ENTITY = 'Update Item';
  const PANEL_TITLE = 'Item Panel';

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
      createForm={<ItemsForm />}
      updateForm={<ItemsForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Items;
