import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts/bundle/highcharts'; // Highcharts is bundled


class Chart extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    message: '',
    messages: [],
    points: []
  };

  componentDidMount() {
    console.log('do notthing');

    // 過兩秒導頁到about頁
    /*
    setTimeout(() => {
      this.props.history.replaceState(null, '/about');
    }, 2000);
    */
  }

  componentWillUnmount() {

    console.log('Chart component unmount!');

    if (socket) {
      socket.removeListener('msg');
    }
  }

  highchartLoaded = (event) => {

    const points = this.state.points;
    const chart = event.target;
    chart.series[0].addPoint(43);

    const onMessageReceived = (data) => {

      // highchart有bug, loaded完有時候target會回傳空物件@@
      console.log("chart", chart);


      if (!chart.series) {
        return false;
      }


      points.push(data.text);
      chart.series[0].setData(points);
      //console.log(messages);
    };

    if (socket) {
      socket.on('msg', onMessageReceived);
    }
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

    const that = this;

    const config = {
      chart: {
        events: {
          load: function(event) {
            //alert('Chart loaded');
            console.log('Chart loaded', event);
            //const chart = event.target;
            //chart.series[0].addPoint(43);
            that.highchartLoaded(event);
          }
        }
      },
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
          <ReactHighcharts config={config} isPureConfig={true} ref="myChart"/>
        </div>
      </div>
    );
  }
}

export default Chart;
