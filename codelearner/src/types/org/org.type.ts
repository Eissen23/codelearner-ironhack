export type Org = {
  id: number;
  name: string;
  contact_email: string;
  description: string;
  website?: string;
  logo?: string; // Updated logo type to File
  created_at: Date;
  updated_at: Date;
  pivot?: Moderator;
};

export type OrgFormData = {
  name: string;
  contact_email: string;
  description: string;
  website?: string;
  logo?: File; // Updated logo type to File
};

export type Moderator = {
  user_id: number;
  org_id: number;
  role: string;
  created_at: Date;
};

export type CreateOrgResponse = {
  organization: Org;
  moderator: Moderator;
};

export type OrgListResponse = {
  org: Org[];
};

export type OrgUpdateRes = {
  message: string;
  data: Org;
};

export type OrgUser = {
  org_managed: Org[];
  org_mod: Org[];
  org_pending: Org[];
  org_reject: Org[];
};
