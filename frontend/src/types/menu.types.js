/**
 * @typedef {Object} IMenu
 * @property {string} id
 * @property {string} nome
 * @property {string} icone
 * @property {string} rota
 * @property {number} [ordem]
 * @property {boolean} [ativo]
 * @property {ISubMenu[]} [submenus]
 */

/**
 * @typedef {Object} ISubMenu
 * @property {string} id
 * @property {string} menuId
 * @property {string} nome
 * @property {string} rota
 * @property {number} [ordem]
 * @property {boolean} [ativo]
 */

/**
 * @typedef {Object} IPermission
 * @property {string} id
 * @property {string} roleId
 * @property {string} [menuId]
 * @property {string} [submenuId]
 */

/**
 * @typedef {Object} IMenuResponse
 * @property {IMenu[]} menus
 * @property {IPermission[]} permissions
 */

/**
 * @typedef {Object} IMenuTreeNode
 * @property {string} id
 * @property {string} nome
 * @property {string} icone
 * @property {string} rota
 * @property {number} [ordem]
 * @property {boolean} [ativo]
 * @property {boolean} temPermissao
 * @property {IMenuTreeNode[]} [submenus]
 */

/**
 * @typedef {Object} SubMenu
 * @property {number} id
 * @property {string} name
 * @property {string} path 
 * @property {number} menuId 
 */

/**
 * @typedef {Object} Menu
 * @property {number} id
 * @property {string} name
 * @property {string} icon 
 * @property {SubMenu[]} subMenus 
 */

/**
 * @typedef {Object} Permission
 * @property {number} id
 * @property {number} roleId
 * @property {number} menuId
 * @property {number|null} subMenuId
 * @property {boolean} canView
 * @property {boolean} canCreate
 * @property {boolean} canEdit
 * @property {boolean} canDelete
 * @property {Object} [role]
 * @property {Object} [menu]
 * @property {Object} [subMenu]
 */

/**
 * @typedef {Object} SidebarMenu 
 * @property {number} id
 * @property {string} name
 * @property {string} icon
 * @property {string} [path] 
 * @property {SidebarSubMenu[]} subMenus
 */

/**
 * @typedef {Object} SidebarSubMenu
 * @property {number} id
 * @property {string} name
 * @property {string} path
 * @property {PermissionFlags} permissions
 */

/**
 * @typedef {Object} PermissionFlags
 * @property {boolean} canView
 * @property {boolean} canCreate
 * @property {boolean} canEdit
 * @property {boolean} canDelete
 */

export {};
