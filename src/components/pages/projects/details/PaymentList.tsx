import { LinkedClientType } from "@/types/client";
import { PaymentType } from "@/types/payment";
import PaymentListTable from "@/components/pages/projects/details/PaymentListTable";
import PaymentModal from "@/components/pages/projects/shared/PaymentModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

type PaymentListPropsType = {
  projectName: string;
  projectCode?: string;
  clients?: LinkedClientType[];
  due: number;
  projectId: string;
  paymentList: PaymentType[];
  isManager: boolean;
};

function PaymentList({
  projectName,
  projectCode,
  clients,
  due,
  projectId,
  paymentList,
  isManager,
}: PaymentListPropsType) {
  return (
    <Card className="border-border bg-card shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-lg md:text-xl">Payments</CardTitle>
        {isManager ? (
          <PaymentModal
            id="paymentModal"
            projectName={projectName}
            due={due}
            projectId={projectId}
          />
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Separator />
        {paymentList.length === 0 ? (
          <Empty className="border border-dashed border-border py-10">
            <EmptyHeader>
              <EmptyTitle>No payment found</EmptyTitle>
              <EmptyDescription>
                Add a payment to start tracking this project&apos;s balance.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <PaymentListTable
            data={paymentList}
            projectName={projectName}
            projectCode={projectCode}
            clients={clients}
            due={due}
            isManager={isManager}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default PaymentList;
