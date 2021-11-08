import {
  Table,
  Box,
  Button,
  CssBaseline,
  Typography,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Container,
} from "@mui/material";
import { Link } from 'react-router-dom';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { Component } from "react";
import myAxios from '../../myAxios';

export class VaccineRegistrationListing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reservationRecords: []
    };
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.getBooking();
  }

  handleDelete(_id) {
    myAxios.delete(`/reservationRecords/${_id}`)
      .then(res => {
        myAxios.get('/reservationRecords')
          .then(res => {
            this.setState({
              ...this.state, reservationRecords: res.data.reservationRecords
            })
          })
      })
  }
  getBooking() {
    myAxios.get('/reservationRecords')
      .then(res => {
        this.setState({
          ...this.state, reservationRecords: this.state.reservationRecords.concat(res.data.reservationRecords)
        })
      })
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box sx={{ mt: 8 }}>
            <Typography component="h1" variant="h5">
              Active Booking
            </Typography>
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Center Name</TableCell>
                    <TableCell align="left">Start Time</TableCell>
                    <TableCell align="left">&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.reservationRecords.length && this.state.reservationRecords.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.fullName}
                      </TableCell>
                      <TableCell align="left">{row._centerId.name}</TableCell>
                      <TableCell align="left">
                        {row._slot.date.toString()}
                      </TableCell>
                      <TableCell align="left">
                        <Button component={Link} to={() => `/bookings/${row._id}`}>
                          <ModeEditIcon />
                        </Button>
                        <Button onClick={() => this.handleDelete(row._id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
