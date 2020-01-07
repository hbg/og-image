import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest, Theme } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname = '/', query = {} } = parse(req.url || '', true);
    const { fontSize, images, widths, heights, theme, md } = query;

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }
    
    const arr = pathname.slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        theme: theme === 'dark' ? 'dark' : 'light',
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    };
    parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme);
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string): string[] {
    return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray];
}

function getDefaultImages(images: string[], theme: Theme): string[] {
    if (images.length > 0 && images[0] {
        return images;
    }
    return theme === 'light'
    ? ['data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFk%0D%0Ab2JlIElsbHVzdHJhdG9yIDI0LjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246%0D%0AIDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQi%0D%0AIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMjQgMTAyNDsiIHhtbDpzcGFjZT0i%0D%0AcHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik04NDEuOTksNDU5LjcxYy0zMS45OCwwLTU3%0D%0ALjg2LDM2Ljg3LTU3Ljg2LDgyLjUyYzAsMjcuMSwxNC44OSw0NS4xNywzNy42LDQ1LjE3YzMxLjAx%0D%0ALDAsNTcuODYtMzguMzMsNTcuODYtODIuNTIKCQkJQzg3OS41OCw0NzcuNTMsODY0LjY5LDQ1OS43%0D%0AMSw4NDEuOTksNDU5LjcxeiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZD0iTTUyNS4zMyw0NTcuMDNj%0D%0ALTMwLjc2LDAtNTcuODYsMzguNTctNTcuODYsODIuNzZjMCwyNy4zNCwxNC44OSw0NS4xNywzNy42%0D%0ALDQ1LjE3YzMxLjk4LDAsNTcuODYtMzYuODcsNTcuODYtODIuNzYKCQkJQzU2Mi45Myw0NzQuODUs%0D%0ANTQ4LjA0LDQ1Ny4wMyw1MjUuMzMsNDU3LjAzeiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZD0iTTc2%0D%0AOCwwSDI1NkMxMTQuNjIsMCwwLDExNC42MiwwLDI1NnY1MTJjMCwxNDEuMzgsMTE0LjYyLDI1Niwy%0D%0ANTYsMjU2aDUxMmMxNDEuMzgsMCwyNTYtMTE0LjYyLDI1Ni0yNTZWMjU2CgkJCUMxMDI0LDExNC42%0D%0AMiw5MDkuMzgsMCw3NjgsMHogTTMzOC44MSw0ODkuOThsLTM1LjE2LDE2Ny4yNGgtOTUuOTVsMzEu%0D%0AOTgtMTUyLjM0YzEuMjItNi4zNSwxLjcxLTExLjQ3LDEuNzEtMTYuNgoJCQljMC0xOC41NS0xNS4z%0D%0AOC0zMi4yMy0zNi42Mi0zMi4yM2MtMjMuMTksMC00My4yMSwxNy41OC00OC41OCw0Mi45N2wtMzMu%0D%0ANDUsMTU4LjJIMjYuMzFsNzQuOTUtMzUyLjI5aDk2LjE5bC0yNi42MSwxMjMuNTRoMS45NQoJCQlj%0D%0AMjAuMDItMjkuMyw1MC4yOS00Ni4xNCw4Ny42NS00Ni4xNGM0OS4zMiwwLDgyLjAzLDMwLjAzLDgy%0D%0ALjAzLDc0LjcxQzM0Mi40Nyw0NjcuMDQsMzQxLjI1LDQ3OC4yNywzMzguODEsNDg5Ljk4eiBNNTMx%0D%0ALjY4LDY2MS4xMwoJCQljLTM5LjMxLDAtNzAuOC0yMC4yNi04MS4wNS01MmgtMS45NWwtMTAuMjUs%0D%0ANDguMWgtOTQuMjRsNzUuMi0zNTIuMjloOTYuOTJsLTI2LjM3LDEyMS4wOWgyLjQ0YzE2LjYtMjYu%0D%0AODYsNDYuMzktNDIuMjQsODEuMy00Mi4yNAoJCQljNTUuMTgsMCw4OS4zNiwzOC44Miw4OS4zNiwx%0D%0AMDIuMDVDNjYzLjAzLDU4NS45Myw2MDYuNjMsNjYxLjEzLDUzMS42OCw2NjEuMTN6IE05NDMuMDYs%0D%0ANjY2Ljc0CgkJCWMtMTIuNDUsNTguMTEtNjcuODcsOTIuMjktMTUwLjE1LDkyLjI5Yy04My43NCww%0D%0ALTEzMy4wNi0zMi43MS0xMzMuNTQtODguMzhoOTMuNTFjMi45MywxNi4zNiwxOS41MywyNS44OCw0%0D%0ANS40MSwyNS44OAoJCQljMjcuODMsMCw0NC4xOS0xMS43Miw0OS4wNy0zNS4xNmwxMC4wMS00Ni4x%0D%0ANGgtNC44OGMtMTUuNjIsMjMuMTktNDMuMjEsMzUuODktNzcuNjQsMzUuODljLTUzLjQ3LDAtODku%0D%0AMzYtMzkuMDYtODkuMzYtOTcuNDEKCQkJYzAtOTMuNTEsNjAuMDYtMTY5LjkyLDEzMy41NC0xNjku%0D%0AOTJjMzYuNjIsMCw2NS40MywxOC44LDc0LjQ2LDQ4LjgzaDQuMzlsMTAuMjUtNDQuOTJoOTQuMjRM%0D%0AOTQzLjA2LDY2Ni43NHoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K']
    : ['https://assets.zeit.co/image/upload/front/assets/design/zeit-white-triangle.svg'];
}
