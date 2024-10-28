export const profilerData = JSON.parse(localStorage.getItem("profilerData")) || [];

export const addProfilerEntry = (entry) => {
    profilerData.push(entry);
    localStorage.setItem("profilerData", JSON.stringify(profilerData));
};
