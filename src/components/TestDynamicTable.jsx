import React from 'react';
import '../Styles.css';

export default class TestDynamicTable extends React.Component {
    constructor(props) {
        super(props);
        //this.handleCombatantChanged = this.handleCombatantChanged.bind(this); //attempt 3, white screen
        this.state = {
            rank: '',
            name: '',
            participants: []
        }
    }

    updateRank(event) {
        this.setState({rank: event.target.value});        
    }
    updateName(event) {
        this.setState({name: event.target.value});
    }

    handleClick() {
        var participants = this.state.participants;
        
        participants.push({
            rank: this.state.rank,
            name: this.state.name,
        });

        this.setState({
            participants: participants,
            rank: '',
            name: '',
        });
    }
    
    handleParticipantChanged(i, event) {        
        var participants = this.state.participants;
        participants[i] = event.target.value;
        this.setState({
            participants: participants
        });
    }

    handleParticipantDeleted(i) {
        var participants = this.state.participants;
        participants.splice(i, 1);
        this.setState({
            participants: participants
        });
    }    

    render() {        
        return (
            <div>
                <table className='center'>
                    <tbody>
                        <tr>
                            <td>
                                <th>Rank</th>
                                <input                    
                                    id='rank'
                                    type='text'
                                    value={this.state.rank}
                                    onChange={this.updateRank.bind(this)}
                                />
                            </td>
                            <td>
                                <th>Name</th>
                                <input
                                    id='name'
                                    type='text'
                                    value={this.state.name}
                                    onChange={this.updateName.bind(this)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='button' onClick={this.handleClick.bind(this)}>
                    Add
                </button>
                
                <div>                        
                    <p>Current List</p> 
                    <table className='center'>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>                         
                                <th></th>                                                                  
                            </tr>
                        </thead>
                        <tbody>                        
                            {this.renderRows()}
                        </tbody>
                    </table>   
                </div>
            </div>
        );
    }

    renderRows() {
        var context = this;
        // const sortedParticipants = [...this.state.participants].sort((a, b) => b.rank - a.rank); //attempt 2
        // console.log(sortedParticipants); //attempt 2

        console.log(this.state.participants); //no `Uncaught TypeError: this is undefined` here (see README)
        return [...this.state.participants].sort((a, b) => b.rank - a.rank).map(function(o, i) { //attempt 1
        // console.log(this.state.participants); //`Uncaught TypeError: this is undefined` here (see README)

        // return  sortedParticipants.map(function(o, i) { //attempt 2
            return (               
                <tr key={'participants-' + i}>
                    <td>
                        <input
                            id='rank'
                            type='text'
                            value={o.rank}
                            onChange={context.handleParticipantChanged.bind(context, i)}
                            // onChange={context.updateRank.bind(context, i)} //attempt 4, can't change once entered, but can delete
                        />
                    </td>
                    <td>
                        <input
                            id='name'
                            type='text'
                            value={o.name}
                            onChange={context.handleParticipantChanged.bind(context, i)}
                            // onChange={context.updateName.bind(context, i)} //attempt 4
                        />
                    </td>                                     
                    <td> 
                        <button onClick={context.handleParticipantDeleted.bind(context, i)}> 
                            Delete 
                        </button>
                    </td>
                    
                </tr>
            );
        });
    }
}

/* sort here instead of separate component - INSERT SORT */
/*const sortCombatants = type => {
    const types = {
        initiative: 'initiative',
    };
    const sortProperty = types[type];
    const sorted = [...combatants].sort((a, b) => b[sortProperty] - a[sortProperty]);
    setData(sorted);
};
sortCombatants(sortType);*/