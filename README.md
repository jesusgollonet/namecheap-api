# Namecheap API Client

A TypeScript client for the Namecheap API focusing on domain and DNS management. Built with a functional programming approach for better testing and composability.

## Current Status

Currently implements:
- Domain listing (`getList`)
- DNS record management
  - Get DNS hosts (`getHosts`)
  - Set DNS hosts (`setHost`) with safety measures

### Safety Features
The DNS host management includes several safety measures to prevent accidental deletion of DNS records:
- Automatic backup of current hosts before changes
- Validation checks
- Preserves all existing records when adding new ones

## Usage

```typescript
import { createNamecheapClient, createConfig } from './src/namecheap';

// Initialize client
const config = createConfig();
const namecheap = createNamecheapClient(config);

// List domains
const domains = await namecheap.domains.getList();

// Get DNS hosts for a domain
const hosts = await namecheap.domains.dns.getHosts("example.com");

// Add a new DNS record (safely preserves existing records)
await namecheap.domains.dns.setHost(
  "example.com",
  "A",
  "subdomain",
  "123.45.67.89"
);
