import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

const API = 'http://localhost:8000/trips';

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

    fetch(API)
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
                <div className="card-subtitle" key={trip}>{trip.price}</div>

            </div>
            
          </div>
          )}
      </div>
    )
  }

}
