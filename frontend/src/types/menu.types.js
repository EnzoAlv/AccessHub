export interface IMenu {
  id: string;
  nome: string;
  icone: string;
  rota: string;
  ordem?: number;
  ativo?: boolean;
  submenus?: ISubMenu[];
}

export interface ISubMenu {
  id: string;
  menuId: string;
  nome: string;
  rota: string;
  ordem?: number;
  ativo?: boolean;
}

export interface IPermission {
  id: string;
  roleId: string;
  menuId?: string;
  submenuId?: string;
}

export interface IMenuResponse {
  menus: IMenu[];
  permissions: IPermission[];
}

export interface IMenuTreeNode extends IMenu {
  temPermissao: boolean;
  submenus?: IMenuTreeNode[];
}
