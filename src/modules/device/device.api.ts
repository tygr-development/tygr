import { EventChannel, eventChannel } from 'redux-saga';

export default class {

  public static getResizeChannel(): EventChannel<boolean> {
    return eventChannel((emitter) => {
      const listener = () => emitter(true);
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', listener);
      }

      // return unsubscribe function
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', listener);
        }
      };
    });
  }

  public static getScreenSize(): { width: number, height: number } {
    if (typeof window !== 'undefined') {
      return {
        height: window.innerHeight,
        width: window.innerWidth,
      };
    } else {
      return { width: 0, height: 0};
    }
  }
}
