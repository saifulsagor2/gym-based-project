"use client";

import { usePlan } from "@/context/PlanContext";

type WorkoutActionsProps = {
  workoutId: number;
};

const WorkoutActions = ({
  workoutId,
}: WorkoutActionsProps) => {
  const {
    addToPlan,
    removeFromPlan,
    isInPlan,
  } = usePlan();

  const inPlan = isInPlan(workoutId);

  const handlePlanClick = () => {
    if (inPlan) {
      removeFromPlan(workoutId);
    } else {
      addToPlan(workoutId);
    }
  };

  return (
    <div className="details-actions">

      <button
        className="add-plan-button"
        onClick={handlePlanClick}
      >
        {inPlan ? "REMOVE FROM PLAN" : "ADD TO PLAN"}
      </button>

      <button className="save-button">
        SAVE WORKOUT
      </button>

    </div>
  );
};

export default WorkoutActions;