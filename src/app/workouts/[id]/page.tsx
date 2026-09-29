import Link from "next/link";
import WorkoutActions from "@/components/WorkoutActions";

type Workout = {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    sets: number;
    reps: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
    description: string;
    instructions: string[];
};

type WorkoutDetailsPageProps = {
    params: Promise<{
        id: string;
    }>;
};

const WorkoutDetailsPage = async ({
    params,
}: WorkoutDetailsPageProps) => {

    const { id } = await params;

    let workout: Workout | null = null;

    try {

        const response = await fetch(
            `https://api.abcz.workers.dev/api/fitlog/${id}`,
            {
                cache: "no-store",
            }
        );

        if (response.ok) {
            workout = await response.json();
        }

    } catch (error) {

        console.error(
            "Failed to fetch workout:",
            error
        );

    }


    if (!workout) {

        return (
            <main className="details-page">

                <div className="details-container">

                    <h1>
                        Workout Not Found
                    </h1>

                    <p>
                        The workout you are looking for does not exist.
                    </p>

                    <Link
                        href="/"
                        className="back-button"
                    >
                        BACK TO WORKOUTS
                    </Link>

                </div>

            </main>
        );
    }


    return (
        <main className="details-page">

            <div className="details-container">

                <Link
                    href="/"
                    className="back-link"
                >
                    ← BACK TO WORKOUTS
                </Link>


                <div className="details-content">


                    {/* IMAGE */}

                    <div className="details-image">

                        <img
                            src={workout.image}
                            alt={workout.name}
                        />

                    </div>


                    {/* DETAILS */}

                    <div className="details-info">


                        {/* TAGS */}

                        <div className="details-tags">

                            <span>
                                {workout.muscleGroups?.[0]}
                            </span>

                            <span>
                                {workout.difficulty}
                            </span>

                        </div>


                        {/* TITLE */}

                        <h1>
                            {workout.name}
                        </h1>


                        {/* DESCRIPTION */}

                        <p className="details-description">
                            {workout.description}
                        </p>


                        {/* STATS */}

                        <div className="details-stats">


                            <div className="details-stat">

                                <span>
                                    Muscle
                                </span>

                                <strong>
                                    {workout.muscleGroups?.join(", ")}
                                </strong>

                            </div>


                            <div className="details-stat">

                                <span>
                                    Equipment
                                </span>

                                <strong>
                                    {workout.equipment}
                                </strong>

                            </div>


                            <div className="details-stat">

                                <span>
                                    Sets
                                </span>

                                <strong>
                                    {workout.sets}
                                </strong>

                            </div>


                            <div className="details-stat">

                                <span>
                                    Reps
                                </span>

                                <strong>
                                    {workout.reps}
                                </strong>

                            </div>


                            <div className="details-stat">

                                <span>
                                    Duration
                                </span>

                                <strong>
                                    {workout.duration} min
                                </strong>

                            </div>


                            <div className="details-stat">

                                <span>
                                    Calories
                                </span>

                                <strong>
                                    {workout.caloriesBurned} kcal
                                </strong>

                            </div>


                            <div className="details-stat">

                                <span>
                                    Rating
                                </span>

                                <strong>
                                    ★ {workout.rating}
                                </strong>

                            </div>


                        </div>


                        {/* INSTRUCTIONS */}

                        {workout.instructions &&
                            workout.instructions.length > 0 && (

                                <div className="instructions">

                                    <h2>
                                        INSTRUCTIONS
                                    </h2>

                                    <ol>

                                        {workout.instructions
                                            .slice(0, 4)
                                            .map((instruction, index) => (

                                                <li key={index}>
                                                    {instruction}
                                                </li>

                                            ))}

                                    </ol>

                                </div>

                            )}


                        {/* ACTION BUTTONS */}

                        <WorkoutActions
                            workoutId={workout.id}
                        />


                    </div>

                </div>

            </div>

        </main>
    );
};

export default WorkoutDetailsPage;