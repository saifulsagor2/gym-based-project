"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

type Workout = {
  id: number;
  name: string;
  category: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  description: string;
};

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const {
    addToPlan,
    removeFromPlan,
    isInPlan,
  } = usePlan();

  const inPlan = isInPlan(workout.id);

  const handlePlanClick = () => {
    if (inPlan) {
      removeFromPlan(workout.id);
    } else {
      addToPlan(workout.id);
    }
  };

  return (
    <div className="workout-card">

      <Link href={`/workouts/${workout.id}`}>
        <div className="workout-image">
          <img
            src={workout.image}
            alt={workout.name}
          />
        </div>
      </Link>

      <div className="workout-card-content">

        <div className="workout-tags">
          <span>{workout.category}</span>
          <span>{workout.muscle}</span>
        </div>

        <Link href={`/workouts/${workout.id}`}>
          <h3>{workout.name}</h3>
        </Link>

        <p className="workout-equipment">
          {workout.equipment}
        </p>

        <div className="workout-info">

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

        <button
          className={`card-plan-button ${
            inPlan ? "in-plan" : ""
          }`}
          onClick={handlePlanClick}
        >
          {inPlan ? "✓ IN PLAN" : "+ ADD TO PLAN"}
        </button>

      </div>

    </div>
  );
};

export default WorkoutCard;