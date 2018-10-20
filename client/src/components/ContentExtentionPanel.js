import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

class ContentExtentionPanel extends Component {
  render() {
    const {
      classes,
      // data,
    } = this.props;
    const data = {
      summary: 'Movie title 1, year, country', // Actor full name
      mainDetails: 'Movie synopsis', // Actor bio
      secondaryDetails: 'eq pic || duration & number of episodes', // Actor pic || additial info
      editAction: 'movie-edit',
      deleteAction: 'movie-edit',
    };
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{data.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.column}>
              <Typography>
                {data.mainDetails}
              </Typography>
            </div>
            <div className={classes.column}>
            <Typography>
                {data.secondaryDetails}
              </Typography>              
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button> {/* add handler*/ }
            <Button size="small" color="primary"> {/* add handler*/ }
              Edit
            </Button>
            <Button size="small" color="primary"> {/* add handler*/ }
              Delete
            </Button>          
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

ContentExtentionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentExtentionPanel);
