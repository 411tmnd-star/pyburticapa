/**
 * Public API of the audio pipeline (React-free core). React bindings are in "./react".
 *
 *   contract    AudioFeatureFrame, SceneState, IDLE_FRAME
 *   sources     createSyntheticSource, loadOfflineSource, createLiveFileSource, createLiveUrlSource, createMicSource
 *   pipeline    AudioPipeline
 */
export * from "./contract";
export { AudioPipeline, browserScheduler, type PipelineState, type Scheduler, type SourceInfo } from "./pipeline";
export type { FeatureSource, SourceKind, SourceStatus, Playhead } from "./source";
export { createSyntheticSource } from "./synthetic";
export { OfflineSource, loadOfflineSource, fetchManifest, pipelineSongs } from "./offline";
export { createLiveFileSource, createLiveUrlSource, createMicSource } from "./webaudio";
