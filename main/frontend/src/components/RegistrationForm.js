import React from 'react';
import {
    Button, Form , Grid, Header, Message, Segment
} from 'material-ui';
import {connect} from 'react-redux';
import {NavLink, Redirect} from "react-router-dom"
import {authSignup} from '../store/actions/auth';

class Registration extends React.Component{
    state = {
        username: "",
        email: "",
        password1: "",
        password2: "",
    };
    
}