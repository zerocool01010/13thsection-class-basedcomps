import { Component } from "react"

class ErrorBoundary extends Component { //tengo que wrappear con este componente los componentes que quiero que tengan un errorBoundary en caso de error
    constructor(){
        super()
        this.state = { hasError: false}
    }

    componentDidCatch(error) {
        console.log(error)
        this.setState({hasError: true})
    }

    render(){
        if (this.state.hasError) {
            return <h3>Something fucked up everything I have been building!</h3>
        }
        return this.props.children
    }
}

export default ErrorBoundary