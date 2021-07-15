/*
 * @Author: Lemon
 * @Date: 2021-02-25 13:58:46
 * @LastEditors: Lemon
 * @LastEditTime: 2021-07-14 15:30:07
 * @FilePath: /react-pixi-my/types/miniapp.d.ts
 */

declare namespace tinyapp {
  type OnShareAppMessageOptions =
    | {
        from: 'button';
        target: Record<string, any>;
        webViewUrl?: string;
      }
    | {
        from: 'menu';
        webViewUrl?: string;
      };

  interface IOnShareAppMessageResult {
    title: string;
    desc?: string;
    path: string;
    content?: string;
    imageUrl?: string;
    bgImgUrl?: string;
    success?(): void;
    fail?(): void;
  }

  type IPageScrollEvent =
    | [
        {
          readonly scrollTop: number;
          readonly scrollHeight: number;
        },
        null,
        null,
      ]
    | {
        readonly scrollTop: number;
        readonly scrollHeight: number;
      };

  interface IPageEvents {
    onBack?(): void;
    onKeyboardHeight?(): void;
    onOptionMenuClick?(): void;
    onPopMenuClick?(): void;
    onPullIntercept?(): void;

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh?(params: { from: 'manual' | 'code' }): void;
    onTitleClick?(): void;

    /**
     * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
     * 点击标签（tab）时触发。
     */
    onTabItemTap?(item: {
      index: number;
      pagePath: string;
      text: string;
    }): void;

    beforeTabItemTap?(): void;
  }

  interface IPageOptionsMethods
    extends Pick<
      IPageEvents,
      | 'onPullDownRefresh'
      | 'onTitleClick'
      | 'onOptionMenuClick'
      | 'onPopMenuClick'
      | 'onPullIntercept'
      | 'onTabItemTap'
    > {
    /**
     * 生命周期函数--监听页面加载
     *
     * @param query query 参数为 my.navigateTo 和 my.redirectTo 中传递的 query 对象。
     */
    onLoad?(query: Query): void;

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady?(): void;

    /**
     * 生命周期函数--监听页面显示
     */
    onShow?(): void;

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide?(): void;

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload?(): void;

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom?(): void;

    /**
     * 返回自定义分享信息
     */
    onShareAppMessage?(
      options: OnShareAppMessageOptions,
    ): IOnShareAppMessageResult;

    /**
     * 页面滚动时触发
     *
     * @param event 滚动事件参数
     */
    onPageScroll?(event: IPageScrollEvent): void;
  }

  type SetDataMethod<D> = (data: Partial<D>, callback?: () => void) => void;

  interface ISpliceDataOperations {
    [k: string]: [number, number, ...any[]];
  }

  type SpliceDataMethod = (
    operations: ISpliceDataOperations,
    callback?: () => void,
  ) => void;

  interface IPageInstance<D> extends Record<string, any> {
    /**
     * 页面数据。
     */
    readonly data: D;

    /**
     * 将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
     */
    setData: SetDataMethod<D>;

    /**
     * 同 setData，但是相比于 setData，在处理长列表的时候，其具有更高的性能
     */
    $spliceData: SpliceDataMethod;

    /**
     * Page 路径，对应 app.json 中配置的路径值。
     */
    readonly route: string;

    /**
     * 批量更新数据。
     */
    $batchedUpdates: (fn: () => void) => void;
  }

  /**
   * Page 实现的接口对象
   */
  type PageOptions<D = Record<string, any>> = IPageOptionsMethods & {
    /**
     * 初始数据或返回初始化数据的函数, 为对象时所有页面共享。
     */
    data?: D;

    /**
     * 事件处理函数集合。
     */
    events?: IPageEvents & ThisType<IPageInstance<D>>;

    [name: string]: any;
  } & ThisType<IPageInstance<D>>;
}

declare namespace tinyapp {
  type Query = Record<string, string | number>;

  interface IAppLaunchOptions {
    /**
     * 当前小程序的 query，从启动参数的 query 字段解析而来
     */
    query?: Query;

    /**
     * 当前小程序的页面地址，从启动参数 page 字段解析而来，page 忽略时默认为首页
     */
    path?: string;

