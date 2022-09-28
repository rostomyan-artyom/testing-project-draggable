export const replaceUrlPattern = (url, params) =>
  Object.keys(params).reduce((replacedUrl, paramKey) => {
  const regExp = new RegExp(`{${paramKey}}`, "g");
  replacedUrl = replacedUrl.replace(regExp, params[paramKey]);

  return replacedUrl;
}, url);



