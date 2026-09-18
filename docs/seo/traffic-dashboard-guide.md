# RoboSkin 流量查看入口

核对日期：2026-09-19。以下后台需要使用拥有相应站点权限的账号登录。

| 要回答的问题 | 后台入口 | 查看位置 |
| --- | --- | --- |
| 各渠道实际带来多少访问，访客读哪些页面？ | [Vercel Web Analytics](https://vercel.com/stevens-projects-08c9c5b0/roboskin-ai/analytics) | Production → 时间范围 → Visitors / Page Views / Pages / Referrers |
| Google 哪些关键词和页面有展示、点击？ | [Google Search Console 效果](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aroboskin.ai) | 选择 roboskin.ai 域名属性；效果 → 网络 → 28 天 → 查询数 / 网页 / 国家 / 设备 |
| Google 站点地图是否读取成功？ | [Google 站点地图](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aroboskin.ai) | sitemap.xml 的状态、上次读取时间、已发现网页；收录另看“网页”报告 |
| Bing 哪些关键词和页面有搜索表现？ | [Bing Webmaster Tools](https://www.bing.com/webmasters/?siteUrl=https://roboskin.ai/) | 选择 roboskin.ai → Search Performance；新接入的报表可能尚未生成 |
| Bing 站点地图和 URL 通知是否接收？ | [Bing Sitemaps](https://www.bing.com/webmasters/sitemaps?siteUrl=https://roboskin.ai/) | Sitemaps / IndexNow；2026-09-19 实查 sitemap 成功、发现 126 URLs |

网站已经接入 Vercel Analytics。Referrers 按可识别来源查看 Google、Bing、Yandex、其他网站与直接访问；部分访问没有来源信息，因此它不能完整还原每一次搜索点击。Yahoo 与 DuckDuckGo 的来访如有可识别 referrer，也在这里按实际来源看，不等同于 Bing 后台的点击数。

自定义 Events 用于查看阅读、论文来源跳转、目录筛选、比较、资料导出意图和表单行为。Dataset CSV Requested 表示请求导出，不能直接当成成功训练或数据使用；Newsletter Request Accepted 等事件不能替代邮件服务商确认的订阅人数。缺少服务商报表的数据保留“未取得”。

Google/Bing 展示表示结果被展示，点击表示从搜索结果发起点击；Vercel Visitors 表示其统计口径下的网站访客，Page Views 是浏览次数。三者不可直接相加。固定时间区间、页面和设备口径再比较，避开未完整的一天。

如果“所有站点”指用户名下多个网站：Google/Bing 可在站点下拉菜单切换，Vercel 按对应项目查看。当前并没有把所有网站、搜索引擎、邮件服务商合并成一个统一总表，也没有为无关站点新增统计代码。

本次基线见 `growth-batches/2026-09-19-search-expansion-baseline.json`。建议观察每页的发现/索引 → 展示 → 点击 → 有用阅读或导出 → 确认订阅，不用 URL 总数替代业务结果。
