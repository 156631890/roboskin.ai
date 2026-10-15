import type { Metadata } from 'next';
import Link from 'next/link';
import VlaAssetLayout from '@/components/VlaAssetLayout';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/vla/concepts');
const linkClass = 'text-[#ffd5c5] underline underline-offset-4 hover:text-white';
const concepts = [
  {
    id: 'vla', name: 'VLA', expansion: 'Vision-language-action',
    definition: 'An observation-and-instruction-to-action interface: visual context and language condition robot action generation.',
    inputs: 'Camera observations and language; robot state and contact sensing depend on the implementation.',
    outputs: 'Action tokens, continuous motor commands or action chunks.',
    examples: 'RT-2, OpenVLA, RDT and π0; VLA-Touch adds a modular tactile feedback path.',
    relationship: 'Describes what the model connects. It does not require one action-generation algorithm or a predictive world model.',
    sources: [{ label: 'RT-2: the VLA formulation', href: 'https://arxiv.org/abs/2307.15818' }, { label: 'OpenVLA', href: 'https://arxiv.org/abs/2406.09246' }],
  },
  {
    id: 'vda', name: 'VDA', expansion: 'Working definition: vision-conditioned diffusion action policy',
    definition: 'An ambiguous shorthand. Here it means generating robot actions through a diffusion process conditioned on visual observations; it is not treated as a standardized model class.',
    inputs: 'Visual observations and usually robot state; some implementations also condition on language.',
    outputs: 'A denoised action or action sequence. Generating an action does not itself predict the next observation.',
    examples: 'Diffusion Policy illustrates the mechanism without language; RDT is a language-conditioned diffusion policy. These papers do not need the VDA label.',
    relationship: 'Overlaps with VLA when language also conditions actions. A diffusion action head alone is not a world model.',
    sources: [{ label: 'Diffusion Policy: action diffusion', href: 'https://arxiv.org/abs/2303.04137' }, { label: 'RDT: language-conditioned diffusion', href: 'https://arxiv.org/abs/2410.07864' }],
  },
  {
    id: 'world-model', name: 'World model', expansion: 'Predictive environment dynamics',
    definition: 'A model of how an environment changes, often conditioned on actions. Its predictive representation may be latent rather than a rendered video.',
    inputs: 'Observations or latent state, with action conditioning where the model supports controllable rollouts.',
    outputs: 'Predicted future state, observations, rewards or related dynamics quantities.',
    examples: 'DreamerV3 learns environment dynamics and improves a separate behavior policy through imagined futures.',
    relationship: 'Can support training, planning or evaluation for a policy. Prediction and motor control remain distinct interfaces even inside a combined system.',
    sources: [{ label: 'DreamerV3: learning through world models', href: 'https://arxiv.org/abs/2301.04104' }],
  },
  {
    id: 'hfm', name: 'HFM', expansion: 'Haptic foundation model',
    definition: 'A proposed reusable foundation for heterogeneous contact signals; the scope overlaps with tactile foundation models.',
    inputs: 'Touch / contact observations; the cited proposal discusses multimodal alignment and action-coupled sensing.',
    outputs: 'Reusable haptic representations, with action-conditioned prediction and active sensing among the proposed objectives.',
    examples: 'Sparsh and UniTouch illustrate reusable touch representations. The HFM proposal is not a new universal checkpoint.',
    relationship: 'Could supply contact features to a VLA or tactile world model. A representation benchmark does not establish a closed-loop robot policy.',
    sources: [{ label: 'The Potential of Haptic Foundation Models', href: 'https://arxiv.org/html/2608.28664v1' }, { label: 'Sparsh', href: 'https://arxiv.org/abs/2410.24090' }],
  },
];

