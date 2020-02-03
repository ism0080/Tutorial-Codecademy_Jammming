interface PlaylistProps {
  onNameChange: (event: string) => void
  playlistName: string
  playlistTracks: TrackSearch[]
  onRemove: (track: TrackSearch) => void
  onSave: () => void
}
