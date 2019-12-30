import React, {useState} from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import './SearchBar.css';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1)
    },
    textField: {
      width: 280
    }
  }));

export const SearchBar = ({onSearch}) => {
    const classes = useStyles();
    const [term, setTerm] = useState('');
  
    const handleChange = event => {
      setTerm(event.target.value);
    };
  
    const handleClick = () => {
      onSearch(term);
    };
  
    const handleMouseDown = event => {
      event.preventDefault();
    };
  
    const handleEnterPress = event => {
      if (event.key === "Enter") {
        onSearch(term);
      }
      return;
    };
  
    return (
      <div className={classes.root}>
        <div>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="searchbar-input">
              Enter a Song, Album or Artist
            </InputLabel>
            <Input
              id="searchbar-input"
              type={"text"}
              value={term}
              onChange={handleChange}
              onKeyPress={handleEnterPress}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="submit search query"
                    onClick={handleClick}
                    onMouseDown={handleMouseDown}
                  >
                  <SearchIcon />
                </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    );
  }
  