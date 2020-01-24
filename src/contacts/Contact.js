import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: 300,
    right: 520,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Contact({contact}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandHover = () => {
    setExpanded(!expanded);
  };

  return (
    <Card 
    className={clsx(classes.expand, classes.card)}
    onMouseEnter={handleExpandHover}
    onMouseLeave={handleExpandHover}
    aria-expanded={expanded}
    aria-label="show more"
    >
      <CardMedia
        className={classes.media}
        image={contact.profile_image}
        title="Paella dish"
      />
      {/* <Fab color="primary" className={classes.button} aria-label="add">
      </Fab> */}
      <CardContent>
        <Typography variant="h5" color="textPrimary">
        {contact.name}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
        Driver Rank: {contact.driverRank}
        </Typography>
        {
         expanded && 
         <>
            <Typography variant="subtitle1" color="textPrimary">
        {contact.phone}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
        {contact.email}
        </Typography>
        </>
        }
      </CardContent>
    </Card>
  );
}
