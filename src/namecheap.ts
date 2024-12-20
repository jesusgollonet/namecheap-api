import { Config } from "./types";
import { buildCommandUrl } from "./api";
import { parseDomainList, parseHosts } from "./parsers";
import { writeFile } from "node:fs/promises";
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
  const getHosts = async (domain: string) => {
    const domainParts = domain.split(".");
    const response = await fetch(
      buildCommandUrl(config, "namecheap.domains.dns.getHosts", {
        SLD: domainParts[0],
        TLD: domainParts[1],
      }),
    );

    const data = await response.text();
    return parseHosts(data);
  };
  const setHosts = async (domain: string, hosts: Record<string, string>[]) => {
    const existingHosts = await getHosts(domain);
    console.log(existingHosts);
  };
  const setHost = async (
    domain: string,
    recordType: string,
    hostname: string,
    value: string,
    ttl: number = 1800,
  ) => {
    const existingHosts = await getHosts(domain);
    const backup = JSON.stringify(existingHosts);
    await writeFile("backup.json", backup);
    const hostParams: Record<string, string> = {};
    existingHosts.hosts.forEach((host: any, index: number) => {
      const i = index + 1;
      hostParams[`HostName${i}`] = host.Name;
      hostParams[`RecordType${i}`] = host.Type;
      hostParams[`Address${i}`] = host.Address;
      hostParams[`TTL${i}`] = host.TTL || "1800";
    });

    const newIndex = existingHosts.hosts.length + 1;
    hostParams[`HostName${newIndex}`] = hostname;
    hostParams[`RecordType${newIndex}`] = recordType;
    hostParams[`Address${newIndex}`] = value;
    hostParams[`TTL${newIndex}`] = ttl.toString() || "1800";

    const response = await fetch(
      buildCommandUrl(config, "namecheap.domains.dns.setHosts", {
        SLD: domain.split(".")[0],
        TLD: domain.split(".")[1],
        ...hostParams,
      }),
    );
    const data = await response.text();
    console.log(data);
    return data;
  };

  return {
    getHosts,
    setHost,
    setHosts,
  };
};
