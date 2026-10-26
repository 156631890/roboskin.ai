// The form emits only a fixed stage. Consent and transport belong to GoogleAnalytics.
export const researchInquirySignal = 'roboskin:research-inquiry';

const stages = new Map([
  ['start', 'research_inquiry_start'],
  ['submit', 'research_inquiry_submit'],
  ['accepted', 'research_inquiry_accepted'],
  ['error', 'research_inquiry_error'],
]);

export function researchInquiryEvent(location, stage) {
  try {
    const url = new URL(location);
    if (url.origin !== 'https://roboskin.ai' || url.pathname !== '/research-services' || !stages.has(stage)) return null;
    return {
      name: stages.get(stage),
      parameters: { form_id: 'research-services', page_path: '/research-services' },
    };
  } catch { return null; }
}

export function emitResearchInquiryStage(stage) {
  if (typeof window === 'undefined' || !stages.has(stage)) return;
  // Telemetry must never interrupt delivery or change the form's success state.
  try { window.dispatchEvent(new CustomEvent(researchInquirySignal, { detail: stage })); } catch { /* Analytics is optional. */ }
}
