class LiveResults extends React.Component {
  constructor() {
    super();

    this.state = {
      race: undefined,
      message: undefined
    }
  }

  componentWillMount() {
    this.ajax = new Ajax(
      '/races/get_live',
      (data) => {
        if(data != null) {
          RaceResultActions.setRace(data);
          RaceResultActions.startRace(new Date(data.started_at));
          const startDates =  data.categories.map( obj=> new Date(obj.started_at))
          this.setState({race: data, startDates});
        }
        else {
          this.setState({message: 'Nema aktivne utrke.'});
        }
      },
      (error, status) => {
        this.setState({message: `${error} ${status}`});
      }
    );

    this.ajax.get();
  }

  render() {
    return(
      <span id="liveResults">
        {
          this.state.message ?
          <h1>{this.state.message}</h1>
          : null
        }
        <div className="row" style={{textAlign: 'center'}}>
        {this.state.startDates && this.state.startDates.map((rt, index) => (this.state.race.categories[index].started_at) ? <RaceTimeMultiple startDate={rt} name={this.state.race.categories[index].name} /> : '')}
        </div>
        <hr/>
        {
          this.state.race ?
          <RaceResults raceId={this.state.race.id} />
          : null
        }
      </span>
    )
  }
}
