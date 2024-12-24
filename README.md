# Namecheap API Client

A TypeScript client for the Namecheap API focusing on domain and DNS management. Built with a functional programming approach for better testing and composability.

## Installation

```npm install namecheap-client```

## Quick Start

```typescript
import { createNamecheapClient } from 'namecheap-client';

const client = createNamecheapClient({
  baseUrl: "https://api.namecheap.com/xml.response",
  apiKey: "your-api-key",
  userName: "your-username",
  clientIp: "your-ip"
});

### Examples

```typescript
// List all domains
const domains = await client.domains.getList();

// Get DNS records for a domain
const hosts = await client.domains.dns.getHosts("example.com");

// Add a new A record
await client.domains.dns.setHost(
  "example.com",
  "A",
  "blog",
  "192.0.2.1"
);

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

