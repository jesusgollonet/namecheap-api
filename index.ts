import dotenv from "dotenv";
import { createNamecheapClient } from "./src/namecheap";
import { createConfig } from "./src/api";

dotenv.config();
const config = createConfig();
console.log(config);

(async () => {
  try {
    const namecheap = createNamecheapClient(config);
    const domains = await namecheap.domains.getList();
    console.log(domains);
  } catch (error) {
    console.error("Error fetching data from Namecheap API", error);
  }
})();
