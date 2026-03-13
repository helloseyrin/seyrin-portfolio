"use client";

import {
  Briefcase,
  GraduationCap,
  Seal,
  Flask,
  Wrench,
  Compass,
  Plant,
  Brain,
  type IconWeight,
} from "@phosphor-icons/react";

const GRAD_ID = "icon-grad-global";

function GradientIcon({
  icon: Icon,
  size = 36,
}: {
  icon: React.ComponentType<{ size?: number; weight?: IconWeight; color?: string }>;
  size?: number;
}) {
  return (
    <span style={{ display: "inline-flex", flexShrink: 0 }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <linearGradient id={GRAD_ID} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8aaac8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      <Icon size={size} weight="duotone" color={`url(#${GRAD_ID})`} />
    </span>
  );
}

export const IconExperience     = () => <GradientIcon icon={Briefcase} />;
export const IconEducation      = () => <GradientIcon icon={GraduationCap} />;
export const IconCertifications = () => <GradientIcon icon={Seal} />;
export const IconProjects       = () => <GradientIcon icon={Flask} />;
export const IconSkills         = () => <GradientIcon icon={Brain} />;
export const IconTools          = () => <GradientIcon icon={Wrench} />;
export const IconValues         = () => <GradientIcon icon={Compass} />;
export const IconAbout          = () => <GradientIcon icon={Plant} />;
