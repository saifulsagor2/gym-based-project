"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import WorkoutCard from "@/components/WorkoutCard";
import { workouts } from "@/data/workouts";
import { usePlan } from "@/context/PlanContext";
import TodayPlan from "@/components/TodayPlan";
import PlanProgress from "@/components/PlanProgress";

const MyPlanPage = () => {
    const {
        plannedWorkouts,
        removeFromPlan,
    } = usePlan();

    const planWorkouts = workouts.filter((workout) =>
        plannedWorkouts.includes(workout.id)
    );

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
                            <strong>{planWorkouts.length}</strong>
                        </div>

                    </div>

                    <PlanProgress />

                    <TodayPlan />

                    {planWorkouts.length === 0 ? (
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
                    ) : (
                        <div className="plan-workouts">

                            <div className="workout-grid">
                                {planWorkouts.map((workout) => (
                                    <div
                                        className="plan-workout"
                                        key={workout.id}
                                    >

                                        <WorkoutCard
                                            workout={workout}
                                        />

                                        <button
                                            className="remove-plan-button"
                                            onClick={() =>
                                                removeFromPlan(workout.id)
                                            }
                                        >
                                            REMOVE FROM PLAN
                                        </button>

                                    </div>
                                ))}
                            </div>

                        </div>
                    )}

                </div>
            </section>
        </main>
    );
};

export default MyPlanPage;