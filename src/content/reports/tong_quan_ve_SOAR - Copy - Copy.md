---
title: "SIEM"

description: "222222222222"

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


**SOAR - Security Orchestration, Automation and Response**
*Orchestration = Điều phối*
*Automation = Tự động*
Response = Quản lý

# 1. SOAR là gì?

SOAR là 1 hệ thống có cấu trúc giúp tự động hóa (A), điều phối (O) và quản lý (R) các hoạt động an ninh mạng nhằm phát hiện điều tra và ứng phó với các mối đe dọa một cách hiệu quả.

Nếu SIEM có nhiệm vụ phát hiện và cảnh báo, thì SOAR sẽ thực hiện các hành động phản ứng dựa trên cảnh báo đó.

```
                    SIEM / EDR / Firewall / IDS / Email Security
                                     │
                                     ▼
                            Nhận Alert / Event
                                     │
                                     ▼
                     Correlation & Deduplication (Tùy chọn)
              (Gộp các Alert trùng lặp, liên quan thành một Incident)
                                     │
                                     ▼
                           Data Enrichment
      (Threat Intelligence, VirusTotal, GeoIP, WHOIS, CMDB, AD...)
                                     │
                                     ▼
                        Incident Creation & Prioritization
           (Tạo Incident, phân loại Severity, xác định mức ưu tiên)
                                     │
                                     ▼
                     Playbook / Workflow Automation
               (Chạy quy trình xử lý đã được định nghĩa sẵn)
                                     │
          ┌──────────────────────────┴─────────────────────────┐
          ▼                                                    ▼
 Automated Investigation                            Human Approval (nếu cần)
 (Thu thập log, IOC, process,                  (Xác nhận trước khi thực hiện
 endpoint info, sandbox...)                      các hành động quan trọng)
          │                                                    │
          └──────────────────────────┬─────────────────────────┘
                                     ▼
                          Automated Response
      (Block IP, Isolate Endpoint, Disable User, Kill Process,
              Update Firewall, Quarantine Email...)
                                     │
                                     ▼
                      Notification / Ticketing
        (Email, Slack, Teams, Jira, ServiceNow, TheHive...)
                                     │
                                     ▼
                      Incident Documentation
        (Ghi log, lưu bằng chứng, timeline, audit trail)
                                     │
                                     ▼
                    Incident Closure & Reporting
        (Đóng Incident, tạo báo cáo, cập nhật KPI, Lessons Learned)
```

# 2. Giải thích pipeline

| Bước                                      | Chức năng                                                                                                                        |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **1. Nhận Alert**                         | Nhận cảnh báo từ SIEM, EDR, Firewall, IDS/IPS, Email Security...                                                                 |
| **2. Correlation & Deduplication**        | Gộp các cảnh báo giống nhau hoặc liên quan để tránh tạo nhiều Incident trùng lặp.                                                |
| **3. Data Enrichment**                    | Bổ sung thông tin từ Threat Intelligence, VirusTotal, GeoIP, WHOIS, CMDB, Active Directory... giúp đánh giá Alert chính xác hơn. |
| **4. Incident Creation & Prioritization** | Tạo Incident, gán mức độ nghiêm trọng (Severity) và xác định mức ưu tiên xử lý.                                                  |
| **5. Playbook / Workflow Automation**     | Chạy các Playbook tự động theo từng loại sự cố (Malware, Phishing, Brute Force...).                                              |
| **6. Automated Investigation**            | Thu thập thêm bằng chứng như log, tiến trình đang chạy, IOC, kết quả sandbox... để phục vụ điều tra.                             |
| **7. Human Approval (nếu cần)**           | Với các hành động có rủi ro cao (ví dụ khóa tài khoản quản trị), SOAR có thể yêu cầu SOC Analyst phê duyệt trước khi thực hiện.  |
| **8. Automated Response**                 | Tự động phản ứng: chặn IP, cô lập máy, vô hiệu hóa tài khoản, dừng tiến trình độc hại, cách ly email...                          |
| **9. Notification / Ticketing**           | Gửi thông báo và tạo ticket trên Jira, ServiceNow, TheHive hoặc qua Email, Slack, Microsoft Teams...                             |
| **10. Incident Documentation**            | Ghi lại toàn bộ quá trình xử lý, bằng chứng và timeline để phục vụ kiểm toán và phân tích sau này.                               |
| **11. Incident Closure & Reporting**      | Đóng Incident, tạo báo cáo, cập nhật KPI (MTTD, MTTR...) và rút kinh nghiệm (Lessons Learned).                                   |
# 3. Mối quan hệ giữa SIEM và SOAR

```
                SIEM
Thu thập → Chuẩn hóa → Enrichment → Correlation
	→ Detection → Alert
			   │
			   ▼
			SOAR
Enrichment → Investigation → Playbook
→ Automated Response → Ticket → Incident Closure
```

