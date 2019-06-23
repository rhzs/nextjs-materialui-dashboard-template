import {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { Dashboard as DashboardLayout } from '../components/layouts'
// import styles from '../components/styles'

const styles = {}

class IndexPage extends Component {

  static async getInitialProps({ req }) {
    return {}
  }

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              {/* <Budget className={classes.item} /> */}
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              {/* <Users className={classes.item} /> */}
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              {/* <Progress className={classes.item} /> */}
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              {/* <Profit className={classes.item} /> */}
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              {/* <SalesChart className={classes.item} /> */}
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              {/* <DevicesChart className={classes.item} /> */}
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              {/* <ProductList className={classes.item} /> */}
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              {/* <OrdersTable className={classes.item} /> */}
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    )
  }
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexPage)