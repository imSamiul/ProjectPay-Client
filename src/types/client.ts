export type LinkedClientType = {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  clientKey?: string;
};

export type ManagerClientRow = {
  clientId: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientKey?: string;
  projectId: string;
  projectCode: string;
  projectName: string;
  budget: number;
  due: number;
  status: boolean;
};
