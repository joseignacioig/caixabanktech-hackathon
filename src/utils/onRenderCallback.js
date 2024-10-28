import { addProfilerEntry } from './profilerData';

export function onRenderCallback(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
) {
    const interactionArray = interactions ? Array.from(interactions) : [];

    addProfilerEntry({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions: interactionArray,
    });
}
