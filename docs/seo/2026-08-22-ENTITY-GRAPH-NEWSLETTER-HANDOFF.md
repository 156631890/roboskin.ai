# RoboSkin Entity Graph and Newsletter Handoff

Date: 2026-08-22

## Outcome

This release establishes the first machine-readable RoboSkin research-entity graph and removes the inactive Newsletter form that previously appeared to collect email addresses without a configured subscription provider.

The release does not claim a search-ranking increase, a confirmed newsletter subscriber, or new Google Search Console measurements.

## Knowledge graph baseline

Canonical machine-readable route:

- `https://roboskin.ai/knowledge-graph.json`

Graph version: `1.0.0`

| Record class | Count |
| --- | ---: |
| Research entities | 67 |
| Papers | 22 |
| Documentation | 1 |
| Tactile datasets | 12 |
| Tactile benchmarks | 9 |
| Tactile sensors | 13 |
| Robot AI models | 10 |
| Deduplicated source records | 103 |
| `supportedBy` edges | 125 |
| `benchmarkedBy` edges | 5 |
| Total edges | 130 |

The 23 Research Index entries consist of 22 papers and one ROS 2 documentation record. Source records are separate graph nodes and are not included in the 67 research-entity count.

Every research entity has a review date, one or more source records, and a `supportedBy` edge. The five `benchmarkedBy` edges are limited to dataset and benchmark records with the same reviewed ID: HT-Bench, RCT, TactiDex, TacVerse, and VTDexManip.

The graph is deliberately excluded from the HTML sitemap. It is discoverable from `llms.txt`, while the human-readable entity destinations remain the existing directory pages with stable fragments:

- `/datasets#dataset-[id]`
- `/benchmarks#benchmark-[id]`
- `/sensors#sensor-[id]`
- `/robot-foundation-models#model-[id]`

No thin company, laboratory, robot, or single-record pages were generated.

## GEO and machine-readable coverage

`llms-full.txt` now includes the full reviewed records for all 10 Robot AI models, including source links and evidence limitations. `llms.txt` links the knowledge graph and publishes the exact entity and source-record counts.

These files improve machine discovery and retrieval. They are not a guarantee of citation, indexing, ranking, or inclusion in an AI answer.

## Newsletter status

Production and Preview currently have no verified `NEXT_PUBLIC_NEWSLETTER_ENDPOINT`. The safe behavior is therefore:

- no Newsletter form;
- no email input;
- no form action or method;
- no email address placed into WhatsApp or another URL;
- a visible `Newsletter is not open yet` status;
- a link to `/feed.xml` for current updates.

If a provider is configured later, the site accepts only a credential-free public HTTPS form endpoint without query parameters. The form performs a native POST directly to the named provider. RoboSkin analytics record only the handoff and provider domain, not the entered email address or a confirmed subscription.

Newsletter completion must not be claimed until the following are verified end to end:

1. Select and configure a real email-list provider.
2. Publish the provider name and applicable privacy terms.
3. Test subscribe, any provider-required confirmation, delivery, and unsubscribe controls with a real test address.
4. Confirm the production HTML uses the intended HTTPS endpoint.
5. Record the first confirmed subscriber only from the provider's own subscriber state.

## Validation contract

Before deployment, run:

```text
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run verify:export
git diff --check
```

The export verifier checks graph count integrity, entity/source IDs, edge endpoints, source URL deduplication, LLM count consistency, sitemap exclusion, and the Newsletter state rendered across all exported HTML pages.

## Next evidence-backed growth actions

1. Add the first 10–20 verified organization entities only when an official laboratory, university, company, or project source supports the record.
2. Add 8–12 verified robot or embodiment entities and connect them to models, sensors, datasets, and papers using explicit source-backed relationships.
3. Select a Newsletter provider and complete the full subscribe-to-unsubscribe test before reopening the form.
4. Recheck GSC indexing and query/page movement in the next measurement window. Browser access timed out during this release, so no new GSC values were recorded.
5. Follow up the current academic correction invitations on their logged dates; do not send duplicate messages before the follow-up window.

The long-term target remains 300–500 verified structured research entities, 20–50 relevant referring domains, 1,000 Newsletter subscribers, and sustained non-brand search growth. Current graph count: 67 verified research entities.
