import dotenv from "dotenv";
import { createNamecheapClient } from "./src/namecheap";
import { createConfig } from "./src/api";

dotenv.config();
const config = createConfig();

(async () => {
  try {
    const namecheap = createNamecheapClient(config);
    const domains = await namecheap.domains.getList();
    const hosts = await namecheap.domains.dns.getHosts("overy.club");
    await namecheap.domains.dns.setHost(
      "example.com",
      "A",
      "some",
      "167.199.199.199",
      3600,
    );
  } catch (error) {
    console.error("Error fetching data from Namecheap API", error);
  }
})();
