import Link from "next/link";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link href="/" className="logo">
          <span className="logo-icon">⚡</span>
          FITLOG
        </Link>

        <nav className="nav-links">
          <Link href="/" className="nav-link active">
            Workouts
          </Link>

          <Link href="/my-plan" className="nav-link">
            My Plan
          </Link>
        </nav>

        <div className="nav-stats">

          <Link href="/my-plan" className="nav-stat">
            <span>Plan</span>
            <strong>0</strong>
          </Link>

          <Link href="/my-plan" className="nav-stat">
            <span>Saved</span>
            <strong>0</strong>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;