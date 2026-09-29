"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { usePlan } from "@/context/PlanContext";
import TodayPlan from "@/components/TodayPlan";
import PlanProgress from "@/components/PlanProgress";
import MyPlanCard from "@/components/MyPlanCard";

type Workout = {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: string[];
};

const MyPlanPage = () => {

    const {
        plannedWorkouts,
        removeFromPlan,
    } = usePlan();

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);


    // Fetch workouts from API
    useEffect(() => {

        const fetchWorkouts = async () => {

            try {

                const response = await fetch(
                    "https://api.abcz.workers.dev/api/fitlog"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch workouts");
                }

                const data = await response.json();

                setWorkouts(data);

            } catch (error) {

                console.error(
                    "Failed to load workouts:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchWorkouts();

    }, []);


    // Get only planned workouts
    const planWorkouts = workouts.filter((workout) =>
        plannedWorkouts.includes(workout.id)
    );


    return (
        <main>

            <section className="plan-page">

                <div className="plan-container">

                    {/* PAGE HEADER */}

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

                            <span>
                                PLANNED
                            </span>

                            <strong>
                                {planWorkouts.length}
                            </strong>

                        </div>

                    </div>


                    {/* LOADING */}

                    {loading ? (

                        <div className="loading-state">
                            Loading workouts...
                        </div>

                    ) : (

                        <>

                            {/* PROGRESS */}

                            <PlanProgress />


                            {/* TODAY PLAN */}

                            <TodayPlan />


                            {/* EMPTY PLAN */}

                            {planWorkouts.length === 0 ? (

                                <div className="empty-plan">

                                    <div className="empty-plan-icon">
                                        +
                                    </div>

                                    <h2>
                                        NOTHING HERE YET
                                    </h2>

                                    <p>
                                        Add workouts to today&apos;s
                                        plan and start training.
                                    </p>

                                    <Link
                                        href="/#library"
                                        className="browse-button"
                                    >
                                        GO TO WORKOUTS
                                    </Link>

                                </div>

                            ) : (

                                /* PLAN WORKOUTS */

                                <div className="plan-workouts">

                                    <div className="workout-grid">

                                        {planWorkouts.map(
                                            (workout) => (

                                                <div
                                                    className="plan-workout"
                                                    key={workout.id}
                                                >

                                                    <MyPlanCard
                                                        workout={workout}
                                                    />

                                                    <button
                                                        className="remove-plan-button"
                                                        onClick={() =>
                                                            removeFromPlan(
                                                                workout.id
                                                            )
                                                        }
                                                    >
                                                        REMOVE FROM PLAN
                                                    </button>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </section>

        </main>
    );
};

export default MyPlanPage;