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
import Grid from '@material-ui/core/Grid';
import citizen from '../assets/citizen.svg'
import professional from '../assets/professional.svg'



const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },

    logo: {
        position: 'absolute',
        zIndex: 1,
        top: 140,
        left: -190,
        right: 0,
        margin: '0 auto',
    },
    logoContracted: {
        position: 'absolute',
        zIndex: 1,
        top: 90,
        left: -190,
        right: 0,
        margin: '0 auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        position: 'relative'
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

export default function Contact({ contact }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandHover = () => {
        setExpanded(!expanded);
    };
    const logoEl = (driverType) => {
        let logo = driverType.toLowerCase().trim()
        if (logo === "professional") {
            return <img src={professional}
                class={expanded ? classes.logoContracted : classes.logo } alt="logo" />
        } else {
            return <img src={citizen} class={expanded ? classes.logoContracted : classes.logo} alt="logo" />
        }
    }

    return (
        <Grid item xs={3}>
            <Card
                className={clsx(classes.card)}
                onMouseEnter={handleExpandHover}
                onMouseLeave={handleExpandHover}
                aria-expanded={expanded}
                aria-label="show more"
                style={{ position: 'relative' }}
            >
                <CardMedia
                    className={classes.media}
                    style={{ paddingTop: expanded ? '38%' : '56.25%' }}
                    image={contact.profile_image}
                    title="Paella dish"
                />
                {
                    logoEl(contact.driverType)
                }

                <CardContent className={clsx(classes.expand)}
                >
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
        </Grid>
    );
}
