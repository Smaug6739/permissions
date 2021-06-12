interface IObject {
	[index: string]: any
}
export class BasePermissions {
	public permissions: Array<IObject>;
	constructor(permissions: Array<IObject>) {
		this.permissions = permissions
	}
	get ALL() {
		let bit = 0;
		for (let flag of this.permissions) {
			bit += flag.value
		}
		return bit
	}
}