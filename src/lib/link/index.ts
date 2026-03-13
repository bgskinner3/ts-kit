import {
  normalizeUrl,
  handleInternalHashScroll,
  extractRelativePath,
  stripHash,
} from './link-utils';

class LinkUtils {
  public static readonly normalize = normalizeUrl;
  public static readonly extractRelativePath = extractRelativePath;
  public static readonly stripHash = stripHash;
  public static readonly handleHashScroll = handleInternalHashScroll;
}

export {
  normalizeUrl,
  handleInternalHashScroll,
  extractRelativePath,
  stripHash,
  LinkUtils,
};
