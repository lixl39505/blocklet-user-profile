import { v4 as uuidv4 } from 'uuid';

/**
 * 生成 uuid
 */
export function uid() {
  return uuidv4();
}

/**
 * 节流
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
    immediate?: boolean;
  } = {},
  debounceMode?: boolean,
) {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastTimeoutId: NodeJS.Timeout | null = null;
  let lastExec = 0;

  const { leading = true, trailing = true, immediate = false } = options;

  function wrapper(this: any, ...args: Parameters<T>) {
    const self = this;
    const elapsed = Number(new Date()) - lastExec;

    // Execute `func` and update the `lastExec` timestamp.
    function exec() {
      lastExec = Number(new Date());
      func.apply(self, args);
    }

    function clear() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      if (lastTimeoutId) {
        clearTimeout(lastTimeoutId);
        lastTimeoutId = null;
      }
    }

    // Clear any existing timeout.
    clear();

    // debounce mode
    if (debounceMode) {
      // 第一次立即执行
      if (lastExec === 0 && immediate) {
        exec();
      } else {
        timeoutId = setTimeout(exec, delay);
      }
    } else {
      // throttle mode
      // 第一次执行
      // eslint-disable-next-line no-lonely-if
      if (lastExec === 0) {
        // 立即执行
        if (leading) {
          exec();
        } else {
          // 更新时间点
          lastExec = Number(new Date());
        }
      } else {
        // 间隔有效
        // eslint-disable-next-line no-lonely-if
        if (elapsed > delay) {
          exec();
        } else if (trailing) {
          // 总是允许最后一次执行
          lastTimeoutId = setTimeout(exec, delay - elapsed);
        }
      }
    }
  }

  // Return the wrapper function.
  return wrapper as T;
}

/**
 * 防抖
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  options: Parameters<typeof throttle>[2],
) {
  return throttle(func, delay, options, true);
}
