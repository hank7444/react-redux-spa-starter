import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts/bundle/highcharts'; // Highcharts is bundled

class Chart extends Component {

  state = {
    message: '',
    messages: [],
    points: []
  };

  componentDidMount() {
    const chart = this.refs.chart.getChart();
    //chart.series[0].addPoint(43);

    if (socket && !this.onMsgListener) {
      this.onMsgListener = socket.on('msg', this.onMessageReceived);

      setTimeout(() => {
        socket.emit('history', {offset: 0, length: 100});
      }, 100);
    }
  }


  onMessageReceived = (data) => {

    //console.log('socket-data', data);

    const points = this.state.points;
    const messages = this.state.messages;
    messages.push(data);
    this.setState({messages});

    points.push(data.text);


    const chart = this.refs.chart.getChart();
    chart.series[0].setData(points);
    //console.log(messages);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const msg = this.state.message;

    this.setState({message: ''});

    socket.emit('msg', {
      from: 'test',
      text: msg
    });
  }

  render() {

    const config = {
      /*
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      */
      series: [{
        animation: false,
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    };

    return (
      <div>
        <h1>Chart</h1>

        <input type="text" ref="message" placeholder="Enter your message"
         value={this.state.message}
         onChange={(event) => {
          event.preventDefault();
          this.setState({message: event.target.value});
         }
        }/>
        <button className="btn" onClick={this.handleSubmit}>Send</button>

        <ul>
        {this.state.messages.map((msg) => {
          // key沒加會被react警告
          //return <li key={msg.id}>{msg.text}</li>;
          //return <li key={`chat.msg.${msg.id}`}>{msg.from}: {msg.text}</li>;
        })}
        </ul>

        <div>
          my chart
          <ReactHighcharts config={config} ref="chart"/>
        </div>
      </div>
    );
  }
}

export default Chart;
