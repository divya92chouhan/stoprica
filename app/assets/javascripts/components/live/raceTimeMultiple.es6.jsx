class RaceTimeMultiple extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      raceTime: 0,
      startDate: null,
    }
  }

  componentWillMount() {
  	this.onChange();
	}

  onChange() {
    if(this.props.startDate) {
      setInterval(()=>{
        let time = timeSync.now() - this.props.startDate;
        this.setState({ raceTime: timeSync.humanTime(time) });
      }, 1000)
    }
  }

  render() {
    return(
      <span id="raceTime">
        <span  style={{paddingLeft: '80px', fontSize: '60px'}}>{this.state.raceTime || ''}</span>
        (<span>{this.props.name}</span>)
      </span>
    )
  }
}
