import {
  Container,
  Box,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { Component } from "react";
import myAxios from '../../myAxios';

export class EditVaccineRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCenter: 0,
      selectedSlot: 0,
      idNumber: '',
      fullName: "",
      vaccinationCenters: [{ name: "None", _id: 0 }],
      slots: [{ date: "None", _id: 0 }],

    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSelect(event) {
    const state = this.state
    this.setState({ ...state, selectedCenter: event.target.value });
    myAxios.get(`/slots/center/${event.target.value}`)
      .then(res => {
        this.setState({
          ...state, slots: [{ date: "None", _id: 0 }, ...res.data.slots], selectedCenter: event.target.value
        })
      })
  }

  handleSelectSlot(event) {
    const state = this.state;
    this.setState({ ...state, selectedSlot: event.target.value });
  }

  initializeLoading() {
    const state = this.state
    myAxios.get('/vaccinationCenters')
      .then(resForVaccinationCenters => {
        myAxios.get(`/reservationRecords/${this.props.match.params.bookingId}`)

          .then(resForReservationRecord => {

            myAxios.get(`/slots/center/${resForReservationRecord.data.reservationRecord._centerId._id}`)
              .then(resForCenter => {

                this.setState({
                  ...state,
                  vaccinationCenters: state.vaccinationCenters.concat(resForVaccinationCenters.data.vaccinationCenters),
                  slots: [{ date: "None", _id: 0 }, ...resForCenter.data.slots],
                  idNumber: resForReservationRecord.data.reservationRecord.idNumber,
                  fullName: resForReservationRecord.data.reservationRecord.fullName,
                  selectedCenter: resForReservationRecord.data.reservationRecord._centerId._id,
                  selectedSlot: resForReservationRecord.data.reservationRecord._slot._id,
                })
              })
          })
      })
  }

  handleSubmit(event){
    event.preventDefault();
    let record={
      idNumber:this.state.idNumber,
      _slot:this.state.selectedSlot,
      _centerId:this.state.selectedCenter,
      fullName:this.state.fullName
    }
    console.log(record)
    myAxios.put(`/reservationRecords/${this.props.match.params.bookingId}`,record)
    .then(res => {
      console.log(res)
    })
  }

  componentDidMount() {
    this.initializeLoading();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box
            component="form"
            sx={{
              mt: 8,
            }}
          >
            <Typography component="h1" variant="h5">
              Book a slot
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nric"
              label="NRIC Number"
              name="NRIC"
              autoComplete="nric"
              value={this.state.idNumber}
              sx={{ mb: 2 }}
              autoFocus
            />
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              value={this.state.fullName}
              sx={{ mb: 2 }}
              name="name"
              autoComplete="name"
            />
            <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
            <Select
              labelId="vaccineCenterLabel"
              label="Vaccine Center"
              required
              fullWidth
              id="vaccineCenter"
              value={this.state.selectedCenter}
              onChange={this.handleSelect}
              sx={{ mb: 2 }}
            >
              {this.state.vaccinationCenters.length && this.state.vaccinationCenters.map((v) => {
                return (
                  <MenuItem key={v._id} value={v._id}>
                    {v.name}
                  </MenuItem>
                );
              })}
            </Select>
            <Select
              labelId="slotLabel"
              label="Slots"
              fullWidth
              id="slot"
              value={this.state.selectedSlot}
              onChange={this.handleSelectSlot}
              sx={{ mb: 2 }}
            >
              {this.state.slots.length && this.state.slots.map((v) => {
                return <MenuItem key={v._id} value={v._id}>{v.date.split('T')[0]}</MenuItem>;
              })}
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={this.handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Register!
            </Button>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
