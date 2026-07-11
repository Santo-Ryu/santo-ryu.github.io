---
title: "MFT Anomaly Detection in NTFS Vol_01"

description: "An in-depth investigation into non-standard resident attribute artifacts found within the Master File Table of a compromised enterprise."

pubDate: 2024-05-12T14:30:00Z

thumbnail: "/images/reports/mft.jpg"

tags:
  - file-system-forensics
  - NTFS
  - Artifacts

difficulty: Advanced

author: Santo

featured: false

draft: false
---

# Data Enrichment trong SIEM và SOAR

| SIEM | SOAR |
|------|------|
| **Mục đích:** Hỗ trợ **Detection** | **Mục đích:** Hỗ trợ **Investigation & Response** |
| Enrich **Log** | Enrich **Alert / Incident** |
| Thực hiện **trước** Correlation & Detection Engine | Thực hiện **sau** khi Alert được tạo |
| Bổ sung ngữ cảnh để tăng độ chính xác khi phát hiện | Thu thập thêm bằng chứng để quyết định cách xử lý |

## SIEM Data Enrichment

Bổ sung thông tin vào log trước khi phát hiện:

- Threat Intelligence
- GeoIP
- WHOIS
- CMDB / Asset Inventory
- Active Directory
- User Identity
- Business Criticality
- Vulnerability Information

**Ví dụ:**

```text
Raw Log
src_ip=45.77.10.5
dst_ip=10.10.10.20

↓ Enrichment

Country: Russia
Threat Intel: Malicious
Asset: Domain Controller
Criticality: High

↓ Detection

=> Critical Alert
```

---

## SOAR Data Enrichment

Sau khi nhận Alert từ SIEM, SOAR thu thập thêm thông tin để điều tra:

- Threat Intelligence
- VirusTotal
- EDR
- Windows/Linux Logs
- Firewall Logs
- Active Directory
- Sandbox
- IOC Context

**Ví dụ:**

```text
Alert:
Brute Force Attack

↓ Enrichment

- VirusTotal: Malicious
- EDR: Mimikatz running
- AD: User thuộc Domain Admin
- Firewall: Kết nối đến nhiều máy

↓ Playbook

- Isolate Endpoint
- Block IP
- Disable User
- Notify SOC
```

## Tóm tắt

- **SIEM:** Enrich **Log** → Phục vụ **Detection**.
- **SOAR:** Enrich **Alert/Incident** → Phục vụ **Investigation & Automated Response**.