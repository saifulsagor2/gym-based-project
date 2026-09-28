"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const { planCount, savedCount } = usePlan();

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link href="/" className="logo">
          <span className="logo-icon">⚡</span>
          FITLOG
        </Link>

        <nav className="nav-links">

          <Link
            href="/"
            className="nav-link active"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="nav-link"
          >
            My Plan
          </Link>

        </nav>

        <div className="nav-stats">

          <Link
            href="/my-plan"
            className="nav-stat"
          >
            <span>Plan</span>
            <strong>{planCount}</strong>
          </Link>

          <div className="nav-stat">
            <span>Saved</span>
            <strong>{savedCount}</strong>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;