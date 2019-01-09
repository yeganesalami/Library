import React, { Component } from "react";
import Createmember from "./CreateMember";
import MemberList from "./MemberList";

class Member extends Component {
  

  render() {
    return [
      <Createmember />,
      <MemberList/>
    ];
  }
}


export default Member;
