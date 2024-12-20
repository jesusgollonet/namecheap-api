import dotenv from "dotenv";
import parseXMLResponse from "./src/parse-xml-response";

dotenv.config();
const config = {
  baseUrl: "https://api.namecheap.com/xml.response",
  apiKey: process.env.API_KEY || "",
  userName: process.env.USERNAME || "",
  clientIp: process.env.CLIENT_IP || "",
};

const urlParams = new URLSearchParams({
  ApiUser: config.userName,
  ApiKey: config.apiKey,
  UserName: config.userName,
  Command: "namecheap.domains.getList",
  ClientIp: config.clientIp,
});

const url = `${config.baseUrl}?${urlParams.toString()}`;

console.log(url);

(async () => {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const parsed = parseXMLResponse(data);

    const domains = parsed.domains.map(
      (domain: Record<string, string>) => domain.Name,
    );
    console.log(domains);
  } catch (error) {
    console.error("Error fetching data from Namecheap API", error);
  }
})();
