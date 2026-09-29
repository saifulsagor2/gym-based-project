"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type PlanContextType = {
    plannedWorkouts: number[];
    savedWorkouts: number[];
    completedWorkouts: number[];

    addToPlan: (id: number) => boolean;
    removeFromPlan: (id: number) => void;

    saveWorkout: (id: number) => void;
    removeSavedWorkout: (id: number) => void;

    markAsDone: (id: number) => void;
    markAsUndone: (id: number) => void;

    isInPlan: (id: number) => boolean;
    isSaved: (id: number) => boolean;
    isCompleted: (id: number) => boolean;

    planCount: number;
    savedCount: number;
    completedCount: number;

    showToast: (
        message: string,
        type?: "success" | "error"
    ) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(
    undefined
);

export const PlanProvider = ({
    children,
}: {
    children: ReactNode;
}) => {

    const [plannedWorkouts, setPlannedWorkouts] = useState<number[]>(
        []
    );

    const [savedWorkouts, setSavedWorkouts] = useState<number[]>(
        []
    );

    const [completedWorkouts, setCompletedWorkouts] = useState<number[]>(
        []
    );

    const [isLoaded, setIsLoaded] = useState(false);


    // Load data from localStorage
    useEffect(() => {

        const savedPlan = localStorage.getItem(
            "fitlog-planned-workouts"
        );

        const savedData = localStorage.getItem(
            "fitlog-saved-workouts"
        );

        const completedData = localStorage.getItem(
            "fitlog-completed-workouts"
        );


        if (savedPlan) {
            setPlannedWorkouts(JSON.parse(savedPlan));
        }

        if (savedData) {
            setSavedWorkouts(JSON.parse(savedData));
        }

        if (completedData) {
            setCompletedWorkouts(JSON.parse(completedData));
        }

        setIsLoaded(true);

    }, []);


    // Save plan
    useEffect(() => {

        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-planned-workouts",
            JSON.stringify(plannedWorkouts)
        );

    }, [plannedWorkouts, isLoaded]);


    // Save saved workouts
    useEffect(() => {

        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-saved-workouts",
            JSON.stringify(savedWorkouts)
        );

    }, [savedWorkouts, isLoaded]);


    // Save completed workouts
    useEffect(() => {

        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog-completed-workouts",
            JSON.stringify(completedWorkouts)
        );

    }, [completedWorkouts, isLoaded]);


    // Toast
    const showToast = (
        message: string,
        type: "success" | "error" = "success"
    ) => {

        const toast = document.createElement("div");

        toast.className = `fitlog-toast ${type}`;

        toast.textContent = message;

        document.body.appendChild(toast);


        setTimeout(() => {
            toast.classList.add("show");
        }, 10);


        setTimeout(() => {
            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 2500);
    };


    // Add to plan
    const addToPlan = (id: number) => {

        if (plannedWorkouts.includes(id)) {
            return true;
        }


        if (plannedWorkouts.length >= 5) {

            showToast(
                "Today's plan can contain only 5 workouts.",
                "error"
            );

            return false;
        }


        setPlannedWorkouts((workouts) => [
            ...workouts,
            id,
        ]);

        showToast(
            "Workout added to today's plan.",
            "success"
        );

        return true;
    };


    // Remove from plan
    const removeFromPlan = (id: number) => {

        setPlannedWorkouts((workouts) =>
            workouts.filter(
                (workoutId) => workoutId !== id
            )
        );

        setCompletedWorkouts((workouts) =>
            workouts.filter(
                (workoutId) => workoutId !== id
            )
        );

    };


    // Save workout
    const saveWorkout = (id: number) => {

        setSavedWorkouts((workouts) => {

            if (workouts.includes(id)) {
                return workouts;
            }

            return [...workouts, id];

        });

        showToast(
            "Workout saved for later.",
            "success"
        );

    };


    // Remove saved workout
    const removeSavedWorkout = (id: number) => {

        setSavedWorkouts((workouts) =>
            workouts.filter(
                (workoutId) => workoutId !== id
            )
        );

    };


    // Mark as done
    const markAsDone = (id: number) => {

        setCompletedWorkouts((workouts) => {

            if (workouts.includes(id)) {
                return workouts;
            }

            return [...workouts, id];

        });

    };


    // Mark as undone
    const markAsUndone = (id: number) => {

        setCompletedWorkouts((workouts) =>
            workouts.filter(
                (workoutId) => workoutId !== id
            )
        );

    };


    // Check plan
    const isInPlan = (id: number) => {
        return plannedWorkouts.includes(id);
    };


    // Check saved
    const isSaved = (id: number) => {
        return savedWorkouts.includes(id);
    };


    // Check completed
    const isCompleted = (id: number) => {
        return completedWorkouts.includes(id);
    };


    return (
        <PlanContext.Provider
            value={{

                plannedWorkouts,
                savedWorkouts,
                completedWorkouts,

                addToPlan,
                removeFromPlan,

                saveWorkout,
                removeSavedWorkout,

                markAsDone,
                markAsUndone,

                isInPlan,
                isSaved,
                isCompleted,

                planCount: plannedWorkouts.length,
                savedCount: savedWorkouts.length,
                completedCount: completedWorkouts.length,

                showToast,

            }}
        >
            {children}
        </PlanContext.Provider>
    );
};


export const usePlan = () => {

    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            "usePlan must be used inside PlanProvider"
        );
    }

    return context;
};