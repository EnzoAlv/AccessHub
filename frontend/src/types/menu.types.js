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

export {};
