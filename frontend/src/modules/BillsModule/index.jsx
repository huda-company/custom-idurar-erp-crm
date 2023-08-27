import { ErpLayout } from '@/layout';
import ErpPanel from '@/components/ErpPanel';
import BillsForm from './BillsForm';
import DataTableDropMenu from './DataTableDropMenu';

export default function BillsModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        CreateForm={BillsForm}
        UpdateForm={BillsForm}
        DataTableDropMenu={DataTableDropMenu}
      ></ErpPanel>
    </ErpLayout>
  );
}
