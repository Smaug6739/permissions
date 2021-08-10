import type { IObject } from './types';
/**
 * Create a Permissions class.
 * @class
 * @param {Array<Object>} [permissions] - The list of permissions.
 * @param {Bits} [bits = 0] - Actual permissions of user.
 */
declare class Permissions {
    private bits;
    private permissions;
    constructor(permissions: Array<IObject>, bits: bigint);
    /**
     * The default permission.
     * @type {number} The default permission as a bit.
     */
    get default(): number;
    /**
     * Return all permissions as a integer.
     * @type {number} The bits permissions.
     */
    get MAX(): string;
    /**
     * Return the permissions of member as a number.
     * @type {number} Return the bits of the permissions of user.
     */
    get permissionCalc(): string;
    /**
     * Get the value of the permission required.
     * @param {string|Array<string>} permissions The permission(s).
     * @returns {number} The value of permission(s) as a number.
     */
    find(permissions: string | string[]): IObject;
    /**
     * Return the permissions of user as an array
     * @returns {Array<string>} An array of permissions as a string.
     */
    toArray(): Array<string>;
    /**
     * The permissions of user as a string.
     * @returns {string} A string representation of user permissions separated by `, `.
     */
    toString(): string;
    /**
     * Calcul the permissions of user
     * @returns {Array}
     */
    calculate(): any[];
    /**
     * Check if the user have permissions.
     * @returns {boolean} true if the user has permissions
     */
    hasAnyPermissions(): boolean;
    /**
     * Check if the user has a specific permission.
     * @param {Array<string>|String|Number} [permission] The permission required.
     * @returns {boolean} Return true if user has the specified permission.
     */
    hasPermission(permission: any): boolean;
    /**
     * Check if the user have specified permissions.
     * @param {string|Array<string|number>|number} permissionsList The permissions list.
     * @returns {null|permissions} Return null if user have all permissions or the missings permissions.
     */
    missing(permissionsList: (string | string[] | number)): string | number | string[];
    /**
     *
     * @param {string|number|Array<string|number>} permissionsother The permission(s) to compare.
     * @returns {boolean} true if the permissions specified are the same of user and false otherwise.
     */
    equals(other: string | number | Array<string | number>): Array<string | bigint> | boolean;
    /**
     * Add all permissions to the user.
     * @returns {number} the new permissions bits.
     */
    addAllPermissions(): string;
    /**
     * Add a permission to a user.
     * @param {string|Array<string>|number} permissionToAdd The new permission for user.
     * @returns {number} the new bits of permissions.
     */
    addPermission(permissionToAdd: (string | string[] | number)): (string | TypeError | boolean);
    /**
     * Remove all permissions of the user.
     * @returns {number} the new bits of permissions.
     */
    removeAllPermissions(): string;
    /**
     * Remove a permission to as user.
     * @param {string|Array<string>|number} permissionToAdd The permission to remove for user.
     * @returns {number} the new bits of permissions.
     */
    removePermission(permissionToRemove: (string | string[] | number)): (string | TypeError | boolean);
}
export { Permissions };
