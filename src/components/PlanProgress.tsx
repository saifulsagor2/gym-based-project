"use client";

import { usePlan } from "@/context/PlanContext";

const PlanProgress = () => {
  const {
    plannedWorkouts,
    completedWorkouts,
  } = usePlan();

  const total = plannedWorkouts.length;

  const completed = plannedWorkouts.filter((id) =>
    completedWorkouts.includes(id)
  ).length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="plan-progress">

      <div className="plan-progress-header">

        <div>
          <p className="plan-progress-label">
            TODAY&apos;S PROGRESS
          </p>

          <h2>
            {percentage}% COMPLETE
          </h2>
        </div>

        <span>
          {completed} / {total}
        </span>

      </div>

      <div className="progress-track">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

    </div>
  );
};

export default PlanProgress;