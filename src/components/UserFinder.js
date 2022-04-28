import { Fragment, useState, useEffect, Component } from "react";

import Users from "./Users";
import classes from "./userFinder.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: "",
    };
  }

  componentDidMount() {
    //Se envia la http request...
    //y cuando el componente se monta
    console.log("componente montado");
  }

  componentDidUpdate(p, prevState) {
    //como segundo argumento recibe el estado previo
    console.log("componente updateado");

    if (prevState.searchTerm !== this.state.searchTerm) {
      //compara el estado previo con el actual, sin esta condicion generamos un infinite loop
      this.setState({
        filteredUsers: DUMMY_USERS.filter(
          (user) => user.name.toUpperCase().includes(this.state.searchTerm) //con toUpperCase paso a mayuscula todo para que la comparacion sea en mayuscula siempre y despreciar la diff entre minus y mayus, y abajo hago lo mismo
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value.toUpperCase() }); //paso a mayus esto para la comparacion posterior
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

/* const UserFinder = () => {
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    setSearchTerm((event.target.value).charAt(0).toUpperCase()); //charAt me toma por posicion el char del string que quiero luego tratar como una letra mayuscula para las comparaciones con el toUpperCase
  }; 

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type="search" onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
}; */

export default UserFinder;
