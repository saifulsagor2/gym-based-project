"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const { planCount, savedCount } = usePlan();
  const pathname = usePathname();

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
            className={`nav-link ${
              pathname === "/" ? "active" : ""
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`nav-link ${
              pathname === "/my-plan" ? "active" : ""
            }`}
          >
            My Plan
          </Link>

        </nav>

        <div className="nav-stats">

          <Link
            href="/my-plan"
            className="nav-stat plan-stat"
          >
            <span>Plan</span>
            <strong>{planCount}</strong>
          </Link>

          <Link
            href="/my-plan"
            className="nav-stat saved-stat"
          >
            <span>Saved</span>
            <strong>{savedCount}</strong>
          </Link>

        </div>

      </div>

    </header>
  );
};

export default Navbar;