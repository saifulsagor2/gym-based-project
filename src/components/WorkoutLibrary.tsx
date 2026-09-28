import { workouts } from "@/data/workouts";
import WorkoutCard from "./WorkoutCard";

const WorkoutLibrary = () => {
  return (
    <section id="workouts" className="workout-library">
      <div className="library-header">

        <div>
          <p className="library-subtitle">
            THE LIBRARY
          </p>

          <h2>
            WORKOUTS FOR
            <br />
            EVERY GOAL.
          </h2>
        </div>

        <p className="library-description">
          Twelve lifts covering every major muscle group.
          Pick a workout, add it to your plan, and get to work.
        </p>

      </div>

      <div className="workout-grid">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkoutLibrary;