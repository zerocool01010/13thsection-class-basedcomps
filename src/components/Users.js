/* import { useState } from "react"; */
import { Component } from "react"; //siempre importar Component from react cuando trabajemos con clases
import User from "./User";
import classes from "./Users.module.css";

class Users extends Component {
  //hacer que la clase creada (en este caso Users) herede la clase Component que importamos de React

  constructor() {
    super(); //para hacer referencia al super constructor ya que estamos heredando de otra clase, entonces hay que hacer referencia al constructor de esa clase superior que estamos heredando
    this.state = {
      showUsers: true,
      more: "Test",
    }; //en el constructor los state siempre deben ser obj y siempre deben ser una propiedad llamada "state"
  }

  componentDidUpdate(){
    if (this.props.users.length === 0) { //si no llegan usuarios filtrados
      throw new Error('No users provided!')
    }
  }

  toggleUsersHandler() {
    this.setState((curState) => { //setState es el metodo por el cual modificamos el state de la clase en la cual estamos, y since solo podemos tener un unico this.state por clase, entonces todos los estados deben ir adentro
      return {showUsers: !curState.showUsers}; //a diferencia de los components functions, donde el nuevo state sobreescribe el viejo state, con clases el nuevo state se mergea con el viejo, por lo cual cambia solo lo especificado, pero mantiene lo no especificado
    }); // en el caso anterior modificara el bool de showUsers pero no hara nada con el string de more, lo mantendra tal cual esta
  }

  render() {
    
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>{/* el bind sirve para decirle algo asi como que el this se refiere al contexto de esta clase */}
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

/* const Users = () => {
  const [showUsers, setShowUsers] = useState(true);

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);
  };

  const usersList = (
    <ul>
      {DUMMY_USERS.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>
  );

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>
        {showUsers ? 'Hide' : 'Show'} Users
      </button>
      {showUsers && usersList}
    </div>
  );
}; */

export default Users;
