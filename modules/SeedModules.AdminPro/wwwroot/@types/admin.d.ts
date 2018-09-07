/// <reference path="../../../../node_modules/@types/angular/index.d.ts" />

export as namespace admin;

export = admin;

declare namespace admin {
  export namespace configs {
    export interface IRequireState extends app.configs.IRequireState {
      subtitle?: string;
    }

    export interface IRequireStateProvider
      extends app.configs.IRequireStateProvider {
      state(name: string, config: IRequireState): IRequireStateProvider;
      state(config: IRequireState): IRequireStateProvider;
      decorator(
        name?: string,
        decorator?: (state: IRequireState, parent: Function) => any
      ): any;
    }
  }
}
