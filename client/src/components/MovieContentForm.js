import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import { movies } from  '../api';

class MovieContentForm extends Component {

  render() {
    return (
      <div>
        <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />

      </div>
    );
  }
}

export default MovieContentForm;
