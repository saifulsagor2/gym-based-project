"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type PlanContextType = {
  plannedWorkouts: number[];
  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  isInPlan: (id: number) => boolean;
  planCount: number;
};

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

type PlanProviderProps = {
  children: ReactNode;
};

export const PlanProvider = ({
  children,
}: PlanProviderProps) => {
  const [plannedWorkouts, setPlannedWorkouts] = useState<number[]>(
    []
  );

  const addToPlan = (id: number) => {
    setPlannedWorkouts((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlannedWorkouts((current) =>
      current.filter((workoutId) => workoutId !== id)
    );
  };

  const isInPlan = (id: number) => {
    return plannedWorkouts.includes(id);
  };

  return (
    <PlanContext.Provider
      value={{
        plannedWorkouts,
        addToPlan,
        removeFromPlan,
        isInPlan,
        planCount: plannedWorkouts.length,
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