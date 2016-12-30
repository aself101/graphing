import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from 'chart.js';

import Navbar from './navbar';
import Footer from './footer';
import { generateFakeData } from '../actions';
import { GenericChart } from './charts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: this.props.chart,
      curChart: null,
      pieChart: null
    };
    this.drawChart = this.drawChart.bind(this);
    this.generateNewData = this.generateNewData.bind(this);
    this.plotChart = this.plotChart.bind(this);
    this.drawPie = this.drawPie.bind(this);
  }
  componentDidMount() {
    this.props.generateFakeData();
    //google.charts.load('current', {'packages':['corechart']});
    //google.charts.setOnLoadCallback(this.drawChart);
    this.plotChart(this.state.chart);
    this.drawPie(this.state.chart);
  }
  componentWillReceiveProps(nextProps) {
    this.plotChart(nextProps.chart);
    this.drawPie(nextProps.pie);
  }
  componentDidUpdate(prevProps, prevState) {
    // Do nothing
  }
  generateNewData() {
    this.props.generateFakeData();
    //google.charts.setOnLoadCallback(this.drawChart);
  }
  drawPie(props) {
    if (!props) return;
    if (this.state.pieChart) this.state.pieChart.destroy();

    var ctx = document.getElementById("pie");
    var labels = props.map((val) => val.product);
    var prices = props.map((val) => val.price);
    var opts = {
      title: {
          display: true,
          text: 'Product Pricing'
      }
    };
    var myPieChart = GenericChart(ctx, labels, prices, 'pie', opts);

    this.setState({pieChart: myPieChart});
  }
  drawChart() {
    // Testing google graphing lib
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Product');
    data.addColumn('number', 'Price');
    data.addRows(this.props.google);

    var options = {
      title: 'Fake Commerce Data',
      width: 600,
      height: 400
    };

    var chart = new google.visualization.PieChart(document.getElementById('vis_div'));
    chart.draw(data, options);
  }
  plotChart(props) {
    if (!props) return;
    // If a chart exists, delete reference to old one and recreate
    if (this.state.curChart) this.state.curChart.destroy();
    // Set up all options for chart
    var ctx = document.getElementById("chart");
    var products = props.map((d) => d.product);
    var data = props.map((d) => d.price);
    var opts = {
      title: {
          display: true,
          text: 'Product Pricing'
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
    };

    var myChart = GenericChart(ctx, products, data, 'bar', opts);

    this.setState({curChart: myChart});
  }
  render() {
    return (
      <div id="main-app">
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <canvas id="pie"></canvas>
            </div>
            <div className="col-sm-6 col-md-6">
              <canvas id="chart"></canvas>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6">
              {/*<div id="vis_div"></div>*/}
            </div>
            <div className="col-sm-6 col-md-6">
              <canvas></canvas>
            </div>
          </div>
           <button className="btn btn-primary" onClick={this.generateNewData}>New Data</button>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    google: state.data.google,
    chart: state.data.chart,
    pie: state.data.pie
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    generateFakeData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
