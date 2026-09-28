import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">

        <div className="hero-text">

          <p className="hero-subtitle">
            WORKOUT LIBRARY
          </p>

          <h1>
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="hero-description">
            FitLog is a dark, no-nonsense gym companion:
            pick a lift, lock it into today&apos;s plan,
            and watch the week&apos;s work add up.
          </p>

          <Link href="#workouts" className="hero-button">
            BROWSE WORKOUTS
          </Link>

        </div>

        <div className="hero-image">
          <img
            src="/assets/banner.png"
            alt="Workout illustration"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;