export default function VlaConceptsPage() {
  return <VlaAssetLayout path="/vla/concepts" eyebrow="Concept disambiguation" title="VLA vs VDA vs world models vs HFM"
    intro="Compare model roles from the point of view of a VLA system: what enters the model, what comes out, and which part of the robot’s decision loop it can support. These labels describe overlapping dimensions.">
    <section className="pb-12">
      <div className="container-shell">
        <div className="signal-panel p-6 text-sm leading-relaxed text-[#c8d1de]">
          <h2 className="text-xl font-semibold text-white">Expand VDA before comparing architectures</h2>
          <p className="mt-3">A unique, authoritative expansion of VDA was not found in the reviewed primary sources. This page uses “vision-conditioned diffusion action policy” as an explicit working definition,
            sometimes informally expanded as “Vision-Diffusion-Action”. The cited authors call their methods <a href="https://arxiv.org/abs/2303.04137" className={linkClass}>Diffusion Policy</a> and <a href="https://arxiv.org/abs/2410.07864" className={linkClass}>Robotics Diffusion Transformer</a>.
            The shorthand should not be read as their own taxonomy. If a source means video diffusion or dynamics by the same letters, inspect its actual prediction target before applying this comparison.</p>
        </div>
      </div>
    </section>
    <section className="pb-14" aria-labelledby="concept-table-title">
      <div className="container-shell min-w-0">
        <h2 id="concept-table-title" className="text-3xl font-bold text-white">Compare definitions, inputs and outputs</h2>
        <p id="concept-scroll-help" className="my-4 text-sm text-[#8e98a8]">Scroll horizontally to compare all fields. Sources in each row support its technical description and examples.</p>
        <div role="region" aria-label="Scrollable model concept comparison" aria-describedby="concept-scroll-help" tabIndex={0} className="signal-panel max-w-full overflow-x-auto p-0 focus-visible:outline-2 focus-visible:outline-[#ff6b3d]">
          <table className="w-full min-w-[1400px] border-collapse text-left text-sm leading-relaxed">
            <caption className="sr-only">VLA, VDA, world model and HFM comparison with definitions, inputs, outputs, examples, relationships and sources.</caption>
            <thead className="bg-[#111722] text-white"><tr>{['Concept', 'Definition', 'Inputs', 'Outputs', 'Representative models', 'Relationship to VLA', 'Primary sources'].map((name) => <th key={name} scope="col" className="p-4">{name}</th>)}</tr></thead>
            <tbody>{concepts.map((item) => <tr key={item.id} className="border-t border-white/10 align-top text-[#c8d1de]">
              <th scope="row" className="min-w-[160px] p-4"><a href={`#${item.id}`} className={`${linkClass} text-base`}>{item.name}</a><span className="mt-2 block font-normal text-[#aeb8c7]">{item.expansion}</span></th>
              {[item.definition, item.inputs, item.outputs, item.examples, item.relationship].map((text, index) => <td key={index} className="min-w-[200px] p-4">{text}</td>)}
              <td className="min-w-[180px] p-4">{item.sources.map((source) => <a key={source.href} href={source.href} className={`${linkClass} mb-3 block`}>{source.label} ↗</a>)}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
    <section className="pb-16">
      <div className="container-shell grid gap-5 lg:grid-cols-2">
        <article id="vla" className="signal-panel scroll-mt-24 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">VLA names an interface, not one architecture</h2>
          <p className="mt-4 leading-relaxed text-[#c8d1de]">Start with the output contract: does the system produce executable actions, or text that another controller must interpret?
            <a href="https://arxiv.org/abs/2307.15818" className={linkClass}> RT-2</a> puts actions into a token representation, while <a href="https://arxiv.org/abs/2410.24164" className={linkClass}>π0</a> uses flow matching for continuous action generation.
            Both connect visual context and language to action. <a href="https://arxiv.org/abs/2303.03378" className={linkClass}>PaLM-E</a> is relevant to the history but produces high-level text / decisions, with a separate execution policy.</p>
          <p className="mt-4 text-sm leading-relaxed text-[#aeb8c7]">Use the existing <Link href="/glossary#vision-language-action-model" className={linkClass}>VLA glossary definition</Link> for the short form, then inspect the <Link href="/vla/models" className={linkClass}>model’s exact inputs and output role</Link>.</p>
        </article>
        <article id="vda" className="signal-panel scroll-mt-24 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Diffusion describes how an action is generated</h2>
          <p className="mt-4 leading-relaxed text-[#c8d1de]"><a href="https://arxiv.org/abs/2303.04137" className={linkClass}>Original Diffusion Policy</a> learns a conditional denoising process over actions. It does not require language conditioning.
            <a href="https://arxiv.org/abs/2410.07864" className={linkClass}> RDT</a> combines diffusion action generation with language instructions, so a model can fit both the VLA interface and the working VDA description used here.</p>
          <p className="mt-4 leading-relaxed text-[#c8d1de]">Flow matching, used by <a href="https://arxiv.org/abs/2410.24164" className={linkClass}>π0</a>, is a related generative construction with its own training objective; it should not silently be relabeled as the original Diffusion Policy algorithm.
            Neither an action diffusion model nor a flow-matching action head automatically supplies a model of future observations.</p>
        </article>
        <article id="world-model" className="signal-panel scroll-mt-24 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">A world model predicts consequences</h2>
          <p className="mt-4 leading-relaxed text-[#c8d1de]">A policy asks which action to take; a predictive dynamics model asks how the environment might evolve.
            <a href="https://arxiv.org/abs/2301.04104" className={linkClass}> DreamerV3</a> learns environment dynamics and improves behavior through imagined futures. The learned world model and the behavior policy serve different roles within that system.</p>
          <p className="mt-4 leading-relaxed text-[#c8d1de]">For contact-rich robotics, the prediction target may be a tactile image, force-related state or latent contact representation.
            Use the existing <Link href="/glossary#tactile-world-model" className={linkClass}>tactile world model definition</Link> and <Link href="/robot-world-models" className={linkClass}>world-model evidence guide</Link> to check action conditioning, rollout quality and whether prediction improves robot control.</p>
        </article>
        <article id="hfm" className="signal-panel scroll-mt-24 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">HFM concerns reusable contact knowledge</h2>
          <p className="mt-4 leading-relaxed text-[#c8d1de]">From a VLA integration perspective, a reusable haptic encoder could supply contact features to an action policy; a haptic dynamics model could instead predict consequences for planning.
            These are possible integration roles, not capabilities established for every HFM. <a href="https://arxiv.org/html/2608.28664v1" className={linkClass}>The HFM proposal</a> distinguishes its broader design objectives from the frozen-encoder tasks actually benchmarked.</p>
          <p className="mt-4 leading-relaxed text-[#c8d1de]">The detailed terminology discussion already lives in <Link href="/tactile-foundation-models#tactile-vs-haptic-foundation-model" className={linkClass}>tactile foundation model vs haptic foundation model</Link>.
            Follow that comparison for the scope and evidence limits, or the <Link href="/glossary#hfm" className={linkClass}>HFM glossary entry</Link> for the concise definition.</p>
        </article>
      </div>
      <div className="container-shell mt-6">
        <div className="signal-panel p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Read a system by its interfaces</h2>
          <p className="mt-4 max-w-5xl leading-relaxed text-[#c8d1de]">Check what observations are available at inference, what is predicted, which controller executes the result, and which experiment supports the claimed behavior.
            In <a href="https://arxiv.org/abs/2507.17294" className={linkClass}>VLA-Touch</a>, touch contributes to high-level planning and action refinement around a base policy.
            That modular composition shows why a tactile encoder, VLA and controller can coexist without becoming the same model category.</p>
          <p className="mt-4 text-sm"><Link href="/robot-vla-models#tactile-vla-integration-index" className={linkClass}>Compare the existing tactile integration mechanisms →</Link></p>
        </div>
      </div>
    </section>
  </VlaAssetLayout>;
}
