import React, { Component } from "react";
import NavigasiBar from "../layouts/NavigasiBar";
import SideBar from "../layouts/SideBar";
import { Col, Row, Grid } from "rsuite";
import TableUsers from "../components/tables/TableUsers";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const usersData = [
      {
        id: 1,
        name: "Mark Zuckerberg",
        username: "mark",
        address: "Jl Jeruk pare kediri",
      },
      {
        id: 2,
        name: "Mohammad Amirul Huda",
        username: "amirul",
        address: "Jl semangka pare kediri",
      },
      {
        id: 3,
        name: "Nokie Pratama",
        username: "nokie",
        address: "Jl belewah pare kediri",
      },
      {
        id: 4,
        name: "Via trimey",
        username: "via",
        address: "Jl nanas pare kediri",
      },
    ];
    return (
      <div>
        <NavigasiBar />
        <Grid fluid>
          <Row className="px-1 py-2">
            <Col xsHidden smHidden xs={24} sm={24} md={4}>
              <div className="pr-4">
                <SideBar />
              </div>
            </Col>
            <Col xs={24} sm={24} md={20}>
              <div className="pb-2">
                <span className="t2 pr-1">Data Users</span>
              </div>
              <div>
                <TableUsers listdata={usersData} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Users;
