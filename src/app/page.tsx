import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WorkoutLibrary from "@/components/WorkoutLibrary";

const HomePage = () => {
  return (
    <main>
      <Navbar />

      <Hero />

      <WorkoutLibrary />
    </main>
  );
};

export default HomePage;