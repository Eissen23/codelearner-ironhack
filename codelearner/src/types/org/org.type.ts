export type Org = {
  id: number;
  org_name: string;
  contact_email: string;
  description: string;
  website?: string;
  logo?: string;
  created_at: Date;
  updated_at: Date;
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
