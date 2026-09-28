"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type PlanContextType = {
  plannedWorkouts: number[];
  savedWorkouts: number[];
  completedWorkouts: number[];

  addToPlan: (id: number) => void;
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

  const addToPlan = (id: number) => {
    setPlannedWorkouts((workouts) => {
      if (workouts.includes(id)) {
        return workouts;
      }

      return [...workouts, id];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlannedWorkouts((workouts) =>
      workouts.filter((workoutId) => workoutId !== id)
    );

    setCompletedWorkouts((workouts) =>
      workouts.filter((workoutId) => workoutId !== id)
    );
  };

  const saveWorkout = (id: number) => {
    setSavedWorkouts((workouts) => {
      if (workouts.includes(id)) {
        return workouts;
      }

      return [...workouts, id];
    });
  };

  const removeSavedWorkout = (id: number) => {
    setSavedWorkouts((workouts) =>
      workouts.filter((workoutId) => workoutId !== id)
    );
  };

  const markAsDone = (id: number) => {
    setCompletedWorkouts((workouts) => {
      if (workouts.includes(id)) {
        return workouts;
      }

      return [...workouts, id];
    });
  };

  const markAsUndone = (id: number) => {
    setCompletedWorkouts((workouts) =>
      workouts.filter((workoutId) => workoutId !== id)
    );
  };

  const isInPlan = (id: number) => {
    return plannedWorkouts.includes(id);
  };

  const isSaved = (id: number) => {
    return savedWorkouts.includes(id);
  };

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
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};