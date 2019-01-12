import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    height: 480,
  },
  card: {
    border: '1px solid #cccccc',
  },
  cardContent: {
    padding: '20px 60px',
    display: 'flex',
    flexDirection: 'column',
  },
  TextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 260,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4,
  },
});

class Login extends React.Component {
  state = {
    name: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { name, password } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid alignItems="center" className={classes.container} container justify="center" spacing={16}>
            <Grid item>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" align="center">登 录</Typography>
                  <TextField
                    className={classes.TextField}
                    label="帐号/User"
                    value={name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                  />
                  <TextField
                    className={classes.TextField}
                    label="密码/Password"
                    value={password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                    type="password"
                  />
                  <Button variant="contained" color="primary" className={classes.button}>确 定</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);