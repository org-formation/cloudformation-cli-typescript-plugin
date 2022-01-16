export type Optional<T> = T | undefined | null;
export type Dict<T = any> = Record<string, T>;
export type Constructor<T = {}> = new (...args: any[]) => T;
// export type integer = bigint;

// export type InstanceProperties<
//     T extends object = Service,
//     C extends Constructor<T> = Constructor<T>
// > = keyof InstanceType<C>;

// export type ServiceProperties<
//     S extends Service = Service,
//     C extends Constructor<S> = Constructor<S>
// > = Exclude<
//     InstanceProperties<S, C>,
//     InstanceProperties<Service, Constructor<Service>>
// >;

// export type OverloadedArguments<T> = T extends {
//     (...args: any[]): any;
//     (params: infer P, callback: any): any;
//     (callback: any): any;
// }
//     ? P
//     : T extends {
//           (params: infer P, callback: any): any;
//           (callback: any): any;
//       }
//     ? P
//     : T extends (params: infer P, callback: any) => any
//     ? P
//     : any;

// export type OverloadedReturnType<T> = T extends {
//     (...args: any[]): any;
//     (params: any, callback: any): infer R;
//     (callback: any): any;
// }
//     ? R
//     : T extends {
//           (params: any, callback: any): infer R;
//           (callback: any): any;
//       }
//     ? R
//     : T extends (callback: any) => infer R
//     ? R
//     : any;

// export interface Callable<R extends Array<any>, T> {
//     (...args: R): T;
// }

// // interface Integer extends BigInt {
// //     /**
// //      * Defines the default JSON representation of
// //      * Integer (BigInt) to be a number.
// //      */
// //     toJSON(): number;

// //     /** Returns the primitive value of the specified object. */
// //     valueOf(): integer;
// // }

// // interface IntegerConstructor extends BigIntConstructor {
// //     (value?: unknown): integer;
// //     readonly prototype: Integer;
// //     /**
// //      * Returns true if the value passed is a safe integer
// //      * to be parsed as number.
// //      * @param value An integer value.
// //      */
// //     isSafeInteger(value: unknown): boolean;
// // }

// // /**
// //  * Wrapper with additional JSON serialization for bigint type
// //  */
// // export const Integer: IntegerConstructor = new Proxy(BigInt, {
// //     apply(
// //         target: IntegerConstructor,
// //         _thisArg: unknown,
// //         argArray?: unknown[]
// //     ): integer {
// //         target.prototype.toJSON = function (): number {
// //             return Number(this.valueOf());
// //         };
// //         const isSafeInteger = (value: unknown): boolean => {
// //             if (
// //                 value &&
// //                 (value < BigInt(Number.MIN_SAFE_INTEGER) ||
// //                     value > BigInt(Number.MAX_SAFE_INTEGER))
// //             ) {
// //                 return false;
// //             }
// //             return true;
// //         };
// //         target.isSafeInteger = isSafeInteger;
// //         const value = target(...argArray);
// //         if (value && !isSafeInteger(value)) {
// //             throw new RangeError(`Value is not a safe integer: ${value.toString()}`);
// //         }
// //         return value;
// //     },
// // }) as IntegerConstructor;

export enum Action {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    LIST = 'LIST',
}

export enum StandardUnit {
    COUNT = 'Count',
    MILLISECONDS = 'Milliseconds',
}

export enum MetricTypes {
    HANDLER_EXCEPTION = 'HandlerException',
    HANDLER_INVOCATION_COUNT = 'HandlerInvocationCount',
    HANDLER_INVOCATION_DURATION = 'HandlerInvocationDuration',
}

export enum OperationStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum HandlerErrorCode {
    NOT_UPDATABLE = 'NotUpdatable',
    INVALID_REQUEST = 'InvalidRequest',
    ACCESS_DENIED = 'AccessDenied',
    INVALID_CREDENTIALS = 'InvalidCredentials',
    ALREADY_EXISTS = 'AlreadyExists',
    NOT_FOUND = 'NotFound',
    RESOURCE_CONFLICT = 'ResourceConflict',
    THROTTLING = 'Throttling',
    SERVICE_LIMIT_EXCEEDED = 'ServiceLimitExceeded',
    NOT_STABILIZED = 'NotStabilized',
    GENERAL_SERVICE_EXCEPTION = 'GeneralServiceException',
    SERVICE_INTERNAL_ERROR = 'ServiceInternalError',
    NETWORK_FAILURE = 'NetworkFailure',
    INTERNAL_FAILURE = 'InternalFailure',
}

export interface Credentials {
    readonly accessKeyId: string;
    readonly secretAccessKey: string;
    readonly sessionToken: string;
}

/**
 * Base class for data transfer objects that will contain
 * serialization and deserialization mechanisms.
 * @internal
 */
 export interface IBaseDto {
    (partial?: unknown): any;
    serialize(removeNull: boolean): Dict;
    toJSON(): Dict;
}

export interface RequestContext<T> {
    readonly invocation: number;
    readonly callbackContext: T;
    readonly cloudWatchEventsRuleName: string;
    readonly cloudWatchEventsTargetId: string;
}

export interface IBaseModel extends IBaseDto {
    // ['constructor']: IBaseModel;
    typeName: string;
}

export interface TestEvent {
    readonly credentials: Credentials;
    readonly action: Action;
    readonly request: Dict;
    readonly callbackContext: Dict;
    readonly region?: string;
}

export interface RequestData<T = Dict> {
    readonly resourceProperties: T;
    readonly providerLogGroupName?: string;
    readonly logicalResourceId?: string;
    readonly systemTags?: Dict<string>;
    readonly stackTags?: Dict<string>;
    // platform credentials aren't really optional, but this is used to
    // zero them out to prevent e.g. accidental logging
    readonly callerCredentials?: Credentials;
    readonly providerCredentials?: Credentials;
    readonly previousResourceProperties?: T;
    readonly previousStackTags?: Dict<string>;
}

export interface HandlerRequest<ResourceT = Dict, CallbackT = Dict> {
    readonly action: Action;
    readonly awsAccountId: string;
    readonly bearerToken: string;
    readonly region: string;
    readonly requestData: RequestData<ResourceT>;
    readonly responseEndpoint?: string;
    readonly stackId?: string;
    readonly resourceType?: string;
    readonly resourceTypeVersion?: string;
    readonly callbackContext?: CallbackT;
    readonly nextToken?: string;
    readonly requestContext?: RequestContext<CallbackT>;
}

export interface BaseResourceHandlerRequest<T extends IBaseModel> {
    readonly clientRequestToken: string;
    readonly desiredResourceState?: T;
    readonly previousResourceState?: T;
    readonly desiredResourceTags: Dict<string>;
    readonly previousResourceTags: Dict<string>;
    readonly systemTags: Dict<string>;
    readonly awsAccountId: string;
    readonly awsPartition: string;
    readonly logicalResourceIdentifier?: string;
    readonly nextToken?: string;
    readonly region: string;
}

export interface CfnResponse<T extends IBaseModel> {
    readonly errorCode?: HandlerErrorCode;
    readonly status: OperationStatus;
    readonly message: string;
    readonly resourceModel?: T;
    readonly resourceModels?: T[];
    readonly nextToken?: string;
}
