import Link from 'next/link';
import type { AiRobotLoopStage } from '@/content/site';

type AiRobotClosedLoopProps = {
  stages: AiRobotLoopStage[];
};

export default function AiRobotClosedLoop({ stages }: AiRobotClosedLoopProps) {
  return (
    <div className="ai-robot-loop">
      <ol className="ai-robot-loop-grid" aria-label="AI to robot action and feedback loop">
        {stages.map((item) => (
          <li key={item.stage} className="ai-robot-stage">
            <Link href={item.href}>
              <span>{item.stage}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <small aria-hidden="true">Open layer →</small>
            </Link>
          </li>
        ))}
      </ol>
      <div className="ai-robot-feedback-rail">
        <span>Feedback path</span>
        <p>
          Physical contact returns evidence to perception, control, and learning. This is the layer where robot skin and
          tactile AI make a general robot model contact-aware.
        </p>
        <Link href="/robot-learning">Follow the learning loop →</Link>
      </div>
    </div>
  );
}
