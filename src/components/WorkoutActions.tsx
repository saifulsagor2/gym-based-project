"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Toast from "@/components/Toast";

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

    const [toast, setToast] = useState("");

    const inPlan = isInPlan(workoutId);
    const saved = isSaved(workoutId);

    const showToast = (message: string) => {
        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 2000);
    };

    const handlePlanClick = () => {
        if (inPlan) {
            removeFromPlan(workoutId);
            showToast("Removed from today's plan");
            return;
        }

        const added = addToPlan(workoutId);

        if (!added) {
            showToast("Your plan already has 5 workouts");
            return;
        }

        showToast("Added to today's plan");
    };

    const handleSaveClick = () => {
        if (saved) {
            removeSavedWorkout(workoutId);
            showToast("Removed from saved");
            return;
        }

        saveWorkout(workoutId);
        showToast("Workout saved");
    };

    return (
        <>
            <div className="details-actions">

                <button
                    className="add-plan-button"
                    onClick={handlePlanClick}
                >
                    {inPlan
                        ? "REMOVE FROM PLAN"
                        : "ADD TO TODAY'S PLAN"}
                </button>

                <button
                    className="save-button"
                    onClick={handleSaveClick}
                >
                    {saved
                        ? "REMOVE SAVED"
                        : "SAVE FOR LATER"}
                </button>

            </div>

            {toast && (
                <Toast message={toast} />
            )}
        </>
    );
};

export default WorkoutActions;