
declare module "@sapper/app"
declare module "@sapper/server"
declare module "@sapper/service-worker"
declare module '*.adoc';
declare module 'sirv';
declare module 'polka';
declare module 'compression';

declare module "@sapper/app" {
	export interface Redirect {
		statusCode: number
		location: string
	}

	export function goto(href: string, opts: { noscroll?: boolean, replaceState?: boolean }): Promise<void>;
	export function prefetch(href: string): Promise<{ redirect?: Redirect; data?: unknown }>;
	export function prefetchRoutes(pathnames: string[]): Promise<void>;
	export function start(opts: { target: Node }): Promise<void>;
	export const stores: () => unknown;
}

declare module "@sapper/server" {
	import { Handler, Req, Res } from '@sapper/internal/manifest-server';

	export type Ignore = string | RegExp | ((uri: string) => boolean) | Ignore[];

	export interface MiddlewareOptions {
		session?: (req: Req, res: Res) => unknown
		ignore?: Ignore
	}

	export function middleware(opts: MiddlewareOptions): Handler;
}

declare module "@sapper/service-worker" {
	export const timestamp: number;
	export const files: string[];
	export const assets: string[];
	export const shell: string[];
	export const routes: Array<{ pattern: RegExp }>;
}

// tslint:disable:file-header
/**
 * Copyright (c) 2016, Tiernan Cridland
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without
 * fee is hereby
 * granted, provided that the above copyright notice and this permission notice appear in all
 * copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 * SOFTWARE INCLUDING ALL
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
 * SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
 * PROFITS, WHETHER
 * IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION
 * WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 *
 * Typings for Service Worker
 * @author Tiernan Cridland
 * @email tiernanc@gmail.com
 * @license: ISC
 */
interface ExtendableEvent extends Event {
	waitUntil(fn: Promise<any>): void;
  }
  
  // Client API
  
  /*declare class Client {
	frameType: ClientFrameType;
	id: string;
	url: string;
	postMessage(message: any): void;
  }*/
  
  interface Clients {
	claim(): Promise<any>;
	get(id: string): Promise<Client>;
	matchAll(options?: ClientMatchOptions): Promise<Array<Client>>;
  }
  
  interface ClientMatchOptions {
	includeUncontrolled?: boolean;
	type?: ClientMatchTypes;
  }
  
  interface WindowClient {
	focused: boolean;
	visibilityState: WindowClientState;
	focus(): Promise<WindowClient>;
	navigate(url: string): Promise<WindowClient>;
  }
  
  type ClientFrameType = 'auxiliary'|'top-level'|'nested'|'none';
  type ClientMatchTypes = 'window'|'worker'|'sharedworker'|'all';
  type WindowClientState = 'hidden'|'visible'|'prerender'|'unloaded';
  
  // Fetch API
  
  interface FetchEvent extends ExtendableEvent {
	clientId: string|null;
	request: Request;
	respondWith(response: Promise<Response>|Response): Promise<Response>;
  }
  
  interface InstallEvent extends ExtendableEvent {
	activeWorker: ServiceWorker;
  }
  
  interface ActivateEvent extends ExtendableEvent {}
  
  // Notification API
  
  interface NotificationEvent extends ExtendableEvent {
	action: string;
	notification: Notification;
  }
  
  // Push API
  
  interface PushEvent extends ExtendableEvent {
	data: PushMessageData;
  }
  
  interface PushMessageData {
	arrayBuffer(): ArrayBuffer;
	blob(): Blob;
	json(): any;
	text(): string;
  }
  
  // Sync API
  
  interface SyncEvent extends ExtendableEvent {
	lastChance: boolean;
	tag: string;
  }
  
  interface ExtendableMessageEvent extends ExtendableEvent {
	data: any;
	source: Client|Object;
  }
  
  // ServiceWorkerGlobalScope
  
  interface ServiceWorkerGlobalScope {
	caches: CacheStorage;
	clients: Clients;
	registration: ServiceWorkerRegistration;
  
	addEventListener(event: 'activate', fn: (event?: ExtendableEvent) => any): void;
	addEventListener(event: 'message', fn: (event?: ExtendableMessageEvent) => any): void;
	addEventListener(event: 'fetch', fn: (event?: FetchEvent) => any): void;
	addEventListener(event: 'install', fn: (event?: ExtendableEvent) => any): void;
	addEventListener(event: 'push', fn: (event?: PushEvent) => any): void;
	addEventListener(event: 'notificationclick', fn: (event?: NotificationEvent) => any): void;
	addEventListener(event: 'sync', fn: (event?: SyncEvent) => any): void;
  
	fetch(request: Request|string): Promise<Response>;
	skipWaiting(): Promise<void>;
  }
  