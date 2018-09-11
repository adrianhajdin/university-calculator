
import React, { Component } from 'react';
import './App.css';

import { Button, Stepper, Divider, MobileStepper, Step, StepLabel, Grid, Card, CardHeader, CardContent, Tooltip, Icon, Typography } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { isMobile } from 'react-device-detect';

import Input from './Input';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prosjekSvihRazreda: '',
      prosjekPrviRazred: '',
      prosjekDrugiRazred: '',
      prosjekTreciRazred: '',
      prosjekCetvrtiRazred: '',
      evaluationGrades: '',
      bodoviZaHj: '',
      bodoviZaMat: '',
      bodoviZaEj: '',
      bodoviZaIzb: '',
      postotakMaturaHj: '',
      postotakMaturaMat: '',
      postotakMaturaEj: '',
      postotakMaturaIzb: '',
      evaluationHj: '',
      evaluationMat: '',
      evaluationEj: '',
      evaluationOpt: '',
      activeStep: 0,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleBack = () => {
    window.location.reload();
  }

  handleClick = () => {
    const {
      activeStep,
      prosjekPrviRazred,
      prosjekDrugiRazred,
      prosjekTreciRazred,
      prosjekCetvrtiRazred,
      postotakMaturaHj,
      evaluationHj,
      postotakMaturaEj,
      postotakMaturaMat,
      evaluationEj,
      evaluationMat,
      postotakMaturaIzb,
      evaluationOpt,
    } = this.state;

    if (activeStep === 0) {
      this.setState({ activeStep: activeStep + 1 });
    } else if (activeStep === 1) {
      this.setState({
        activeStep: activeStep + 1,
        prosjekSvihRazreda: parseFloat(prosjekPrviRazred, 10) + parseFloat(prosjekDrugiRazred, 10) + parseFloat(prosjekTreciRazred, 10) + parseFloat(prosjekCetvrtiRazred, 10),
      });
    } else if (activeStep === 2) {
      this.setState({
        activeStep: activeStep + 1,
        bodoviZaHj: postotakMaturaHj * evaluationHj / 10,
        bodoviZaEj: postotakMaturaEj * evaluationEj / 10,
        bodoviZaMat: postotakMaturaMat * evaluationMat / 10,
        bodoviZaIzb: postotakMaturaIzb * evaluationOpt / 10,
      });
    }
  }

  render() {
    const {
      prosjekSvihRazreda,
      prosjekCetvrtiRazred,
      prosjekDrugiRazred,
      prosjekPrviRazred,
      prosjekTreciRazred,
      evaluationGrades,
      postotakMaturaEj,
      postotakMaturaHj,
      postotakMaturaIzb,
      postotakMaturaMat,
      bodoviZaHj,
      bodoviZaEj,
      bodoviZaMat,
      bodoviZaIzb,
      activeStep,
      evaluationHj,
      evaluationEj,
      evaluationMat,
      evaluationOpt,
    } = this.state;

    let dialogContent;

    if (activeStep === 0) {
      dialogContent = (
        <React.Fragment>
          <Divider light style={{ margin: '20px 0' }} />
          <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Ocjene iz srednje škole
            <Tooltip title="blabla">
              <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
            </Tooltip>
          </Typography>
          <Input
            style={{ paddingBottom: '20px', marginBottom: '20px' }}
            name="evaluationGrades"
            label="Prosjek svih ocjena"
            value={evaluationGrades}
            onChange={this.handleChange}
            percentage
          />
          <Divider light style={{ margin: '20px 0' }} />
          <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Obvezni dio drzavne mature
            <Tooltip title="blabla">
              <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
            </Tooltip>
          </Typography>
          <Grid container justify="center">
            <Grid item sm={1} lg={4}>
              <Input
                name="evaluationHj"
                label="Hrvatski"
                value={evaluationHj}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item sm={1} lg={4}>
              <Input
                name="evaluationMat"
                label="Matematika"
                value={evaluationMat}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item sm={1} lg={4}>
              <Input
                name="evaluationEj"
                label="Engleski jezik"
                value={evaluationEj}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
          </Grid>
          <Divider light style={{ margin: '20px 0' }} />
          <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Izborni dio drzavne mature
            <Tooltip title="blabla">
              <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
            </Tooltip>
          </Typography>
          <Input
            name="evaluationOpt"
            label="Izborni predmet"
            value={evaluationOpt}
            onChange={this.handleChange}
            percentage
          />
          <Divider light style={{ margin: '20px 0' }} />
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      dialogContent = (
        <React.Fragment>
          <Divider light style={{ margin: '20px 0' }} />
          <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Prosjeci sva cetiri razreda
            <Tooltip title="blabla">
              <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
            </Tooltip>
          </Typography>
          <Grid container justify="center">
            <Grid item sm={1} lg={3}>
              <Input
                name="prosjekPrviRazred"
                value={prosjekPrviRazred}
                onChange={this.handleChange}
                label="1. razred"
              />
            </Grid>
            <Grid item sm={1} lg={3}>
              <Input
                name="prosjekDrugiRazred"
                value={prosjekDrugiRazred}
                onChange={this.handleChange}
                label="2. razred"
              />
            </Grid>
            <Grid item sm={1} lg={3}>
              <Input
                name="prosjekTreciRazred"
                value={prosjekTreciRazred}
                onChange={this.handleChange}
                label="3. razred"
              />
            </Grid>
            <Grid item sm={1} lg={3}>
              <Input
                name="prosjekCetvrtiRazred"
                value={prosjekCetvrtiRazred}
                onChange={this.handleChange}
                label="4. razred"
              />
            </Grid>
          </Grid>
          <Divider light style={{ margin: '20px 0' }} />
        </React.Fragment>
      );
    } else if (activeStep === 2) {
      dialogContent = (
        <React.Fragment>
          <Divider light style={{ margin: '20px 0' }} />
          <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="title">
            Prosjeci s mature
            <Tooltip title="blabla">
              <Icon style={{ paddingLeft: '5px', opacity: '0.6' }}>info_outlined</Icon>
            </Tooltip>
          </Typography>
          <Grid container justify="center">
            <Grid item sm={1} lg={3}>
              <Input
                name="postotakMaturaHj"
                label="Hrvatski jezik"
                value={postotakMaturaHj}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item sm={1} lg={3}>
              <Input
                name="postotakMaturaMat"
                label="Matematika"
                value={postotakMaturaMat}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item sm={1} lg={3}>
              <Input
                name="postotakMaturaEj"
                label="Engleski jezik"
                value={postotakMaturaEj}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
            <Grid item sm={1} lg={3}>
              <Input
                name="postotakMaturaIzb"
                label="Izborni predmet"
                value={postotakMaturaIzb}
                onChange={this.handleChange}
                percentage
              />
            </Grid>
          </Grid>
          <Divider light style={{ margin: '20px 0' }} />
        </React.Fragment>
      );
    } else if (activeStep === 3) {
      const bodoviOdMature = bodoviZaEj + bodoviZaHj + bodoviZaIzb + bodoviZaMat;
      const bodoviOdOcjena = Math.round((prosjekSvihRazreda / 4).toFixed(2) / 5 * evaluationGrades * 10);
      dialogContent = (
        <React.Fragment>
          <h3>Rezultati</h3>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={4}><h4>Ukupan prosjek: {(prosjekSvihRazreda / 4).toFixed(2)}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od ocjena: {bodoviOdOcjena}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od HJ: {bodoviZaHj}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od MAT: {bodoviZaMat}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od EJ: {bodoviZaEj}</h4></Grid>
            <Grid item xs={4}><h4>Broj bodova od IZB: {bodoviZaIzb}</h4></Grid>
            <Grid item xs={4}><h4>Ukupan broj bodova: {Math.round(bodoviOdMature + bodoviOdOcjena)}</h4></Grid>
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <div className="App">
        <Card className="paper">
          <CardHeader style={{ paddingBottom: '0' }} title="Kalkulator bodova za upis na fakultet" />
          <CardContent style={{ paddingTop: '0' }}>
            <ValidatorForm name="prosjeci" onSubmit={this.handleClick}>
              {dialogContent}
              {
            isMobile
              ? (
                <MobileStepper
                  steps={4}
                  position="static"
                  activeStep={activeStep}
                  nextButton={(
                    <Button size="small" onClick={this.handleNext} disabled={activeStep === 4 - 1}>Back</Button>
                  )}
                  backButton={(
                    <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>Next</Button>
                  )}
                />
              ) : (
                <Stepper activeStep={activeStep}>
                  <Step key={1}>
                    <StepLabel>Raspodjela bodova za upis</StepLabel>
                  </Step>
                  <Step key={2}>
                    <StepLabel>Prosjek ocjena</StepLabel>
                  </Step>
                  <Step key={3}>
                    <StepLabel>Rezultati mature</StepLabel>
                  </Step>
                  <Step key={4}>
                    <StepLabel>Ukupan broj bodova</StepLabel>
                  </Step>
                </Stepper>
              )}
              {activeStep !== 3
                ? (
                  <Grid container justify="center" spacing={16}>
                    <Grid item xs={12}>
                      <Button type="submit" fullWidth size="large" variant="contained" color="primary">{activeStep === 2 ? 'Završi' : 'Dalje'}</Button>
                    </Grid>
                  </Grid>
                )
                : (
                  <Grid container justify="center" spacing={16}>
                    <Grid item xs={12}>
                      <Button onClick={this.handleBack} fullWidth size="large" variant="contained" color="primary">Na početak</Button>
                    </Grid>
                  </Grid>
                ) }
            </ValidatorForm>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
