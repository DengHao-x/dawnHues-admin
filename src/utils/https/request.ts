import Axios, { type AxiosInstance, type AxiosRequestConfig, type CustomParamsSerializer } from "axios";
import { RequestMethod } from "./types";
// 默认配置
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};
class HttpClient {
  constructor() {
    this.interceptorsRequest();
    this.interceptorsRsponse();
  }

  //保存当前axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  // 请求拦截
  private interceptorsRequest(): void {
    HttpClient.axiosInstance.interceptors.request.use();
  }
  // 响应拦截
  private interceptorsRsponse(): void {
    HttpClient.axiosInstance.interceptors.response.use();
  }

  //通用请求
  public request<T>(
    method: RequestMethod,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    };
    return new Promise((resolve, reject) => {
      HttpClient.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  //post方法
  public post(url: string, param?: AxiosRequestConfig, axiosConfig?: AxiosRequestConfig) {
    return this.request("post", url, param, axiosConfig);
  }
  //get
  public get(url: string, param?: AxiosRequestConfig, axiosConfig?: AxiosRequestConfig) {
    return this.request("get", url, param, axiosConfig);
  }
  //put
  public put(url: string, param?: AxiosRequestConfig, axiosConfig?: AxiosRequestConfig) {
    return this.request("put", url, param, axiosConfig);
  }
  //delete
  public delete(url: string, param?: AxiosRequestConfig, axiosConfig?: AxiosRequestConfig) {
    return this.request("delete", url, param, axiosConfig);
  }
}
export const request = new HttpClient();
