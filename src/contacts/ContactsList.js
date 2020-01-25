import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import Contact from './Contact.js'
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));


function ContactList() {
    const dispatch = useDispatch();
    const classes = useStyles();
    // const query = useSelector(state => state.query)
    // useSelector(state => {
    //    return state
    // })
    const API_URL = 'http://private-05627-frontendnewhire.apiary-mock.com/contact_list'
    const [data, setData] = useState({ drivers: [] });
    useEffect(() => {
        getContacts()
    }, []);
    const getContacts = async () => {
        const result = await axios(API_URL);
        setData({ drivers: result.data });
    }
    const handleChange = (e) => {
        if (e.target.value && e.target.value.length > 0) {
            dispatch({ type: "SET_QUERY", query: e.target.value })
            let filter = e.target.value.toLowerCase()
            const filteredContacts = data.drivers.filter(contact => {
                let name = contact.name.toLowerCase()
                let email = contact.email ? contact.email.toLowerCase() : ""
                return name.indexOf(filter) >= 0 || email.indexOf(filter) >= 0
            })
            setData({ drivers: filteredContacts })
        } else {
            getContacts()
        }
    }
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" align="left" noWrap>
                            Contact List
                    </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleChange}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <Container>
                <Grid
                    style={{ marginTop: 50 }}
                    container
                    direction="row"
                    spacing={3}
                    justify="center"
                    alignItems="center"
                >
                    {data.drivers && data.drivers.slice(0, 12).map(item => (
                        <Contact contact={item} key={item.name} />
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default ContactList;