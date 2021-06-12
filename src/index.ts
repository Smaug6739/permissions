import type { IObject } from './types'

/**
 * Create a Permissions class.
 * @class 
 * @param {Array<Object>} [permissions] - The list of permissions.
 * @param {Bits} [bits = 0] - Actual permissions of user.
 */
class Permissions {
	private bits: bigint = 0n; // User bits permissions
	private permissions: Array<IObject>;
	constructor(permissions: Array<IObject>, bits: bigint) {
		if (!permissions) throw new TypeError("Permissions must be specified.")
		if (bits) this.bits = BigInt(bits);
		const permsArray: Array<IObject> = [];
		permissions.forEach((p, i) => {
			permsArray.push({
				name: p,
				value: BigInt(1 << i)
			})
		})
		this.permissions = permsArray;
	}
	/**
	 * The default permission.
	 * @type {number} The default permission as a bit.
	 */

	get default() {
		return 0
	}
	/**
	 * Return all permissions as a integer.
	 * @type {number} The bits permissions.
	 */

	get MAX() {
		let bit = BigInt(0);
		for (let flag of this.permissions) {
			bit += flag.value
		}
		return bit.toString()
	}

	/**
	 * Return the permissions of member as a number.
	 * @type {number} Return the bits of the permissions of user.
	 */
	get permissionCalc() {
		return this.bits.toString();
	}

	/**
	 * Get the value of the permission required.
	 * @param {string|Array<string>} permissions The permission(s).
	 * @returns {number} The value of permission(s) as a number.
	 */
	public find(permissions: string | string[]) {
		if (typeof permissions === 'string' || typeof permissions === 'number') {
			const permission = this.permissions.find(f => f.name === permissions.toString().toUpperCase() || f.value === permissions);
			return permission ? permission : undefined;
		}
		if (Array.isArray(permissions)) {
			let result: Array<IObject> = [];
			permissions.map(p => {
				const permission = this.permissions.find(perm => perm.name === p.toString().toUpperCase() || perm.value === p)
				if (permission) result.push(permission);
			})
			return result
		}
	}

	/**
	 * Return the permissions of user as an array
	 * @returns {Array<string>} An array of permissions as a string.
	 */
	public toArray(): Array<string> {

		let userPermissions: string[] = []
		for (const permission of this.permissions) {
			if (this.bits & permission.value) userPermissions.push(permission.name)
		}
		return userPermissions
	}

	/**
	 * The permissions of user as a string.
	 * @returns {string} A string representation of user permissions separated by `, `.
	 */
	public toString(): string {
		return this.toArray().join(', ')
	}
	/**
	 * Calcul the permissions of user
	 * @returns {Array}
	 */
	public calculate() {
		let bits = this.bits;
		const flags = [...this.permissions].reverse()
		const userPermissions: any[] = []
		for (let permission of flags) {
			const rest = bits % permission.value;
			if (rest == 0n && bits != 0n) {
				userPermissions.push(permission);
				break;
			}
			if (rest < bits) {
				userPermissions.push(permission);
				bits = rest
			}
		}
		return userPermissions
	}
	/**
	 * Check if the user have permissions.
	 * @returns {boolean} true if the user has permissions
	 */
	public hasAnyPermissions(): boolean {
		if (this.bits > 0) return true;
		return false;
	}

	/**
	 * Check if the user has a specific permission.
	 * @param {Array<string>|String|Number} [permission] The permission required.
	 * @returns {boolean} Return true if user has the specified permission.
	 */
	public hasPermissions(permission: any): boolean {
		if (Array.isArray(permission)) return permission.every(p => this.hasPermissions(p))
		const permissionsArray = this.toArray();
		if (permissionsArray.includes('ADMINISTRATOR')) return true;
		if (typeof permission === 'string') {
			if (permissionsArray.includes(permission)) return true;
			else return false;
		}
		if (typeof permission === 'number') {
			let hasPermissions = false;
			this.calculate().map(p => {
				if (p.value === permission) hasPermissions = true;
			})
			return hasPermissions;
		}
		return false
	}

