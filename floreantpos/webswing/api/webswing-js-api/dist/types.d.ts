export declare type WebswingApiRegister = {
    api: {
        [version: string]: (connectionUrl: string) => IWebswingApiFactory;
    };
};
export interface IWebswingApiFactory {
    /**
     * Get the connection URL.
     */
    getUrl: () => string;
    /**
     * Install CSS in the <head> seaction of current document.
     */
    installCSS: () => void;
    /**
     * Get API version.
     */
    getVersion: () => string;
    /**
     * Get the loaded translations, optionally reload.
     */
    getTranslations: (forceReload?: boolean) => Promise<ITranslations>;
    /**
     * Create a new Webswing API.
     */
    createWebswingApi: (i18n?: ITranslations) => Promise<IWebswingApi>;
}
export interface IWebswingApi {
    /**
     * Instantiate Webswing in given div element. Optionally configure startup options and customizations.
     */
    bootstrap: (element: HTMLElement, options?: WebswingOptions, customization?: (i: IInjectorApi) => void) => IWebswingInstance;
}
export interface IWebswingInstance {
    /**
     * This will initiate the connection to Webswing server and start the Swing application. If the autoStart is set to false or not defined in config object, the start function has to be called manually, otherwise the Webswing will call start function automatically.
     */
    start: () => void;
    /**
     * Disconnects the current Webswing session, but leaving the swing application running.
     */
    disconnect: () => void;
    /**
     * Configure instance options before start.
     */
    configure: (options?: any, appletParams?: any) => void;
    /**
     * Disconnects the current Webswing session with stopping the swing application.
     */
    kill: () => void;
    /**
     * Enables/disables the control of application. If set to false, no user events are sent to the Swing application.
     */
    setControl: (value: boolean) => void;
    /**
     * Notify webswing server that the application needs repaint.
     */
    repaint: () => void;
    /**
     * Returns current instance id.
     */
    instanceId: () => string | undefined;
    /**
     * Returns all instance windows (Swing windows, HtmlPanel windows and internal windows).
     */
    getWindows: (canvasOnly: boolean) => Array<HtmlOrCanvasWindow>;
    /**
     * Returns all instance windows (Swing windows, HtmlPanel windows and internal windows) that are rendered in current browser window.
     */
    getRenderedWindows: (canvasOnly: boolean) => Array<HtmlOrCanvasWindow>;
    /**
     * Find a window by its id.
     */
    getWindowById: (winId: string) => HtmlOrCanvasWindow | undefined;
    /**
     * Perform an action that triggers server-side listener.
     */
    performAction: (options: {
        actionName?: string;
        data?: string;
        binaryData?: Uint8Array;
        windowId?: string;
    }) => void;
    /**
     * Log out currently logged in user.
     */
    logout: (tabLogout?: boolean, closeOnSuccess?: boolean) => void;
    /**
     * Get information about this instance's connection to server.
     */
    getConnectionInfo: () => IConnectionInfo;
    /**
     * Is this script running in an undocked instance?
     */
    isUndocked: () => boolean;
    /**
     * Get extended API for managing files.
     */
    getFilesManager: () => IExternalFileManager;
}
export interface IExternalFileManager {
    uploadFile: (file: File) => void;
    filesSelected: (files: string[]) => void;
    downloadSelectedFile: () => void;
    deleteSelectedFile: () => void;
    getUploadMaxFileSize: () => number;
    cancelAllUploads: () => void;
    clearUploads: () => void;
    cancelAllDirectDownloads: () => void;
}
export interface IConnectionInfo {
    serverId?: string;
    sessionPoolId?: string;
    tabId?: string;
    instanceId?: string;
}
export interface ITranslations {
    translate: (key: string, vars?: any) => string;
    getLocale: () => string;
}
export declare type WebswingOptions = {
    autoStart?: boolean;
    autoReconnect?: number;
    disableLogout?: boolean;
    disableLogin?: boolean;
    syncClipboard?: boolean;
    securityToken?: string;
    realm?: string;
    args?: string;
    recording?: boolean;
    connectionUrl?: string;
    debugPort?: number;
    javaCallTimeout?: number;
    pingParams?: {
        count: number;
        interval: number;
        maxLatency: number;
        notifyIf: number;
        url?: string;
    };
    onReady?: (api: IWebswingApi) => void;
    onStart?: () => void;
    windowsListener?: {
        windowOpening(htmlOrCanvasWindow: HtmlOrCanvasWindow): void;
        windowOpened(htmlOrCanvasWindow: HtmlOrCanvasWindow): void;
        windowClosing(htmlOrCanvasWindow: HtmlOrCanvasWindow, windowCloseEvent: IWindowCloseEvent): void;
        windowClosed(htmlOrCanvasWindow: HtmlOrCanvasWindow): void;
        windowModalBlockedChanged(htmlOrCanvasWindow: HtmlOrCanvasWindow): void;
        windowUndocked(htmlOrCanvasWindow: HtmlOrCanvasWindow): void;
        windowDocked(htmlOrCanvasWindow: HtmlOrCanvasWindow): void;
    };
    [k: string]: any;
};
export declare type HtmlOrCanvasWindow = IHtmlWindow | ICanvasWindow;
export interface IHtmlWindow {
    readonly htmlWindow: true;
    internal: boolean;
    id: string;
    ownerId: string | null | undefined;
    parents: string[];
    element: HTMLElement | null;
    wrapper: HTMLElement | null;
    name: string | null | undefined;
    isModalBlocked: () => void;
    validatePositionAndSize: (x: number, y: number) => void;
    performAction: (options: {
        actionName?: string;
        data?: string;
        binaryData?: Uint8Array;
    }) => void;
    handleActionEvent: (actionName?: string | null, data?: string | null, binaryData?: Uint8Array | null) => void;
    windowClosing: (windowCloseEvent: IWindowCloseEvent) => void;
    windowClosed: () => void;
}
export interface ICanvasWindow {
    readonly htmlWindow: false;
    id: string;
    tabId: string | null | undefined;
    ownerId: string | null | undefined;
    element: HTMLCanvasElement;
    internal: boolean;
    name: string | null | undefined;
    title: string | null | undefined;
    classType: any;
    parents: string[];
    minimized: boolean | null | undefined;
    resizable: boolean;
    focused: boolean;
    setLocation: (x: number, y: number) => void;
    setSize: (width: number, height: number) => void;
    setBounds: (x: number, y: number, width: number, height: number) => void;
    validatePositionAndSize: (x: number, y: number) => void;
    isModalBlocked: () => void;
    detach: () => HTMLCanvasElement | undefined;
    attach: (parent: Element, pos?: {
        x: number;
        y: number;
    } | undefined | null) => void;
    isRelocated: () => boolean;
    undock: () => void;
    dock: () => void;
    setUndecorated: (undecorated: boolean) => void;
    maximize: () => void;
    close: () => void;
    requestFocus: () => void;
    restore: () => void;
    toFront: () => void;
    performAction: (options: {
        actionName?: string;
        data?: string;
        binaryData?: Uint8Array;
    }) => void;
    handleActionEvent: (actionName?: string | null, data?: string | null, binaryData?: Uint8Array | null) => void;
    windowClosing: (windowCloseEvent: IWindowCloseEvent) => void;
    windowClosed: () => void;
}
export interface IWindowCloseEvent {
    preventDefault: () => void;
    isDefaultPrevented: () => boolean;
}
export interface IInjectorApi {
    services: {
        dialog?: {
            content: boolean;
            [k: string]: any;
        };
        [name: string]: {
            [k: string]: any;
        } | undefined;
    };
}
export interface IDialogs {
    emptyMessage: IDialogContent;
    logingOut: IDialogContent;
    readyDialog: IDialogContent;
    initializingDialog: IDialogContent;
    initializingMirrorDialog: IDialogContent;
    initializingRecordingDialog: IDialogContent;
    startingDialog: IDialogContent;
    reconnectingDialog: IDialogContent;
    applicationBusyDialog: IDialogContent;
    undockWaitingDialog: IDialogContent;
    unauthorizedAccess: IDialogContent;
    applicationAlreadyRunning: IDialogContent;
    sessionStolenNotification: IDialogContent;
    disconnectedDialog: IDialogContent;
    disconnectedNetworkErrorDialog: IDialogContent;
    connectionErrorDialog: IDialogContent;
    tooManyClientsNotification: IDialogContent;
    tooManyClientsPerUserNotification: IDialogContent;
    noFreeSessionPoolNotification: IDialogContent;
    stoppedDialog: IDialogContent;
    undockedInstanceNotFound: IDialogContent;
    reconnectInstanceNotFound: IDialogContent;
    undockedInstanceDetached: IDialogContent;
    instanceDetached: IDialogContent;
    timedoutDialog: IDialogContent;
    cookiesDisabledDialog: IDialogContent;
    popupsBlockedDialog: IDialogContent;
    continueOldSessionDialog: IDialogContent;
    longPollingWarningDialog: IDialogContent;
    inactivityTimeoutWarningDialog: IDialogContent;
    networkOfflineWarningDialog: IDialogContent;
    networkSlowWarningDialog: IDialogContent;
    touchSwitchModeMouseDialog: IDialogContent;
    touchSwitchModeTouchDialog: IDialogContent;
    dockingModalityOverlay: IDialogContent;
    hiddenWindowsNotification: IDialogContent;
    popupBlockedNotification: IDialogContent;
}
export interface IDialogContent {
    header?: string;
    content: string;
    buttons?: Array<IDialogButton | (() => IDialogButton | false)>;
    events?: {
        [K: string]: EventListenerOrEventListenerObject;
    };
    severity?: number;
    type?: 'visibility-overlay' | 'modality-overlay';
    focused?: boolean;
    autoReconnect?: boolean;
}
export interface IDialogButton {
    label: string;
    action: () => void;
}
export interface ComponentTreeElement {
    componentType?: (string | null);
    name?: (string | null);
    value?: (string | null);
    screenX?: (number | null);
    screenY?: (number | null);
    width?: (number | null);
    height?: (number | null);
    enabled?: (boolean | null);
    visible?: (boolean | null);
    components?: (ComponentTreeElement[] | null);
    hidden?: (boolean | null);
    selected?: (boolean | null);
}
