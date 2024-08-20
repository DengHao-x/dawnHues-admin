import type { Method, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

//请求方式类型
type RequestMethod = extract<Method, "get" | "post" | "put" | "delete" | "patch" | "option" | "head">;
