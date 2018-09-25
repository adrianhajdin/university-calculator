import React, { Component } from 'react';

import Chart from 'chart.js';
import PropTypes from 'prop-types';
import ReactChartkick, { BarChart } from 'react-chartkick';
import { Button, Divider, Grid, Typography, Paper, NativeSelect } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { isMobile } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import { Input, Stepper, Table } from './components';
import './App.css';

import styles from './styles';
import logo from './public/calculator-icon.png';

ReactChartkick.addAdapter(Chart);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      evaluationMaturaCroatian: '',
      evaluationMaturaCroatianLevel: 'A',
      evaluationMaturaElective1: '',
      evaluationMaturaElective2: '',
      evaluationMaturaElective3: '',
      evaluationMaturaEnglish: '',
      evaluationMaturaEnglishLevel: 'A',
      evaluationMaturaMathematics: '',
      evaluationMaturaMathematicsLevel: 'A',
      evaluationSchoolGrades: '',
      percentageFirstGrade: '',
      percentageFourthGrade: '',
      percentageMaturaCroatian: '',
      percentageMaturaElective1: '',
      percentageMaturaElective2: '',
      percentageMaturaElective3: '',
      percentageMaturaEnglish: '',
      percentageMaturaMathematics: '',
      percentageSecondGrade: '',
      percentageThirdGrade: '',
      percentagesTotal: '',
      pointsMaturaCroatian: '',
      pointsMaturaElective1: '',
      pointsMaturaElective2: '',
      pointsMaturaElective3: '',
      pointsMaturaEnglish: '',
      pointsMaturaMathematics: '',
      evaluationMaturaElectiveInputs: false,
      evaluationMaturaElectiveInputs2: false,
      evaluationMaturaElectiveInputs3: false,
    };
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  handleSelectChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  handleBack = () => {
    window.location.reload();
  }

  addeEvaluationMaturaElective = () => {
    const { evaluationMaturaElectiveInputs, evaluationMaturaElectiveInputs2 } = this.state;

    this.setState({ evaluationMaturaElectiveInputs: true });

    if (evaluationMaturaElectiveInputs) {
      this.setState({ evaluationMaturaElectiveInputs2: true });
    } if (evaluationMaturaElectiveInputs2) {
      this.setState({ evaluationMaturaElectiveInputs3: true });
    }
  }

  handleClick = () => {
    const {
      activeStep,
      evaluationMaturaCroatian,
      evaluationMaturaCroatianLevel,
      evaluationMaturaElective1,
      evaluationMaturaElective2,
      evaluationMaturaElective3,
      evaluationMaturaEnglish,
      evaluationMaturaEnglishLevel,
      evaluationMaturaMathematics,
      evaluationMaturaMathematicsLevel,
      percentageFirstGrade,
      percentageFourthGrade,
      percentageMaturaCroatian,
      percentageMaturaElective1,
      percentageMaturaElective2,
      percentageMaturaElective3,
      percentageMaturaEnglish,
      percentageMaturaMathematics,
      percentageSecondGrade,
      percentageThirdGrade,
    } = this.state;

    if (activeStep === 0) {
      this.setState({ activeStep: activeStep + 1 });
    } else if (activeStep === 1) {
      this.setState({
        activeStep: activeStep + 1,
        percentagesTotal: parseFloat(percentageFirstGrade, 10) + parseFloat(percentageSecondGrade, 10) + parseFloat(percentageThirdGrade, 10) + parseFloat(percentageFourthGrade, 10),
      });
    } else if (activeStep === 2) {
      this.setState({
        activeStep: activeStep + 1,
        pointsMaturaCroatian: Math.round((percentageMaturaCroatian * (evaluationMaturaCroatianLevel === 'A' ? 1.6 : 1) / 160) * evaluationMaturaCroatian * 10),
        pointsMaturaElective1: Math.round(percentageMaturaElective1 * evaluationMaturaElective1 / 10),
        pointsMaturaElective2: Math.round(percentageMaturaElective2 * evaluationMaturaElective2 / 10),
        pointsMaturaElective3: Math.round(percentageMaturaElective3 * evaluationMaturaElective3 / 10),
        pointsMaturaEnglish: Math.round((percentageMaturaEnglish * (evaluationMaturaEnglishLevel === 'A' ? 1.6 : 1) / 160) * evaluationMaturaEnglish * 10),
        pointsMaturaMathematics: Math.round((percentageMaturaMathematics * (evaluationMaturaMathematicsLevel === 'A' ? 1.6 : 1) / 160) * evaluationMaturaMathematics * 10),
      });
    }

    window.scrollTo(0, 0);
  }

  render() {
    const {
      activeStep,
      evaluationMaturaCroatian,
      evaluationMaturaCroatianLevel,
      evaluationMaturaElective1,
      evaluationMaturaElective2,
      evaluationMaturaElective3,
      evaluationMaturaEnglish,
      evaluationMaturaEnglishLevel,
      evaluationMaturaMathematics,
      evaluationMaturaMathematicsLevel,
      evaluationSchoolGrades,
      percentageFirstGrade,
      percentageFourthGrade,
      percentageMaturaCroatian,
      percentageMaturaElective1,
      percentageMaturaElective2,
      percentageMaturaElective3,
      percentageMaturaEnglish,
      percentageMaturaMathematics,
      percentageSecondGrade,
      percentageThirdGrade,
      percentagesTotal,
      pointsMaturaCroatian,
      pointsMaturaElective1,
      pointsMaturaElective2,
      pointsMaturaElective3,
      pointsMaturaEnglish,
      pointsMaturaMathematics,
      evaluationMaturaElectiveInputs,
      evaluationMaturaElectiveInputs2,
      evaluationMaturaElectiveInputs3,
    } = this.state;
    const { classes } = this.props;

    let dialogContent;

    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} style={!isMobile ? { marginBottom: '10px' } : null} />
          <Typography className="mobileTooltip" style={{ marginBottom: 0 }} variant="caption">
            Ukoliko niste sigurni koliko vaš fakultet pridaje bodova određenim predmetima, posjetite:<Button id={isMobile ? 'marginTop10' : null} className="button" target="_blank" href="https://www.postani-student.hr/Ucilista/Nositelji.aspx" color="primary">Postani Student</Button>
          </Typography>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">Ocjene iz srednje škole</Typography>
          <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam {isMobile ? null : <br />} određeni fakultet pridaje za prosjek ocjena srednje škole</Typography>
          <Input
            autoFocus
            label="Prosjek svih ocjena"
            name="evaluationSchoolGrades"
            onChange={this.handleChange}
            percentage
            required
            value={evaluationSchoolGrades}
          />
          <Divider light classes={{ root: classes.divider }} />
          <Typography className="typography" variant="title">Obvezni dio državne mature</Typography>
          <Typography className="mobileTooltip" variant="caption">Ovdje upišite postotak od ukupnog broja bodova koji vam {isMobile ? null : <br />} određeni fakultet pridaje za obvezni dio državne mature</Typography>
          <Grid container justify="center">
            <Grid item xs={12} lg={4}>
              <Input
                label="Hrvatski"
                name="evaluationMaturaCroatian"
                onChange={this.handleChange}
                percentage
                required
                value={evaluationMaturaCroatian}
              />
              <NativeSelect
                name="evaluationMaturaCroatianLevel"
                className="marginLeft10"
                value={evaluationMaturaCroatianLevel}
                onChange={this.handleSelectChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                label="Matematika"
                name="evaluationMaturaMathematics"
                onChange={this.handleChange}
                percentage
                required
                value={evaluationMaturaMathematics}
              />
              <NativeSelect
                name="evaluationMaturaMathematicsLevel"
                className="marginLeft10"
                value={evaluationMaturaMathematicsLevel}
                onChange={this.handleSelectChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Input
                label="Engleski jezik"
                name="evaluationMaturaEnglish"
                onChange={this.handleChange}
                percentage
                required
                value={evaluationMaturaEnglish}
              />
              <NativeSelect
                name="evaluationMaturaEnglishLevel"
                className="marginLeft10"
                value={evaluationMaturaEnglishLevel}
                onChange={this.handleNativeSelectChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </NativeSelect>
            </Grid>
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
          <Typography className="typography" variant="title">Izborni dio državne mature</Typography>
          <Typography id="noMargin" className="mobileTooltip" variant="caption" style={{ marginBottom: '0 !important' }}>Ovdje upišite postotak od ukupnog broja bodova koji vam određeni {isMobile ? null : <br />} fakultet pridaje za izborni dio državne mature</Typography>
          <Grid container justify="center">
            { evaluationMaturaElectiveInputs
              ? (
                <Grid key={1} item xs={12} lg={4}>
                  <Input
                    name="evaluationMaturaElective1"
                    label="1. Izborni predmet"
                    value={evaluationMaturaElective1}
                    onChange={this.handleChange}
                    percentage
                  />
                </Grid>
              ) : null }
            { evaluationMaturaElectiveInputs2
              ? (
                <Grid key={2} item xs={12} lg={4}>
                  <Input
                    name="evaluationMaturaElective2"
                    label="2. Izborni predmet"
                    value={evaluationMaturaElective2}
                    onChange={this.handleChange}
                    percentage
                  />
                </Grid>
              ) : null }
            { evaluationMaturaElectiveInputs3
              ? (
                <Grid key={3} item xs={12} lg={4}>
                  <Input
                    name="evaluationMaturaElective3"
                    label="3. Izborni predmet"
                    value={evaluationMaturaElective3}
                    onChange={this.handleChange}
                    percentage
                  />
                </Grid>
              ) : null }
          </Grid>
          { !evaluationMaturaElectiveInputs3
            ? (<div><br /><Button className="button" onClick={this.addeEvaluationMaturaElective} size="medium" color="primary">Dodaj izborni predmet</Button></div>)
            : null
          }
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">Prosjeci ocjena srednje škole</Typography>
          <Typography className="mobileTooltip" variant="caption">Ovdje upišite prosjeke ocjena koje ste postigli tijekom {isMobile ? null : <br />} četiri razreda srednje škole</Typography>
          <Grid container justify="center">
            <Grid item xs={12} lg={3}>
              <Input
                label="1. razred"
                name="percentageFirstGrade"
                onChange={this.handleChange}
                required
                value={percentageFirstGrade}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="2. razred"
                name="percentageSecondGrade"
                onChange={this.handleChange}
                required
                value={percentageSecondGrade}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="3. razred"
                name="percentageThirdGrade"
                onChange={this.handleChange}
                required
                value={percentageThirdGrade}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="4. razred"
                name="percentageFourthGrade"
                onChange={this.handleChange}
                required
                value={percentageFourthGrade}
              />
            </Grid>
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">Rezultati mature</Typography>
          <Typography className="mobileTooltip" variant="caption">Ovdje upišite rezultate koje ste postigli na {isMobile ? null : <br />} ispitima državne mature</Typography>
          <Grid container justify="center">
            <Grid item xs={12} lg={3}>
              <Input
                label="Hrvatski jezik"
                name="percentageMaturaCroatian"
                onChange={this.handleChange}
                percentage
                required
                value={percentageMaturaCroatian}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="Matematika"
                name="percentageMaturaMathematics"
                onChange={this.handleChange}
                percentage
                required
                value={percentageMaturaMathematics}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Input
                label="Engleski jezik"
                name="percentageMaturaEnglish"
                onChange={this.handleChange}
                percentage
                required
                value={percentageMaturaEnglish}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container justify="center">
            { evaluationMaturaElective1 !== ''
              ? (
                <Grid item xs={12} lg={3}>
                  <Input
                    label="1. Izborni predmet"
                    name="percentageMaturaElective1"
                    onChange={this.handleChange}
                    percentage
                    required
                    value={percentageMaturaElective1}
                  />
                </Grid>
              ) : null
            }
            { evaluationMaturaElective2 !== ''
              ? (
                <Grid item xs={12} lg={3}>
                  <Input
                    label="2. Izborni predmet"
                    name="percentageMaturaElective2"
                    onChange={this.handleChange}
                    percentage
                    required
                    value={percentageMaturaElective2}
                  />
                </Grid>
              ) : null
            }
            { evaluationMaturaElective3 !== ''
              ? (
                <Grid item xs={12} lg={3}>
                  <Input
                    label="3. Izborni predmet"
                    name="percentageMaturaElective3"
                    onChange={this.handleChange}
                    percentage
                    required
                    value={percentageMaturaElective3}
                  />
                </Grid>
              ) : null
            }
          </Grid>
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    } else if (activeStep === 3) {
      const totalGradePoints = Math.round((percentagesTotal / 4).toFixed(2) / 5 * evaluationSchoolGrades * 10);
      const totalMaturaPoints = pointsMaturaEnglish + pointsMaturaCroatian + pointsMaturaElective1 + pointsMaturaElective2 + pointsMaturaElective3 + pointsMaturaMathematics;

      dialogContent = (
        <React.Fragment>
          <Divider light classes={{ root: classes.dividerMarginBottom }} />
          <Typography className="typography" variant="title">Rezultati:</Typography>
          <Divider light classes={{ root: classes.divider }} />
          <Table props={{ evaluationMaturaElective1, evaluationMaturaElective2, evaluationMaturaElective3, percentagesTotal, totalGradePoints, pointsMaturaCroatian, pointsMaturaMathematics, pointsMaturaEnglish, pointsMaturaElective1, pointsMaturaElective2, pointsMaturaElective3 }} />
          <Typography justify="center" className="result" variant="title">Ukupan broj bodova: {totalMaturaPoints + totalGradePoints}</Typography>
          <BarChart height="100px" max={1000} data={[['Broj bodova', totalMaturaPoints + totalGradePoints]]} />
          <Divider light classes={{ root: classes.divider }} />
        </React.Fragment>
      );
    }

    return (
      <div className="App">
        {/* <div style={{ display: 'flex', flex: 3 }}> */}
        <Grid justify="center" container>
          {/* style={!isMobile ? { justifyContent: 'space-around', flex: 2 } : null} */}
          <Grid item xs={12} sm={8} md={6} lg={8} xl={6}>
            {/* style={{ marginLeft: '13%' }} */}
            <Paper className="paper" elevation={8}>
              <div className="heading">
                <Typography className="headingTypography" variant="headline">Kalkulator bodova za upis na fakultet</Typography>
                <img className="icon" src={logo} alt="calculator-icon" height="85" width="85" />
              </div>
              <ValidatorForm noValidate onSubmit={this.handleClick}>
                {dialogContent}
                <Stepper activeStep={activeStep} />
                { activeStep === 3
                  ? <Button onClick={this.handleBack} fullWidth size="large" variant="contained" color="primary">Na početak</Button>
                  : <Button type="submit" fullWidth size="large" variant="contained" color="primary">{activeStep === 2 ? 'Završi' : 'Dalje'}</Button>
                }
              </ValidatorForm>
            </Paper>
          </Grid>
        </Grid>
        {/* {!isMobile ? (
          <Grid style={{ flex: 1 }} item xs={2}>
            <img alt="reklama" src="https://lh4.ggpht.com/ike-jviZQ32RHuhkwLcAt_9vdpBX1oWKU00NX7QRe5GPl7-5sapzZ0u91_ssg_-Ednak2Hj-Hg=w162" className="commercial" />
          </Grid>
        ) : null} */}
      </div>
    // </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(App);