async function init() {
    const lastWorkout = await API.getLastWorkout();
    console.log(lastWorkout);
  
    document
      .querySelector("a[href='public/exercise.html']")
      .setAttribute("href", `public/exercise.html=${lastWorkout._id}`);
  
    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };
  
    renderWorkoutSummary(workoutSummary);
  }
  
  function tallyExercises(exercises) {
    const tallied = exercises.reduce((acc, curr) => {
      if (curr.type === "resistance") {
        acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
        acc.totalSets = (acc.totalSets || 0) + curr.sets;
        acc.totalReps = (acc.totalReps || 0) + curr.reps;
      } else if (curr.type === "cardio") {
        acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
      }
      return acc;
    }, {});
    return tallied;
  }
  
  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
  
    return new Date(date).toLocaleDateString(options);
  }
  
  function renderWorkoutSummary(summary) {
    const container = document.querySelector(".workout-stats");
  
    const workoutKeyMap = {
      date: "Date",
      totalDuration: "Total Workout Duration",
      numExercises: "Exercises Performed",
      totalWeight: "Total Weight Lifted",
      totalSets: "Total Sets Performed",
      totalReps: "Total Reps Performed",
      totalDistance: "Total Distance Covered"
    };
  
    Object.keys(summary).forEach(key => {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
  
      strong.textContent = workoutKeyMap[key];
      const textNode = document.createTextNode(`: ${summary[key]}`);
  
      p.appendChild(strong);
      p.appendChild(textNode);
  
      container.appendChild(p);
    });
  }
  
  init();