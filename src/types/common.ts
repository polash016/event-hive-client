import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export type IUserRole = keyof typeof USER_ROLE;

export interface INavbarItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: INavbarItem[];
}

export interface ISuccessResponse {
  data: any;
  meta?: IMeta;
  message?: string;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: IErrorMassage[];
}

interface IErrorMassage {
  path: string;
  message: string;
}
