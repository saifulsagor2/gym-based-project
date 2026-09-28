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

    saveWorkout,
    removeSavedWorkout,
    isSaved,
  } = usePlan();

  const inPlan = isInPlan(workoutId);
  const saved = isSaved(workoutId);

  const handlePlanClick = () => {
    if (inPlan) {
      removeFromPlan(workoutId);
    } else {
      addToPlan(workoutId);
    }
  };

  const handleSaveClick = () => {
    if (saved) {
      removeSavedWorkout(workoutId);
    } else {
      saveWorkout(workoutId);
    }
  };

  return (
    <div className="details-actions">

      <button
        className="add-plan-button"
        onClick={handlePlanClick}
      >
        {inPlan
          ? "REMOVE FROM PLAN"
          : "ADD TO PLAN"}
      </button>

      <button
        className="save-button"
        onClick={handleSaveClick}
      >
        {saved
          ? "REMOVE SAVED"
          : "SAVE WORKOUT"}
      </button>

    </div>
  );
};

export default WorkoutActions;