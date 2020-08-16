declare module '@sapper/app';
declare module '@sapper/server';
declare module '@sapper/service-worker';
declare module '*.adoc';
declare function SapperPreload(
    this: {
        fetch: (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>
    },
    page: {host: string, path: string, params: any, query: any},
    session: any,
): any;
