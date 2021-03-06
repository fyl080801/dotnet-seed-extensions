/// <reference path="../../../../node_modules/@types/angular/index.d.ts" />

export as namespace app;

export = app;

declare namespace app {
  /**
   *
   */
  export interface IAppConfig {
    serverUrl?: string;
  }

  /**
   *
   */
  export interface IAjaxState {
    loading: boolean;
    url?: string;
    method?: string;
    data?: object;
  }

  /**
   *
   */
  export interface IAppEnvironment {
    ajaxState: IAjaxState;
    theme?: string;
  }

  export namespace configs {
    /**
     *
     */
    export interface IRequireState extends ng.ui.IState {
      requires?: Array<string>;
      title?: string;
      dependencies?: Array<string>;
    }

    /**
     *
     */
    export interface IRequireStateProvider extends ng.ui.IStateProvider {
      state(name: string, config: IRequireState): ng.ui.IStateProvider;
      state(config: IRequireState): ng.ui.IStateProvider;
      decorator(
        name?: string,
        decorator?: (state: IRequireState, parent: Function) => any
      ): any;
    }

    export interface IExtendStateService extends ng.ui.IStateService {
      back(): ng.IPromise<any>;
    }

    /**
     *
     */
    export interface IExtendRootScopeService extends ng.IRootScopeService {
      $appEnvironment: IAppEnvironment;
      $appConfig: IAppConfig;
      $data: any;
      $state: ng.ui.IStateService;
      $stateParams: ng.ui.IStateParamsService;
      $previous: ng.ui.IState;
      $previousParams: ng.ui.IStateParamsService;
    }
  }

  export namespace factories {
    /**
     *
     */
    export interface IHttpDataHandler {
      doResponse<TOutput>(
        response: ng.IHttpResponse<app.services.IResponseContext<TOutput>>,
        defer: ng.IDeferred<TOutput>
      );
      doError<TOutput>(
        response: ng.IHttpResponse<app.services.IResponseContext<TOutput>>,
        defer: ng.IDeferred<TOutput>
      );
    }
  }

  export namespace services {
    /**
     *
     */
    export interface IConfirmPromise {
      ok(callback?: ((result: any) => void) | null): IConfirmPromise;
      cancel(callback?: ((reason: any) => void) | null): IConfirmPromise;
    }

    /**
     *
     */
    export interface IRequestPromise<T> extends ng.IPromise<T> {
      cancel(): void;
    }

    /**
     *
     */
    export interface IResponseContext<T> {
      success: boolean;
      data?: T;
      message: string;
    }

    /**
     *
     */
    export interface IRequestDefered {
      options(opt: ng.IRequestConfig): IRequestDefered;
      post<TInput, TOutput>(param: TInput): IRequestPromise<TOutput>;
      get<TOutput>(): IRequestPromise<TOutput>;
    }

    /**
     *
     */
    export interface IHttpService {
      get<TOutput>(url: string): app.services.IRequestPromise<TOutput>;
      post<TInput, TOutput>(
        url: string,
        param: TInput
      ): app.services.IRequestPromise<TOutput>;
    }

    /**
     *
     */
    export interface IPopupService {
      /**
       *
       * @param text
       * @param size
       */
      information(text: string, size?: string): ng.IPromise<any>;

      /**
       *
       * @param text
       * @param size
       */
      confirm(text: string, size?: string): IConfirmPromise;

      /**
       *
       * @param text
       * @param size
       */
      error(text: string | Array<any>, size?: string): ng.IPromise<any>;
    }

    export interface ITreeItem<T> {
      $data: T;
      $parent?: ITreeItem<T>;
      $children?: ITreeItem<T>[];
      $key: any;
    }

    export interface ITreeContext<T> {
      onEach(fn: ((item: ITreeItem<T>) => void)): ITreeContext<T>;
      eachCallback: ((item: ITreeItem<T>) => void);
      result: ng.IPromise<ITreeItem<T>>;
    }

    export interface ITreeConvertContext<T> extends ITreeContext<T> {
      key(name: any): ITreeConvertContext<T>;
      key(): any;
      parentKey(name: any): ITreeConvertContext<T>;
      parentKey(): any;
    }

    /**
     *
     */
    export interface ITreeUtility {
      toTree<T>(data: Array<T>): ITreeConvertContext<T>;
      eachTree<T>(root: ITreeItem<T>): ITreeContext<T>;
    }
  }
}
