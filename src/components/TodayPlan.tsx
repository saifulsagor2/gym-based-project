"use client";

import { workouts } from "@/data/workouts";
import { usePlan } from "@/context/PlanContext";

const TodayPlan = () => {
  const {
    plannedWorkouts,
    completedWorkouts,
    markAsDone,
    markAsUndone,
  } = usePlan();

  const todayWorkouts = workouts.filter((workout) =>
    plannedWorkouts.includes(workout.id)
  );

  if (todayWorkouts.length === 0) {
    return null;
  }

  return (
    <section className="today-plan">

      <div className="today-plan-header">

        <div>
          <p className="today-plan-subtitle">
            TODAY
          </p>

          <h2>
            TODAY&apos;S PLAN.
          </h2>
        </div>

        <div className="today-progress">
          <span>COMPLETED</span>

          <strong>
            {completedWorkouts.length}
            {" / "}
            {todayWorkouts.length}
          </strong>
        </div>

      </div>

      <div className="today-plan-list">

        {todayWorkouts.map((workout) => {
          const completed = completedWorkouts.includes(
            workout.id
          );

          return (
            <div
              className={`today-plan-item ${
                completed ? "completed" : ""
              }`}
              key={workout.id}
            >

              <div className="today-plan-info">

                <div className="today-plan-number">
                  {String(workout.id).padStart(2, "0")}
                </div>

                <div>
                  <h3>{workout.name}</h3>

                  <p>
                    {workout.sets} sets × {workout.reps}
                  </p>
                </div>

              </div>

              <button
                className="done-button"
                onClick={() => {
                  if (completed) {
                    markAsUndone(workout.id);
                  } else {
                    markAsDone(workout.id);
                  }
                }}
              >
                {completed
                  ? "COMPLETED"
                  : "MARK AS DONE"}
              </button>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default TodayPlan;