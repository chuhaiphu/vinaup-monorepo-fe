import { ParsedCookie } from './api-error';

export const stripHtmlAndTruncate = (html: string, maxLength: number) => {
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > maxLength ? text.substring(0, maxLength) : text;
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN');
};

export function getEmbeddedVideoUrl(url: string | null | undefined): string | null {
  try {
    if (!url) {
      return null;
    }
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace('www.', '');

    if (hostname === 'youtube.com' || hostname === 'youtu.be') {
      if (hostname === 'youtu.be') {
        return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`;
      }

      const videoId = parsed.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}`;
      }

      if (parsed.pathname.startsWith('/embed/')) {
        if (hostname === 'youtube.com' || hostname === 'www.youtube.com') {
          const videoId = parsed.pathname.split('/embed/')[1]?.split('?')[0];
          if (videoId) {
            return `https://www.youtube-nocookie.com/embed/${videoId}${parsed.search}`;
          }
        }
        return url;
      }
    }

    if (hostname === 'vimeo.com') {
      const videoId = parsed.pathname.split('/')[1];
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function isPathActive(pathname: string, itemPath: string, isRoot = false) {
  if (!itemPath) return false;
  if (isRoot) {
    return pathname === itemPath;
  }
  if (pathname === itemPath) return true;
  return pathname.startsWith(itemPath + '/');
}

export const renderDurationDays = (durationDays: number) => {
  if (durationDays === 0.5) {
    return 'Half day';
  }
  if (durationDays === 1) {
    return '1 day';
  }
  return `${durationDays} days`;
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  return validTypes.includes(file.type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const cx = (...classNames: (string | undefined)[]): string => {
  return classNames.filter(Boolean).join(' ');
};

export function parseSetCookie(setCookie: string | null): ParsedCookie {
  if (!setCookie) {
    return {
      name: '',
      value: '',
      options: {},
    };
  }
  const parts = setCookie.split(';').map((p) => p.trim());
  const [nameValue, ...attrs] = parts;
  const [name, value] = nameValue.split('=');
  const options: ParsedCookie['options'] = {};

  for (const attr of attrs) {
    const [key, val] = attr.split('=');

    switch (key.toLowerCase()) {
      case 'max-age':
        options.maxAge = Number(val);
        break;
      case 'path':
        options.path = val;
        break;
      case 'expires':
        options.expires = new Date(val);
        break;
      case 'httponly':
        options.httpOnly = true;
        break;
      case 'samesite':
        options.sameSite = val.toLowerCase() as 'lax' | 'strict' | 'none';
        break;
      case 'secure':
        options.secure = true;
        break;
    }
  }

  return { name, value, options };
}

export function parseEndpoint(endpoint: string | null | undefined): string {
  if (!endpoint) {
    return '/';
  }

  if (
    endpoint.startsWith('http://') ||
    endpoint.startsWith('https://') ||
    endpoint.startsWith('/')
  ) {
    return endpoint;
  }

  return `https://${endpoint}`;
}

export function isExternalEndpoint(endpoint: string): boolean {
  return endpoint.startsWith('http://') || endpoint.startsWith('https://');
}
