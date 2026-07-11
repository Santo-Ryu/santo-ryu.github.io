---
title: "SHUFFLE"

description: "333333"

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


# 1. Shuffle là gì?
Là một nền tảng SOAR open src, đc thiết kế để tự động hóa quy trình sự cố an ninh mạng (Incident Response).
Shuffle giúp SOC giảm khối lượng công việc thủ công bằng cách kết nối nhiều công cụ bảo mật và tự động thực hiện các hành động phản ứng.

# 2. Hỗ trợ
| Pipeline SOAR                                    | Shuffle hỗ trợ gì?                                                                                                                                                                                                     | Mức độ           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **SIEM / EDR / Firewall / IDS / Email Security** | Kết nối với Wazuh, Elastic, Splunk, Microsoft Defender, CrowdStrike, FortiGate, pfSense, Palo Alto, Email Gateway... thông qua API/Webhook.                                                                            | ✅                |
| **Nhận Alert / Event**                           | Nhận Alert qua Webhook, REST API, Kafka, Schedule hoặc Trigger từ ứng dụng khác. Đây là điểm bắt đầu của Workflow.                                                                                                     | ✅                |
| **Correlation & Deduplication**                  | Có thể xây dựng logic để gộp Alert, kiểm tra Alert trùng lặp, lọc Alert theo điều kiện hoặc gọi hệ thống bên ngoài để tương quan. Tuy nhiên, đây **không phải thế mạnh** của Shuffle; SIEM thường làm tốt hơn.         | ⚠️ Hỗ trợ cơ bản |
| **Data Enrichment**                              | Một trong những chức năng mạnh nhất. Shuffle có thể tự động gọi VirusTotal, AbuseIPDB, MISP, OpenCTI, GeoIP, WHOIS, Active Directory, CMDB, DNS, Shodan... để bổ sung thông tin cho Alert.                             | ✅ Rất mạnh       |
| **Incident Creation & Prioritization**           | Có thể tạo Incident hoặc Ticket trên Jira, TheHive, ServiceNow; gán Severity, Priority dựa trên điều kiện trong Workflow. Shuffle không phải là hệ thống quản lý Incident chuyên dụng mà tích hợp với các nền tảng đó. | ✅                |
| **Playbook / Workflow Automation**               | Đây là chức năng cốt lõi của Shuffle. Thiết kế Playbook bằng giao diện kéo-thả, thêm điều kiện (If/Else), vòng lặp, xử lý song song, gọi API hoặc chạy script.                                                         | ✅⭐⭐⭐             |
| **Automated Investigation**                      | Tự động thu thập IOC, log, tiến trình, thông tin Endpoint, DNS, WHOIS, VirusTotal, sandbox... bằng cách gọi API hoặc thực thi script SSH/Python/Bash.                                                                  | ✅                |
| **Human Approval**                               | Hỗ trợ bước chờ xác nhận (manual approval) trước khi thực hiện hành động nguy hiểm, ví dụ gửi thông báo qua Slack/Teams hoặc giao diện để Analyst phê duyệt rồi mới tiếp tục Workflow.                                 | ✅                |
| **Automated Response**                           | Có thể Block IP trên Firewall, Disable User trong AD, Isolate Endpoint, Kill Process, Quarantine Email, cập nhật ACL... miễn là thiết bị hoặc dịch vụ có API hoặc cơ chế điều khiển phù hợp.                           | ✅⭐⭐⭐             |
| **Notification / Ticketing**                     | Gửi Email, Slack, Teams, Discord; tạo hoặc cập nhật Ticket trên Jira, ServiceNow, TheHive...                                                                                                                           | ✅                |
| **Incident Documentation**                       | Ghi lại toàn bộ trạng thái thực thi Workflow, input/output của từng bước, thời gian chạy và log để phục vụ kiểm tra, kiểm toán. Nếu cần hồ sơ Incident đầy đủ, thường đồng bộ sang TheHive hoặc ServiceNow.            | ✅                |
| **Incident Closure & Reporting**                 | Có thể đóng Ticket/Incident, gửi báo cáo hoặc cập nhật trạng thái. Tuy nhiên, khả năng Dashboard/KPI/Báo cáo chuyên sâu không mạnh bằng các nền tảng SIEM hoặc ITSM.                                                   | ⚠️ Hỗ trợ        |
