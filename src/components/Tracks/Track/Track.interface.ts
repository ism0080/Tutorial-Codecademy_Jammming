interface TrackProps {
  isRemoval: boolean
  isSmall?: boolean
  track: TrackSearch
  onAdd?: (track: TrackSearch) => void
  onRemove?: (track: TrackSearch) => void
}
