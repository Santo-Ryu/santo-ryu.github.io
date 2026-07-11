---
title: "SOAR"

description: "111111"

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


SIEM - Security Infomation and Events Management
SIEM = Thu thập log + Phân tích + Phát hiện + Cảnh báo

# 1. SIEM là gì?
SIEM là hệ thống thu thập, chuẩn hóa, lưu trữ, phân tích log và phát hiện các mối đe dọa bảo mật từ nhiều nguồn khác nhau trong hạ tầng mạng CNTT.

# 2. SIEM hoạt động như thế nào?

Pipeline
```
          Thiết bị / Máy chủ / Ứng dụng / Cloud
(Firewall, IDS/IPS, Windows, Linux, AD, Database,
 Web Server, VPN, EDR, Switch, Router, AWS, Azure...)
                           │
                           ▼
                 Data Ingestion (Thu thập Log)
       (Agent, Syslog, API, WMI, WinRM, SNMP...)
                           │
                           ▼
              Parsing & Normalization
      (Parse log → Chuẩn hóa về một định dạng chung)
                           │
                           ▼
                   Data Enrichment
 (Threat Intelligence, GeoIP, WHOIS, Asset, CMDB, AD...)
                           │
                           ▼
             Storage & Indexing (Lưu trữ / Đánh chỉ mục)
                           │
                           ▼
          Correlation & Detection Engine
 (Correlation Rules, IOC Matching, UEBA, ML, Analytics)
                           │
                           ▼
                  Alert Prioritization
      (Severity, Risk Score, Deduplication, Suppression)
                           │
                           ▼
                 Dashboard & Visualization
          (SOC Dashboard, Reports, Search, Hunting)
                           │
                           ▼
                 Alert / Incident Generation
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
            SOC Analyst          SOAR Platform
                                 (Automation &
                                   Response)
```

| Bước                                  | Chức năng                                                                                                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Data Ingestion**                 | Thu thập log, sự kiện và telemetry từ nhiều nguồn như Firewall, IDS/IPS, Windows Event Log, Linux Syslog, Active Directory, Database, Cloud, EDR...             |
| **2. Parsing & Normalization**        | Phân tích và chuẩn hóa log từ nhiều định dạng khác nhau về một schema thống nhất để dễ tìm kiếm và phân tích.                                                   |
| **3. Data Enrichment**                | Bổ sung thông tin như Threat Intelligence, GeoIP, WHOIS, thông tin tài sản (Asset), người dùng từ Active Directory, CMDB... để tăng ngữ cảnh cho log.           |
| **4. Storage & Indexing**             | Lưu trữ log và tạo chỉ mục (Index) giúp truy vấn và phân tích nhanh, đồng thời đáp ứng yêu cầu lưu trữ và tuân thủ.                                             |
| **5. Correlation & Detection Engine** | Áp dụng các quy tắc tương quan (Correlation Rules), IOC Matching, UEBA và Machine Learning để phát hiện các hành vi bất thường hoặc mối đe dọa.                 |
| **6. Alert Prioritization**           | Đánh giá mức độ nghiêm trọng (Severity), tính điểm rủi ro (Risk Score), loại bỏ cảnh báo trùng lặp (Deduplication) hoặc cảnh báo không cần thiết (Suppression). |
| **7. Dashboard & Visualization**      | Hiển thị dữ liệu trên Dashboard, hỗ trợ tìm kiếm log, điều tra (Threat Hunting), tạo báo cáo và theo dõi trạng thái hệ thống.                                   |
| **8. Alert / Incident Generation**    | Khi phát hiện mối đe dọa, SIEM tạo Alert hoặc Incident và chuyển cho SOC Analyst hoặc SOAR để điều tra và phản ứng.                                             |
# 3. Tại sao cần chuẩn hóa log?

Mỗi thiết bị có mỗi định dạng log khác nhau.

Windows Event Log
```
EventID: 4625
Computer: WIN-SRV01
Account Name: admin
Source Network Address: 192.168.1.100
Failure Reason: Unknown username or bad password
TimeCreated: 2026-07-08 09:15:21
```

Linux Syslog
```
Jul 08 09:15:21 ubuntu sshd[12345]: Failed password for root from 192.168.1.100 port 54321 ssh2
```

Firewall
```
date=2026-07-08
time=09:15:20
srcip=192.168.1.100
dstip=192.168.1.10
action=deny
service=SSH
```

Apache
```
192.168.1.100 - - [08/Jul/2026:09:15:22]
"POST /login HTTP/1.1"
401
```


Nhiệm vụ của SIEM là chuẩn hóa log về 1 cấu trúc chung để dễ dàng phân tích.

Ví dụ:
```
{
  "timestamp": "2026-07-08T09:15:21",
  "event_type": "authentication_failed",
  "source_ip": "192.168.1.100",
  "destination_ip": "192.168.1.10",
  "username": "admin",
  "protocol": "SSH",
  "device": "WIN-SRV01",
  "severity": "medium"
}
```

# 4. Correlation & Analytics

Correlation & Analytics = Tương quan và Phân tích
Ghép nhiều sự kiện thành 1 chuỗi.

Quá trình liên kết nhiều sự kiện từ nhiều nguồn khác nhau dựa trên các thuộc tính chung như:
- ip src
- ip dest
- username
- hostname
- process
- datetime
- session id
Để xác định xem đó có phải là các bước của cùng 1 cuộc tấn công khong.

> **Nói đơn giản:** 1 log thường chưa nói lên điều gì. Nhiều log ghép lại mới cho thấy bức tranh toàn cảnh.


# 5. Detection Engine

Thành phần phát hiện mối đe dọa dựa trên nhiều kỹ thuật phân tích khác nhau.

Input:
- Log đã đc chuẩn hóa
- Kết quả Correlation
- IOC
- Threat Intelligence
- Baseline hành vi ng dùng
- Dữ liệu lịch sử
- ....

Output: 
- Quyết định có phải tấn công không?
- Mức độ nghiêm trọng
- Cần sinh Alert không?

