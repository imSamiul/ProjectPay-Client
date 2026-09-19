import { ManagerType } from "@/types/manager";
import { LinkedClientType } from "@/types/client";
import { PaymentType } from "@/types/payment";

export type ProjectType = {
  _id?: string;
  projectCode?: string;
  name: string;
  budget: number;
  advance: number;
  due?: number;
  totalPaid?: number;
  startDate?: string;
  endDate: string;
  demoLink: string;
  typeOfWeb: string;
  description: string;
  status?: boolean;
  projectManager?: ManagerType;
  clients?: LinkedClientType[];
  paymentList?: PaymentType[];
};

export type UpdateProjectStatusType = {
  projectCode: string;
  status: boolean;
};

export type UpdateProjectType = {
  projectCode: string;
  name: string;
  budget: number;
  advance: number;
  endDate: string;
  demoLink: string;
  typeOfWeb: string;
  description: string;
};

export type ProjectDeleteModalPropsType = {
  modalId: string;
  projectName: string;
  projectCode: string;
  projectId: string;
};
