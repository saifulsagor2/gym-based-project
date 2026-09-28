import Link from "next/link";
import { workouts } from "@/data/workouts";
import WorkoutActions from "@/components/WorkoutActions";


type WorkoutDetailsPageProps = {
    params: Promise<{
        id: string;
    }>;
};

const WorkoutDetailsPage = async ({
    params,
}: WorkoutDetailsPageProps) => {
    const { id } = await params;

    const workout = workouts.find(
        (item) => item.id === Number(id)
    );

    if (!workout) {
        return (
            <main className="details-page">
                <div className="details-container">
                    <h1>Workout Not Found</h1>

                    <p>
                        The workout you are looking for does not exist.
                    </p>

                    <Link href="/" className="back-button">
                        BACK TO WORKOUTS
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="details-page">

            <div className="details-container">

                <Link href="/" className="back-link">
                    ← BACK TO WORKOUTS
                </Link>

                <div className="details-content">

                    <div className="details-image">
                        <img
                            src={workout.image}
                            alt={workout.name}
                        />
                    </div>

                    <div className="details-info">

                        <div className="details-tags">
                            <span>{workout.category}</span>
                            <span>{workout.difficulty}</span>
                        </div>

                        <h1>{workout.name}</h1>

                        <p className="details-description">
                            {workout.description}
                        </p>

                        <div className="details-stats">

                            <div className="details-stat">
                                <span>Muscle</span>
                                <strong>{workout.muscle}</strong>
                            </div>

                            <div className="details-stat">
                                <span>Equipment</span>
                                <strong>{workout.equipment}</strong>
                            </div>

                            <div className="details-stat">
                                <span>Sets</span>
                                <strong>{workout.sets}</strong>
                            </div>

                            <div className="details-stat">
                                <span>Reps</span>
                                <strong>{workout.reps}</strong>
                            </div>

                            <div className="details-stat">
                                <span>Duration</span>
                                <strong>{workout.duration} min</strong>
                            </div>

                            <div className="details-stat">
                                <span>Calories</span>
                                <strong>{workout.calories} kcal</strong>
                            </div>

                        </div>

                        <WorkoutActions workoutId={workout.id} />

                    </div>

                </div>

            </div>

        </main>
    );
};

export default WorkoutDetailsPage;