interface Type {
  id: number;
  name: string;
}

interface OrganizationResponse {
  id: number;
  name: string;
  code: string;
  contactEmail: string;
  type: Type;
}

interface OrganizationRoleDTO {
  id: number;
  name: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  organizations: Array<{
    organizationResponse: OrganizationResponse;
    organizationRoleDTO: OrganizationRoleDTO;
  }>;
  appRole: Type;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    roles: string[];
    accessToken: string;
    refreshToken: string;
  };
}

export interface refreshTokenResponce {
    success: boolean;
    message: null | string;
    data: {
      accessToken: string;
      refreshToken: string;
    };
}