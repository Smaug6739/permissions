# Permissions

This module is a manager for permissions. With this module you can defined and host the permissions of user as a integer which makes it possible to limit the use of memory.

## How it work ?

It work with a bitwise operations using the bigint library.

## Usage

Create a new Permissions with all available permissions as a parameter (an array).

|     PARAMETER    |      TYPE      |  OPTIONAL | DEFAULT | DESCRIPTION |
|------------------|----------------|-----------|---------|-------------|
|    permissions   | Array\<string> |    no     |   none  | All available permissions |
| user permissions | int, bigint, string |    ✓     |   none  | The user permissions |

**Note : The order of the permissions is verry important, after choosing it you can add new permissions but at the end of array.**

Example : `new Permissions(['ADMINISTRATOR', 'VIEW_ALL_MEMBERS', 'UPDATE_MEMBERS', 'DELETE_MEMBERS', 'BAN_MEMBERS'])`.

### Properties

- `default` : Return the default permissions as a integer.  
Type : Number  
  
- `MAX` : Return the max permission as a string.  
Type : String  
  
- `permissionCalc` : The permissions of user (has a string).  
Type : String  
  
### Methods
  
- `find()` : Find the permission value bay name  
Paramerer : string or Array\<string>  
Return : Object  

- `toArray()` : Return an array of permissions  
Return : Array

- `toString()` : Return the permissions names of user (separate by `, `)  
Return : String  

- `hasAnyPermissions()` : Return true if the user has at least one permission.  
Return : Boolean  
  
- `hasPermissions(permission)` : Return trus if user have permission(s).  
Parameter : Array, String, Number  
Return : Object  
  
- `missing(permissions)` : Return the missings permissions of user in the parameter.  
Parameter : Array, String, Number  
Return : Object  
  
- `equals(other)` : Return true if user permissions are equal to parameter.  
Parameter : Array, String, Number  
Return : Boolean  
  
- `addAllPermissions()` : Add all permissions from user.  
Return : String (the new bits permissions)  
  
- `addPermission(permission)` : Add a permission to a user.  
Parameter : string | Array\<string> | number (The new permission for user)  
Return : String (the new bits of permissions.)  
  
- `removeAllPermissions()` : Remove all permissions of the user.  
Return : String (the new bits of permissions).  
  
- `removePermission(permission)` : Remove a permission to a user.  
Parameter : string | Array\<string> | number (The new permission for user)  
Return : String (the new bits of permissions.)  
