export declare class GlobalMiddleWare {
    static checkError(req: any, res: any, next: any): any;
    static authenticate(req: any, res: any, next: any): Promise<void>;
    static adminAuthenticate(req: any, res: any, next: any): Promise<void>;
}
