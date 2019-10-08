import React, { Component } from 'react';




export default class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      isLoading: false,
      error: null
    };
  }
  async componentDidMount() {
      
    this.setState({ isLoading: true })


    const { handle } = this.props.match.params



    fetch(`https://localhost:8000/trips/${handle}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ops, alguma coisa deu errado. Pode voltar em breve?');
      }
    })
      .then(data => this.setState({ trips: data.trips, isLoading:false }))
      .catch(error => this.setState({ error, isLoading: false}));
  }

  render() {
    
    const {trips, isLoading, error} = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Carregando experiências...</p>;
    }
    return (
      <div>
        {trips.map(trip => 
          <div className="card" >
            <div className="card-body">
                <div className="card-title" key={trip}>{trip.name}</div>
                <div className="card-subtitle" key={trip}>{trip.price}, {trip._id}</div>
                <div key={trip}><Link to={`/trips/${trip + 1}`}>Ver detalhes</Link></div>
            </div>
            
          </div>
          )}
      </div>
    )
  }

}
