export default function parseXMLResponse(xml: string) {
  const result: Record<string, any> = {};
  const errorMatch = xml.match(/<Error>(.*)<\/Error>/);
  if (errorMatch) {
    throw new Error(`Namecheap API Error: ${errorMatch[1]}`);
  }

  const hostMatches = xml.matchAll(/<host(.*?)>(.*?)<\/host>/g);
  if (hostMatches) {
    result.hosts = [];
    for (const match of hostMatches) {
      const host: Record<string, string> = {};
      const attrs = match[1].matchAll(/(\w+)="([^"]*)"/g);
      for (const attr of attrs) {
        host[attr[1]] = attr[2];
      }
      result.hosts.push(host);
    }
  }
  const domainMatches = xml.matchAll(/<Domain\b(.*?)>/g);
  if (domainMatches) {
    result.domains = [];
    for (const match of domainMatches) {
      const domain: Record<string, string> = {};
      const attrs = match[1].matchAll(/(\w+)="([^"]*)"/g);
      for (const attr of attrs) {
        domain[attr[1]] = attr[2];
      }
      result.domains.push(domain);
    }
  }
  return result;
}