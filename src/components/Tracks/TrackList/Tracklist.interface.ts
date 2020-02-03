interface TrackListProps {
  onAdd?: (track: TrackSearch) => void
  onRemove?: (track: TrackSearch) => void
  isRemoval: boolean
  tracks: TrackSearch[]
  isSmall?: boolean
}
