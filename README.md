# Permissions

This module is a manager for permissions. With this module you can defined and host the permissions of user as a integer which makes it possible to limit the use of memory.

## How it work ?

It work with a bitwise operations using the bigint library.

## Getting started

Prerequisites

Node.js 12.0.0 or newer is required.

### Instalation

With npm :

```sh-session
npm install permissions
```

With yarn :

```sh-session
yarn add permissions
```

## Usage

Import the module from node_modules :

With CommonJS syntax :

```js
const { Permissions } = require("permissions");
```

With module syntax :

```js
import { Permissions } = from 'permissions';
```

Create a new Permissions with all available permissions as a parameter (an array).

| PARAMETER        | TYPE                | OPTIONAL | DEFAULT | DESCRIPTION               |
| ---------------- | ------------------- | -------- | ------- | ------------------------- |
| permissions      | Array\<string>      | ✖️       | none    | All available permissions |
| user permissions | int, bigint, string | ✓        | none    | The user permissions      |

Note : The order of the permissions is verry important, after choosing it you can add new permissions but at the end of array.

Example : `new Permissions(['ADMINISTRATOR', 'VIEW_ALL_MEMBERS', 'UPDATE_MEMBERS', 'DELETE_MEMBERS', 'BAN_MEMBERS'])`.

## Properties

---

### Permissions.default

Return the default permissions as a integer.  
Type : Number

### Permissions.MAX

Return the max permission as a string.  
Type : String

### Permissions.permissionCalc

The permissions of user (has a string).  
Type : String

## Methods

---

## Permissions#find(name)

Find the permission value bay name

Params :

- name : The name of permission (string or Array\<string>)

Return :

The permission (Array\<Object> or empty array)

```js
console.log(userPermissions.find(4));
```

## Permissions#toArray()

Return an array of permissions

Return :

Array\<permission>

```js
console.log(userPermissions.toArray());
```

## Permissions#toString()

Return the permissions names of user (separate by \`, `)

Return :

String\<permission>

```js
console.log(userPermissions.toString());
```

## Permissions#hasAnyPermissions()

Return true if the user has at least one permission.

Return :

Boolean

```js
console.log(userPermissions.hasAnyPermissions());
```

## Permissions#hasPermission(permission)

Return true if user have permission(s).

Params :

permission : The permission to check (Array, String, Number)

Return :

Object

```js
console.log(userPermissions.hasPermission([3]));
```

## Permissions#missing(permissions)

Return the missings permissions of user in the parameter.

Params :

permissions : The permissions to test (Array, String, Number)

Return :

Object

```js
console.log(userPermissions(["3"]));
```

## Permissions#equals(other)

Return true if user permissions are equal to parameter.

Params :

- other : The compared (Array, String, Number)

Return :

Boolean

```js
console.log(userPermissions.equals([100, 100]));
```

## Permissions#addAllPermissions()

Add all permissions from user.

Return :

String (the new bits permissions)

```js
console.log(userPermissions.addAllPermissions());
```

## Permissions#addPermission(permission)

Add a permission to a user.

Params :

- permission : The permission to add (string | Array\<string> | number)

Return :

String (the new bits of permissions.)

```js
console.log(userPermissions.addPermission("ADMINISTRATOR"));
```

## Permissions#removeAllPermissions()

Remove all permissions of the user.

Return :

String (the new bits of permissions).

```js
console.log(userPermissions.removeAllPermissions());
```

## Permissions#removePermission(permission)

Remove a permission to a user.

Params :

- permission : The permission to remove (string | Array\<string>) | number

Return :

String (the new bits of permissions.)

```js
console.log(userPermissions.removePermission("ADMINISTRATOR"));
```

## Example

```js
const { Permissions } = require("permissions");
const permissionsList = [
  "ADMINISTRATOR",
  "VIEW_ALL_MEMBERS",
  "UPDATE_MEMBERS",
  "DELETE_MEMBERS",
  "BAN_MEMBERS",
];
const userPermissions = new Permissions(permissionsList, 100);

console.log(`Default : ${userPermissions.default}`);
console.log(`Max : ${userPermissions.MAX}`);
console.log("User bits : " + userPermissions.permissionCalc);
console.log(userPermissions.find(4));
console.log(userPermissions.toArray());
console.log(userPermissions.toString());
console.log(userPermissions.hasAnyPermissions());
console.log(userPermissions.missing([3]));
console.log(userPermissions.equals([100, 100]));

console.log(userPermissions.addPermission("ADMINISTRATOR"));
console.log(userPermissions.removePermission("ADMINISTRATOR"));
console.log(userPermissions.addAllPermissions());
console.log(userPermissions.removeAllPermissions());
```
