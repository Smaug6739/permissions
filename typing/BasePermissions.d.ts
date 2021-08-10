interface IObject {
    [index: string]: any;
}
export declare class BasePermissions {
    permissions: Array<IObject>;
    constructor(permissions: Array<IObject>);
    get ALL(): number;
}
export {};
