import React from 'react';
import { register, unregister } from 'next-offline/runtime'
import Card from '../card/Card'
import CardFilter from '../cardFilter/CardFilter'

class App extends React.Component {
  render(){
    return (
      <div className="App">
      <div className="title">SpaceX Launch Programs</div>
      <div className="mainContainer">
        <CardFilter filters={this.props.filters}/>
        <div className="cardContainer">
          {this.props.data.map((item) => (
            <Card cardProps={item}/>
            ))}
        </div>
      </div>
    </div>
  );
}
}

export default App;
