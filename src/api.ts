export interface Config {
  baseUrl: string;
  apiKey: string;
  userName: string;
  clientIp: string;
}
export function buildCommandUrl(
  config: Config,
  command: string,
  additionalParams?: Record<string, string>,
) {
  const urlParams = new URLSearchParams({
    ApiUser: config.userName,
    ApiKey: config.apiKey,
    UserName: config.userName,
    ClientIp: config.clientIp,
    Command: command,
    ...additionalParams,
  });
  return `${config.baseUrl}?${urlParams.toString()}`;
}
