import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import clsx from 'clsx'
import React, { useState } from 'react'

// import styles from './SearchBar.module.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: 280,
  },
}))

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const classes = useStyles()
  const [term, setTerm] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value)
  }

  const handleClick = () => {
    onSearch(term)
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const handleEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch(term)
    }
  }

  return (
    <div>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor='searchbar-input'>Enter a Song, Album or Artist</InputLabel>
        <Input
          id='searchbar-input'
          type={'text'}
          value={term}
          onChangeCapture={handleChange}
          onKeyPress={handleEnterPress}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton aria-label='submit search query' onClick={handleClick} onMouseDown={handleMouseDown}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  )
}
