import { Config } from "./types";
import { buildCommandUrl } from "./api";
import { parseDomainList, parseHosts } from "./parsers";
export const createNamecheapClient = (config: Config) => {
  const domains = createDomainService(config);
  return { domains };
};

const createDomainService = (config: Config) => {
  return {
    dns: createDnsService(config),
    getList: async () => {
      const response = await fetch(
        buildCommandUrl(config, "namecheap.domains.getList"),
      );

      const data = await response.text();
      return parseDomainList(data);
    },
  };
};

const createDnsService = (config: Config) => {
  return {
    getHosts: async (domain: string) => {
      const domainParts = domain.split(".");
      const response = await fetch(
        buildCommandUrl(config, "namecheap.domains.dns.getHosts", {
          SLD: domainParts[0],
          TLD: domainParts[1],
        }),
      );

      const data = await response.text();
      return parseHosts(data);
    },
  };
};
