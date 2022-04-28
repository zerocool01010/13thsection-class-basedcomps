import { Fragment, /* useState, useEffect, */ Component } from "react";

import Users from "./Users";
import classes from "./userFinder.module.css";
import UsersContext from "../store/users-context";
import ErrorBoundary from './errorBoundary'

class UserFinder extends Component {
    static contextType = UsersContext; //solamente puedo conectar un class-based comp con un context, no mas, es la limitacion de los contexts en clases

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    //Se envia la http request...
    //y cuando el componente se monta
    console.log("componente montado");
    this.setState({filteredUsers: this.context.users}) //users es la prop definida en el contexto en users-context.js
  }

  componentDidUpdate(p, prevState) {
    //como segundo argumento recibe el estado previo
    console.log("componente updateado");

    if (prevState.searchTerm !== this.state.searchTerm) {
      //compara el estado previo con el actual, sin esta condicion generamos un infinite loop
      this.setState({
        filteredUsers: this.context.users.filter(
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
            <input
              type="search"
              onChange={this.searchChangeHandler.bind(this)}
            />
          </div>
          <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
          </ErrorBoundary>
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
