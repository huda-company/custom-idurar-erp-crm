import React, { useLayoutEffect } from 'react';

import DataTable from './DataTable';
import CreateBill from './CreateBill';

import UpdateItem from './UpdateItem';
import Delete from './DeleteItem';
import ReadItemBill from './ReadItemBill';
import Payment from './Payment';

import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';

import { useErpContext } from '@/context/erp';

const Visibility = ({ isVisible, children }) => {
  const show = isVisible ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return <div style={show}>{children}</div>;
};

export default function ErpPanel({ config, CreateForm, UpdateForm, DataTableDropMenu }) {
  const dispatch = useDispatch();
  const { state } = useErpContext();
  const { update, read, create, recordPayment, dataTableList, deleteModal } = state;
  useLayoutEffect(() => {
    dispatch(erp.resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Visibility isVisible={dataTableList.isOpen}>
        <DataTable config={config} DataTableDropMenu={DataTableDropMenu} />
      </Visibility>
      <Visibility isVisible={read.isOpen}>
        <ReadItemBill config={config} />
      </Visibility>
      <Visibility isVisible={recordPayment.isOpen}>
        <Payment config={config} />
      </Visibility>
      <Visibility isVisible={update.isOpen}>
        <UpdateItem config={config} UpdateForm={UpdateForm} />
      </Visibility>
      <Visibility isVisible={create.isOpen}>
        <CreateBill config={config} CreateForm={CreateForm} />
      </Visibility>

      <Delete config={config} isVisible={deleteModal.isOpen} />
    </>
  );
}