	/**
	 * Check if the user have specified permissions.
	 * @param {string|Array<string|number>|number} permissionsList The permissions list.
	 * @returns {null|permissions} Return null if user have all permissions or the missings permissions.
	 */
	public missing(permissionsList: (string | string[] | number)) {
		if (Array.isArray(permissionsList)) permissionsList.every(pl => this.missing(pl));
		if (!this.hasPermissions(permissionsList)) return permissionsList;
		return null;
	}

	/**
	 * 
	 * @param {string|number|Array<string|number>} permissionsother The permission(s) to compare.
	 * @returns {boolean} true if the permissions specified are the same of user and false otherwise.
	 */
	public equals(other: string | number | Array<string | number>): Array<string | bigint> | boolean {
		let total = 0;
		if (Array.isArray(other)) return other.every(o => this.equals(o))
		if (typeof other === 'string') {
			if (this.toArray().includes(other)) return true;
		}
		if (typeof other === 'number') {
			if (this.bits == BigInt(other)) return true;
		}
		if (BigInt(total) === this.bits) return true;
		return false;
	}

	/**
	 * Add all permissions to the user.
	 * @returns {number} the new permissions bits.
	 */
	public addAllPermissions() {
		this.bits = BigInt(this.MAX);
		return this.bits.toString()
	}

	/**
	 * Add a permission to a user.
	 * @param {string|Array<string>|number} permissionToAdd The new permission for user.
	 * @returns {number} the new bits of permissions.
	 */
	public addPermission(permissionToAdd: (string | string[] | number)): (string | TypeError | boolean) {
		const type = typeof permissionToAdd
		if (Array.isArray(permissionToAdd)) return permissionToAdd.every(pta => this.addPermission(pta));
		if (type === 'string') {
			const permission = this.permissions.find(p => p.name === permissionToAdd)
			const has: any = this.calculate().filter(p => p.name === permission?.name);
			if (has || !has.length) return this.bits.toString();
			if (!permission) return new TypeError('Permission does not exist.');
			this.bits += permission.value;
			return this.bits.toString();
		}
		if (type === 'number') {
			const permission = this.permissions.find(p => p.value === permissionToAdd);
			const has: any = this.calculate().filter(p => p.value === permission?.value);
			if (has || !has.length) return this.bits.toString();
			if (!permission) return new TypeError('Permission does not exist.');
			this.bits += permission.value;
			return this.bits.toString();
		}
		return new TypeError('The permission must be a string, an array or a number.');
	}

	/**
	 * Remove all permissions of the user.
	 * @returns {number} the new bits of permissions.
	 */
	public removeAllPermissions() {
		this.bits = 0n;
		return this.bits.toString()
	}

	/**
	 * Remove a permission to as user.
	 * @param {string|Array<string>|number} permissionToAdd The permission to remove for user.
	 * @returns {number} the new bits of permissions.
	 */
	public removePermission(permissionToRemove: (string | string[] | number)): (string | TypeError | boolean) {
		const type = typeof permissionToRemove
		if (Array.isArray(permissionToRemove)) return permissionToRemove.every(pta => this.addPermission(pta));
		if (type === 'string') {
			const permission = this.permissions.find(p => p.name === permissionToRemove);
			const has: any = this.calculate().filter(p => p.name === permission?.name);
			if (!has || !has.length) return this.bits.toString();
			if (!permission) return new TypeError('Permission does not exist.');
			this.bits -= permission.value;
			return this.bits.toString();
		}
		if (type === 'number') {
			const permission = this.permissions.find(p => p.value === permissionToRemove);
			const has: any = this.calculate().filter(p => p.value === permission?.value);
			if (!has || !has.length) return this.bits.toString();
			if (!permission) return new TypeError('Permission does not exist.');
			this.bits -= permission.value;
			return this.bits.toString();
		}
		return new TypeError('The permission must be a string, an array or a number.')
	}
}

export {
	Permissions
}
