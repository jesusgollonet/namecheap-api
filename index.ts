import dotenv from "dotenv";
import { parseDomainList } from "./src/parsers";
import { createConfig, buildCommandUrl } from "./src/api";

dotenv.config();
const config = createConfig();
console.log(config);

(async () => {
  try {
    const response = await fetch(
      buildCommandUrl(config, "namecheap.domains.getList"),
    );
    const data = await response.text();
    console.log(data);
    const parsed = parseDomainList(data);
    console.log(parsed);
    //buildCommandUrl(config, "namecheap.domains.dns.getHosts", {
    //SLD: "overy",
    //TLD: "club",
    //}),

    //const domains = parsed.domains.map(
    //(domain: Record<string, string>) => domain.Name,
    //);
  } catch (error) {
    console.error("Error fetching data from Namecheap API", error);
  }
})();
