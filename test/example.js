const { Permissions } = require('../dist/index')
const permissionsList = [
	{ value: 1 << 1, name: 'ADMINISTRATOR' },
	{ value: 1 << 2, name: 'MANAGE_AUTH' },
	{ value: 1 << 3, name: 'VIEW_ALL_MEMBERS' },
	{ value: 1 << 4, name: 'UPDATE_MEMBERS' },
	{ value: 1 << 5, name: 'DELETE_MEMBERS' },
	{ value: 1 << 6, name: 'BAN_MEMBERS' },
]
const permsList = ['ADMINISTRATOR', 'MANAGE_AUTH', 'VIEW_ALL_MEMBERS', 'UPDATE_MEMBERS', 'DELETE_MEMBERS', 'BAN_MEMBERS']
const per = new Permissions(permsList, 100)

console.log(per);
console.log(`Default : ${per.default}`);
console.log(`Max : ${per.MAX}`);
console.log('User bits : ' + per.permissionCalc);
console.log(per.find(4));
console.log(per.toArray());
console.log(per.toString());
console.log(per.hasAnyPermissions());
console.log(per.missing([3]));
console.log(per.equals([100, 100]));

console.log(per.addAllPermissions());
console.log(per.addPermission('ADMINISTRATOR'));
console.log(per.removePermission('ADMINISTRATOR'));
console.log(per.removePermission('ADMINISTRATOR'));