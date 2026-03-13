import { logDev, highlight, getCallerLocation, serialize } from './debug';

class DebugUtils {
  // Map individual functions to static properties
  public static readonly highlight = highlight;
  public static readonly serialize = serialize;
  public static readonly getCallerLocation = getCallerLocation;
}

export { logDev, getCallerLocation, serialize, highlight, DebugUtils };
