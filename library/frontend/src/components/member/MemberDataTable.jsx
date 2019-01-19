import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from "griddle-react";
import { styleConfig } from "../layout/DataTableStyles";

import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import { Close, Refresh } from "@material-ui/icons";
import { renewMember, deactiveMember } from "../../actions/members";

class MemberDataTable extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      pageSize: 5,
      month: "3",
      member: "",
      openDialog: false,
      openRenew: false
    };
  }

  handleClickOpenDeactive = data => {
    this.setState({
      openDialog: true,
      member: data
    });
  };

  handleDeactive = () => {
    this.props.deactiveMember(this.state.member);
    this.setState({ openDialog: false });
  };

  handleclickOpenRenew = data => {
    this.setState({
      openRenew: true,
      member: data
    });
  };
  

  handleRenew = () => {
    this.props.renewMember(this.state.member, this.state.month);
    this.setState({ openRenew: false });
  };

  handleClose = () => {
    this.setState({ openDialog: false, openRenew: false });
  };

  render() {
    const { currentPage, pageSize } = this.state;

    const getCellAction = array => {
      let index = array.griddleKey;
      let member = this.props.members[index];

      let btn = moment(member.expirationDate).isAfter(Date()) ? (
        <IconButton
          variant="contained"
          color="secondary"
          onClick={() => this.handleClickOpenDeactive(member)}
        >
          <Close fontSize="small" />
        </IconButton>
      ) : (
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => this.handleclickOpenRenew(member)}
        >
          <Refresh fontSize="small" />
        </IconButton>
      );
      return btn;
    };

    return [
      <Griddle
        data={this.props.members}
        plugins={[plugins.LocalPlugin]}
        components={{
          SettingsToggle: () => <span />
        }}
        styleConfig={styleConfig}
        pageProperties={{
          currentPage,
          pageSize
        }}
      >
        <RowDefinition>
          <ColumnDefinition id="memberId" title="Member Id" />
          <ColumnDefinition id="firstName" title="First Name" />
          <ColumnDefinition id="lastName" title="Last Name" />
          <ColumnDefinition id="melliCode" title="Melli Code" />
          <ColumnDefinition id="memberDate" title="Member Date" />
          <ColumnDefinition id="expirationDate" title="Expiration Date" />
          <ColumnDefinition
            id="action"
            title="Active/ Deactive"
            customComponent={getCellAction}
          />
        </RowDefinition>
      </Griddle>,
      <Dialog
        open={this.state.openDialog}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To <b>Deactive</b> Member?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleDeactive}
            variant="contained"
            color="primary"
            autoFocus
          >
            Deactive
          </Button>
        </DialogActions>
      </Dialog>,
      <Dialog
        open={this.state.openRenew}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Renew"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select Membership Date
            <FormControl fullWidth>
              <InputLabel htmlFor="monthId">Month</InputLabel>
              <Select
                required
                value={this.state.month}
                onChange={e => this.setState({ month: e.target.value })}
                inputProps={{
                  name: "month",
                  id: "monthId"
                }}
              >
                <MenuItem value={"3"}>3 Month</MenuItem>
                <MenuItem value={"6"}>6 month</MenuItem>
                <MenuItem value={"12"}>12 Month</MenuItem>
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleRenew}
            variant="contained"
            color="primary"
            autoFocus
          >
            Active
          </Button>
        </DialogActions>
      </Dialog>
    ];
  }
}

const mapStateToProps = state => {
  return {
    members: state.members
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deactiveMember: member => {
      return dispatch(deactiveMember(member));
    },
    renewMember: (member, month) => {
      return dispatch(renewMember(member, month));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDataTable);