    /**
     * 来源信息。
     */
    referrerInfo?: {
      /**
       * 来源小程序
       */
      appId: string;

      /**
       * 来源插件，当处于插件运行模式时可见
       */
      sourceServiceId: string;

      /**
       * 来源小程序传过来的数据。
       */
      extraData: Record<string, any>;
    };
  }

  interface IAppOptionsMethods {
    /**
     * 生命周期函数。
     *
     * 监听小程序初始化。
     *
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）。
     */
    onLaunch?(options: IAppLaunchOptions): void;

    /**
     * 生命周期函数。
     *
     * 监听小程序显示。
     *
     * 当小程序启动，或从后台进入前台显示，会触发 onShow。
     *
     * **注意:** 不要在 onShow 中进行 redirectTo/navigateTo 等操作页面栈的行为。
     */
    onShow?(options: IAppLaunchOptions): void;

    /**
     * 生命周期函数。
     *
     * 监听小程序隐藏。
     *
     * 当小程序从前台进入后台，会触发 onHide。
     */
    onHide?(): void;

    /**
     * 错误监听函数。
     *
     * 当小程序发生脚本错误，或者 API 调用失败时，会触发 onError 并带上错误信息。
     */
    onError?(error: any): void;

    /**
     * 全局分享配置。
     *
     * 当页面未设置 `page.onShareAppMessage` 时调用分享会执行全局的分享设置。
     */
    onShareAppMessage?(
      options: OnShareAppMessageOptions,
    ): IOnShareAppMessageResult;
  }

  interface IAppInstance<G> {
    /**
     * 全局状态数据。
     */
    globalData: G;
  }

  /**
   * getApp()返回的小程序实例
   */
  interface IGetAppResult {
    /**
     * 全局状态数据
     */
    globalData: any;
    /**
     * 云函数
     */
    cloud: any;
    /**
     * 云id
     */
    cloudAppId: any;
    needGrey: false;
    cloudAppIdMap: {
      test: string;
      online: string;
      grey: string;
    };
    toUrl: string;
  }

  /**
   * App 实现的接口对象
   * 参考: https://docs.alipay.com/mini/framework/app
   */
  type AppOptions<G = any> = IAppOptionsMethods & {
    globalData?: G;
    [name: string]: any;
  } & ThisType<IAppInstance<G>>;
}

declare namespace my {
  interface SystemInfo {
    windowWidth: number;
    windowHeight: number;
  }
  interface InnerAudioContext {
    src: string;
    startTime: number;
    autoplay: boolean;
    play: Function;
    pause: Function;
    stop: Function;
    paused: boolean;
    loop: boolean;
    obeyMuteSwitch: boolean;
    volume: number; // (0-1)
    destroy: Function;
    onPlay: (callback: Function) => void;
    onError: (callback: Function) => void;
    onEnded: (callback: Function) => void;
    onPause: (callback: Function) => void;
    onStop: (callback: Function) => void;
  }

  type ToastStatus = 'success' | 'fail' | 'exception' | 'none';
  export interface ToastOption {
    content: string;
    type?: ToastStatus;
    duration?: number;
    success?: () => void;
    fail?: () => void;
    complete?: () => void;
  }
  export interface ConfirmOption {
    title?: string;
    content?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    success?: (res: { confirm: boolean }) => void;
    fail?: () => void;
    complete?: () => void;
  }
  export interface LoadingOption {
    content?: string;
    mask?: boolean;
    success?: (res: { confirm: boolean }) => void;
    fail?: () => void;
    complete?: () => void;
  }
  function getSystemInfoSync(): SystemInfo;
  function createInnerAudioContext(): InnerAudioContext;
  function authorize(data: any): any;
  function getAuthUserInfo(data: any): any;

  function showToast(toastOption: ToastOption): any;
  function showLoading(loadingOption: LoadingOption): any;
  function hideLoading(): any;
  function confirm(toastOption: ConfirmOption): { confirm: boolean };
  function navigateTo({ url: string }): any;
  function showSharePanel(): any;
  const tb: any;
}

declare namespace tinyapp {
  interface CollectionCartModalProps {
    poolType: number;
    activityInfo: any;
  }
  interface GlobalProps {
    createGame(...args: any[]): any;
    dispatchCollectionCartModal(option: CollectionCartModalProps);
    showCartDialog(option: CollectionCartModalProps)
    showMember(): void
  }
}
declare function getApp(): tinyapp.IGetAppResult;
declare const $global: tinyapp.GlobalProps;
