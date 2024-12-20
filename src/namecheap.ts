import { Config } from "./types";
import { buildCommandUrl } from "./api";
import { parseDomainList } from "./parsers";
export const createNamecheapClient = (config: Config) => {
  const domains = createDomainService(config);
  return { domains };
};

const createDomainService = (config: Config) => {
  return {
    getList: async () => {
      const response = await fetch(
        buildCommandUrl(config, "namecheap.domains.getList"),
      );

      const data = await response.text();
      return parseDomainList(data);
    },
  };
};
