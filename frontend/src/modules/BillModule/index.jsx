import { ErpLayout } from '@/layout';
import BillPanel from '@/components/BillPanel';
import BillForm from './BillForm';
import DataTableDropMenu from './DataTableDropMenu';

export default function BillModule({ config }) {
  return (
    <ErpLayout>
      <BillPanel
        config={config}
        CreateForm={BillForm}
        UpdateForm={BillForm}
        DataTableDropMenu={DataTableDropMenu}
      ></BillPanel>
    </ErpLayout>
  );
}
