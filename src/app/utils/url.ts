import { RouterStateSnapshot } from '@angular/router';

export function getRelativePath(state: RouterStateSnapshot) {
  const parsed = state.url.split('?');
  return { url: parsed[0], params: parsed[1] };
}

export function tryBypassGuard(excludedUrl: string[], state: RouterStateSnapshot): boolean | void {
  if (excludedUrl.includes(getRelativePath(state).url)) {
    return true;
  }
}
