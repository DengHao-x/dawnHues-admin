/**
 * @description: 全局消息提示封装
 */
import { type MessageHandler, ElMessage } from "element-plus";
import type { VNode } from "vue";
type msgTypes = "info" | "success" | "warning" | "error";

interface MessageParams {
  // 消息类型
  type?: msgTypes;
  // 图标
  icon?: any;
  //  显示时间
  duration?: number;
  //  是否显示遮罩层
  showClose?: boolean;
  // 文字是否居中，默认值 false
  center?: boolean;
  // 距离窗口顶部的偏移量 默认20
  offset?: number;
}

const message = (message: string | VNode | (() => VNode), params?: MessageParams): MessageHandler => {
  if (!params) {
    return ElMessage({
      message,
    });
  }
};

/**
 * 关闭所有 `Message` 消息提示函数
 */
const closeAllMessage = (): void => ElMessage.closeAll();

export { message, closeAllMessage };
