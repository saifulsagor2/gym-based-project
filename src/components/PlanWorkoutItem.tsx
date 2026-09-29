"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

type Workout = {
  id: number;
  name: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
};

type PlanWorkoutItemProps = {
  workout: Workout;
};

const PlanWorkoutItem = ({
  workout,
}: PlanWorkoutItemProps) => {

  const {
    removeFromPlan,
    markAsDone,
    markAsUndone,
    isCompleted,
    showToast,
  } = usePlan();

  const completed = isCompleted(workout.id);

  const handleDone = () => {

    if (completed) {
      markAsUndone(workout.id);

      showToast(
        "Workout marked as not completed",
        "success"
      );

      return;
    }

    markAsDone(workout.id);

    showToast(
      "Workout marked as done",
      "success"
    );
  };

  const handleRemove = () => {

    removeFromPlan(workout.id);

    showToast(
      "Removed from today's plan",
      "success"
    );
  };

  return (
    <div
      className={`plan-workout-item ${
        completed ? "completed" : ""
      }`}
    >

      <div className="plan-workout-left">

        <img
          src={workout.image}
          alt={workout.name}
        />

        <div>

          <h3>
            {workout.name}
          </h3>

          <p>
            {workout.equipment}
          </p>

          <div className="plan-workout-meta">

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

      </div>

      <div className="plan-workout-actions">

        <Link
          href={`/workouts/${workout.id}`}
          className="view-details-button"
        >
          View Details
        </Link>

        <button
          className={`done-button ${
            completed ? "completed-button" : ""
          }`}
          onClick={handleDone}
        >
          ✓ {completed ? "Completed" : "Mark as Done"}
        </button>

        <button
          className="remove-workout-button"
          onClick={handleRemove}
          aria-label="Remove workout"
        >
          ×
        </button>

      </div>

    </div>
  );
};

export default PlanWorkoutItem;