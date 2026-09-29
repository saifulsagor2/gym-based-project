"use client";

import Link from "next/link";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Toast from "@/components/Toast";

type Workout = {
    id: number;
    name: string;
    equipment: string;
    duration: number;
    calories: number;
    rating: number;
    image: string;
};

type MyPlanCardProps = {
    workout: Workout;
};

const MyPlanCard = ({
    workout,
}: MyPlanCardProps) => {
    const {
        removeFromPlan,
        markAsDone,
        markAsUndone,
        isCompleted,
    } = usePlan();

    const [toast, setToast] = useState("");

    const completed = isCompleted(workout.id);

    const showToast = (message: string) => {
        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 2000);
    };

    const handleDone = () => {
        if (completed) {
            markAsUndone(workout.id);
            showToast("Workout marked as not done");
        } else {
            markAsDone(workout.id);
            showToast("Workout marked as done");
        }
    };

    const handleRemove = () => {
        removeFromPlan(workout.id);
        showToast("Workout removed from plan");
    };

    return (
        <>
            <div
                className={`my-plan-card ${
                    completed ? "completed" : ""
                }`}
            >
                <div className="my-plan-card-image">
                    <img
                        src={workout.image}
                        alt={workout.name}
                    />
                </div>

                <div className="my-plan-card-info">

                    <div>
                        <h3>{workout.name}</h3>

                        <p>
                            {workout.equipment}
                        </p>
                    </div>

                    <div className="my-plan-card-stats">

                        <span>
                            ◷ {workout.duration} min
                        </span>

                        <span>
                            🔥 {workout.calories} kcal
                        </span>

                        <span>
                            ★ {workout.rating}
                        </span>

                    </div>

                </div>

                <div className="my-plan-card-actions">

                    <Link
                        href={`/workouts/${workout.id}`}
                        className="view-details-button"
                    >
                        View Details
                    </Link>

                    <button
                        className={`mark-done-button ${
                            completed ? "done" : ""
                        }`}
                        onClick={handleDone}
                    >
                        ✓{" "}
                        {completed
                            ? "Completed"
                            : "Mark as Done"}
                    </button>

                    <button
                        className="remove-card-button"
                        onClick={handleRemove}
                        aria-label="Remove workout"
                    >
                        ×
                    </button>

                </div>
            </div>

            {toast && (
                <Toast message={toast} />
            )}
        </>
    );
};

export default MyPlanCard;