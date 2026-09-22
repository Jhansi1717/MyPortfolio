import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Container } from '../components/primitives/Container';
import { GitHubTelemetryCard } from '../components/buildActivity/GitHubTelemetryCard';
import { LeetCodeTelemetryCard } from '../components/buildActivity/LeetCodeTelemetryCard';
import { MOTION_TIMING, MOTION_EASING } from '../animations/motionTokens';

export const BuildActivitySection: React.FC = () => {
  return (
    <section
      id="build-activity"
      aria-label="Build Activity: GitHub and LeetCode Telemetry"
      className="py-20 md:py-28 border-b border-[#292720]"
    >
      <Container size="wide">
        <SectionHeading
          indexTag="05 // BUILD ACTIVITY"
          title="05 / BUILD ACTIVITY: CODE EVIDENCE"
          description="Real-time version control activity and problem-solving metrics directly pulled from GitHub and LeetCode."
        />

        {/* Dual Column Telemetry Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          {/* GitHub Telemetry Card (8 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: MOTION_TIMING.slow, ease: MOTION_EASING.smooth }}
            className="lg:col-span-8 flex flex-col"
          >
            <GitHubTelemetryCard />
          </motion.div>

          {/* LeetCode Telemetry Card (4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: MOTION_TIMING.slow, delay: 0.1, ease: MOTION_EASING.smooth }}
            className="lg:col-span-4 flex flex-col"
          >
            <LeetCodeTelemetryCard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

