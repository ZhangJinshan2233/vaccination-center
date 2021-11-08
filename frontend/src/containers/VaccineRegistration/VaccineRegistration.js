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


export class VaccineRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCenter: 0,
      selectedSlot:0,
      vaccinationCenters:[{ name: "None", _id: 0}],
      slots:[{ date: "None", _id: 0}],
      idNumber:"",
      fullName:'',
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectSlot=this.handleSelectSlot.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.setIdNumber=this.setIdNumber.bind(this);
    this.setFullName=this.setFullName.bind(this)
  }

  componentDidMount() {
    this.getVaccineCenter();
  }
 
  setIdNumber(event){
    const state=this.state
    this.setState({...state, idNumber: event.target.value});
   
  }

  setFullName(event){
    const state=this.state
    this.setState({...state, fullName: event.target.value});
   
  }

  
  handleSubmit(event){
    event.preventDefault();
    let record={
      idNumber:this.state.idNumber,
      _slot:this.state.selectedSlot,
      _centerId:this.state.selectedCenter,
      fullName:this.state.fullName
    }
    
    myAxios.post('/reservationRecords',record)
    .then(res => {
      console.log(res)
    })
  }

 getVaccineCenter() {
    myAxios.get('/vaccinationCenters')
      .then(res => {
        console.log(this.state.vaccinationCenters.concat(res.data.vaccinationCenters))
        this.setState({
          ...this.state,vaccinationCenters: this.state.vaccinationCenters.concat(res.data.vaccinationCenters)
        })
      })
  }

  handleSelect(event) {
    const state=this.state
    this.setState({...state, selectedCenter: event.target.value});
   
    myAxios.get(`/slots/center/${event.target.value}`)
    .then(res => {
      this.setState({
        ...state,slots:[{ date: "None", _id: 0},...res.data.slots],selectedCenter: event.target.value
      })
    })
  }

  handleSelectSlot(event) {
    const state = this.state;
    this.setState({...state, selectedSlot: event.target.value});
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
              sx={{mb: 2}}
              onChange={this.setIdNumber}
              autoFocus
            />
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              sx={{mb: 2}}
              onChange={this.setFullName}
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
              sx={{mb: 2}}
            >
              {this.state.vaccinationCenters.length && this.state.vaccinationCenters.map((v) => {
                return <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>;
              })}
            </Select>
            <Select
              labelId="slotLabel"
              label="Slots"
              fullWidth
              id="slot"
              value={this.state.selectedSlot}
              onChange={this.handleSelectSlot}
              sx={{mb: 2}}
            >
              {this.state.slots.length &&this.state.slots.map((v) => {
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
