const { serialize, parse } = require("cookie");

const isClientSide = () => typeof window !== "undefined";

const processValue = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "undefined") return undefined;
  if (value === "null") return null;
  return value;
};

const stringify = (value = "") => {
  try {
    const result = JSON.stringify(value);
    return /^[\{\[]/.test(result) ? result : value;
  } catch (e) {
    return value;
  }
};

const decode = (str) => {
  if (!str) return str;
  return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};

  const getCookies = (options) => {
  let req;
  if (options) req = options.req;
  if (!isClientSide()) {
    // if cookie-parser is used in project get cookies from ctx.req.cookies
    // if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
    if (req && req.cookies) return req.cookies;
    if (req && req.headers && req.headers.cookie)
      return parse(req.headers.cookie);
    return {};
  }

  const _cookies = {};
  const documentCookies = document.cookie ? document.cookie.split("; ") : [];

  for (let i = 0, len = documentCookies.length; i < len; i++) {
    const cookieParts = documentCookies[i].split("=");

    const _cookie = cookieParts.slice(1).join("=");
    const name = cookieParts[0];

    _cookies[name] = _cookie;
  }

  return _cookies;
};

  const getCookie = (key, options) => {
  const _cookies = getCookies(options);
  const value = _cookies[key];
  if (value === undefined) return undefined;
  return processValue(decode(value));
};

  const setCookie = (key, data, options) => {
  let _cookieOptions;
  let _req;
  let _res;
  if (options) {
    const { req, res, ..._options } = options;
    _req = req;
    _res = res;
    _cookieOptions = options;
  }

  const cookieStr = serialize(key, stringify(data), {
    path: "/",
    ..._cookieOptions,
  });

  if (!isClientSide()) {
    if (_res && _req) {
      let currentCookies = _res.getHeader("Set-Cookie");

      if (!Array.isArray(currentCookies)) {
        currentCookies = !currentCookies ? [] : [String(currentCookies)];
      }
      _res.setHeader("Set-Cookie", currentCookies.concat(cookieStr));

      if (_req && _req.cookies) {
        const cookies = _req.cookies;
        data === "" ? delete cookies[key] : (cookies[key] = stringify(data));
      }

      if (_req && _req.headers && _req.headers.cookie) {
        const _cookies = parse(_req.headers.cookie);

        data === "" ? delete _cookies[key] : (_cookies[key] = stringify(data));

        _req.headers.cookie = Object.entries(_cookies).reduce((accum, item) => {
          return accum.concat(`${item[0]}=${item[1]};`);
        }, "");
      }
    }
  } else {
    document.cookie = cookieStr;
  }
};

  const deleteCookie = (key, options) => {
  return setCookie(key, "", { ...options, maxAge: -1 });
};

  const hasCookie = (key, options) => {
  if (!key) return false;

  const cookie = getCookies(options);
  return cookie.hasOwnProperty(key);
};

const cookieService = {
   hasCookie,
   deleteCookie,
   setCookie, 
   getCookie,
   getCookies
};
module.exports = cookieService;
