import Link from "next/link";
import Navbar from "@/components/Navbar";

const MyPlanPage = () => {
  return (
    <main>
      <Navbar />

      <section className="plan-page">
        <div className="plan-container">

          <div className="plan-header">
            <div>
              <p className="plan-subtitle">
                YOUR PLAN
              </p>

              <h1>
                MY WORKOUT
                <br />
                PLAN.
              </h1>
            </div>

            <div className="plan-count">
              <span>PLANNED</span>
              <strong>0</strong>
            </div>
          </div>

          <div className="empty-plan">

            <div className="empty-plan-icon">
              +
            </div>

            <h2>
              YOUR PLAN IS EMPTY.
            </h2>

            <p>
              Pick a workout from the library and
              add it to your plan to get started.
            </p>

            <Link
              href="/#workouts"
              className="browse-button"
            >
              BROWSE WORKOUTS
            </Link>

          </div>

        </div>
      </section>
    </main>
  );
};

export default MyPlanPage;