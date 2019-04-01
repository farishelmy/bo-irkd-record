import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import update from "immutability-helper";
import Total from "./Total";
import Month from "./Month";
import Year from "./Year";
import { getRecordTypes, getTotalMonth, getTotalYear, getTotalCreated, getRecMonth, getRecYear } from "../../actions/dashboardAction";
import Select from "react-select";
import { Card, FormGroup } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class AnalyticComps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
      startmonth: moment().startOf("months"),
      endmonth: moment().endOf("months"),
      startyear: moment().startOf("years"),
      endyear: moment().endOf("years"),
      recTypesVal: [],
      recTypesOption: [],
      chartData: { datasets: [], labels: [] },
      chartMonth: {},
      chartYear: {},
      yearVal: [{ label: moment().format("YYYY") }],
      monthVal: [{ label: moment().format("MMMM") }],
      monthOptions: [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "October", value: "9" },
        { label: "September", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" }
      ],
      yearOptions: []
    };
  }

  componentDidMount() {
    const {
      session: {
        user: { _id }
      },
      getRecordTypes,
      getTotalMonth,
      getTotalYear,
      getTotalCreated,
      getRecMonth,
      getRecYear
    } = this.props;

    const { startmonth, endmonth, startyear, endyear } = this.state;

    const yearOptions = [];
    for (let i = 0; i <= 4; i++) {
      let yearItm = parseInt(moment().format("YYYY")) - i;
      yearOptions.push({ label: yearItm, value: yearItm });
    }
    this.setState({ yearOptions });

    const { totalCreated } = this.props.totalCrea;
    if (totalCreated.length === 0) {
      getTotalCreated({
        _action: "GETTOTALRECORDCREATED",
        _id,
        dtFrom: "01/01/1899",
        dtTo: moment().format("DD/MM/YYYY"),
        fltRecordTyp: []
      });
    }

    const { recordMonth } = this.props.recMonth;
    if (recordMonth.length === 0) {
      getRecMonth({
        _action: "GETTOTALRECORDCREATED",
        _id,
        dtFrom: moment(startmonth).format("DD/MM/YYYY"),
        dtTo: moment(endmonth).format("DD/MM/YYYY"),
        fltRecordTyp: []
      });
    }

    const { recordYear } = this.props.recYear;
    if (recordYear.length === 0) {
      getRecYear({
        _action: "GETTOTALRECORDCREATED",
        _id,
        dtFrom: moment(startyear).format("DD/MM/YYYY"),
        dtTo: moment(endyear).format("DD/MM/YYYY"),
        fltRecordTyp: []
      });
    } else {
      const recYear = recordYear.map(itm => ({ value: itm.totalCount }));
      this.setState({ recYear: recYear });
    }

    getRecordTypes({
      _action: "GETTOTALRECORDCREATED",
      _id,
      dtFrom: "01/01/1899",
      dtTo: moment().format("DD/MM/YYYY"),
      fltRecordTyp: []
    });

    getTotalMonth({
      _action: "GETSYSUSAGEBYMONTH",
      _id,
      month: moment().format("MM"),
      year: moment().format("YYYY")
    });

    getTotalYear({
      _action: "GETSYSUSAGEBYYEAR",
      _id,
      year: moment().format("YYYY")
    });
  }

  componentDidUpdate(prevProps) {
    function getRandomRgb() {
      var num = Math.round(0xffffff * Math.random());
      var r = num >> 16;
      var g = (num >> 8) & 255;
      var b = num & 255;
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }

    // for (var i = 0; i < 18; i++) {
    //   console.log(getRandomRgb());
    // }
    if (prevProps.recTypes.recordTypes !== this.props.recTypes.recordTypes) {
      const { recordTypes } = this.props.recTypes;
      const chartData = {
        labels: recordTypes.map(itm => itm.rtname),
        datasets: [
          {
            label: "Total Record",
            data: recordTypes.map(itm => itm.total),
            backgroundColor: [
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb(),
              getRandomRgb()
            ]
          }
        ]
      };

      const recTypesOption = recordTypes.map(itm => ({
        label: itm.rtname,
        value: itm.rturi,
        recTotal: itm.total,
        totalMonth: itm.totalCount
      }));
      this.setState({ chartData, recTypesOption });
    } else if (
      prevProps.totalMon.totalMonth !== this.props.totalMon.totalMonth
    ) {
      const { totalMonth } = this.props.totalMon;
      const day = [],
        dayVal = [];
      for (let val of totalMonth) {
        day.push(Object.keys(val)[0]);
        dayVal.push(val[Object.keys(val)[0]]);
      }
      const chartMonth = {
        labels: day,
        datasets: [
          {
            label: "Total Users",
            data: dayVal,
            backgroundColor: [getRandomRgb()]
          }
        ]
      };
      this.setState({ chartMonth });
      // console.log(totalMonth);
      // console.log(day);
    } else if (prevProps.totalYe.totalYear !== this.props.totalYe.totalYear) {
      const { totalYear } = this.props.totalYe;
      const mon = [],
        monVal = [];
      for (let val of totalYear) {
        mon.push(Object.keys(val)[0]);
        monVal.push(val[Object.keys(val)[0]]);
      }
      const chartYear = {
        labels: mon,
        datasets: [
          {
            label: "Total Users",
            data: monVal,
            backgroundColor: [getRandomRgb()]
          }
        ]
      };
      this.setState({ chartYear });
    }
  }

  handleChangeRecTypes = value => {
    const { chartData } = this.state;
    const newChartData = update(chartData, {
      labels: { $set: value.map(itm => itm.label) },
      datasets: { [0]: { data: { $set: value.map(itm => itm.recTotal) } } }
    });
    this.setState({ chartData: newChartData, recTypesVal: value });
  };

  handleChangeYear = val => {
    const {
      session: {
        user: { _id }
      },
      getTotalYear
    } = this.props;

    this.setState({ yearVal: val });
    getTotalYear({
      _action: "GETSYSUSAGEBYYEAR",
      _id,
      year: val.value
    });
  };

  handleChangeMonth = val => {
    const {
      session: {
        user: { _id }
      },
      getTotalMonth
    } = this.props;

    this.setState({ monthVal: val });
    getTotalMonth({
      _action: "GETSYSUSAGEBYMONTH",
      _id,
      month: val.value,
      year: moment().format("YYYY")
    });
  };

  handleDateChange = ({ startDate, endDate }) => {
    const {
      session: {
        user: { _id }
      },
      getRecordTypes
    } = this.props;
    console.log(startDate, endDate);
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.isAfter(endDate)) {
      endDate = startDate;
    }
    getRecordTypes({
      _action: "GETTOTALRECORDCREATED",
      _id,
      dtFrom: moment(startDate).format("DD/MM/YYYY"),
      dtTo: moment(endDate).format("DD/MM/YYYY"),
      fltRecordTyp: []
    });
    this.setState({ startDate, endDate });
  };

  handleChangeStart = startDate => this.handleDateChange({ startDate });

  handleChangeEnd = endDate => this.handleDateChange({ endDate });

  render() {
    const {
      chartData,
      chartMonth,
      chartYear,
      recTypesOption,
      recTypesVal,
      yearVal,
      monthVal,
      yearOptions,
      monthOptions,
      startDate,
      endDate
    } = this.state;
    // console.log(monthVal);
    const { totalCreated } = this.props.totalCrea;
    const { recordMonth } = this.props.recMonth;
    const { recordYear } = this.props.recYear;

    return (
      <div>
        <section className='statistics mt-4'>
          <div className='container-fluid'>
            <div className='row d-flex'>
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <Card className='col-lg-12 col-md-12 col-sm-12'>
                  <header>
                    <div className=' card-header '>
                      <div className='d-flex align-items-center justify-content-between'>
                        <h1 className='h3 display'>
                          System Usage Statistics :
                        </h1>
                      </div>
                    </div>
                  </header>
                  <div className='row d-flex'>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                      {/* <Card> */}
                      <div className='col'>
                        <div className='d-flex align-items-center justify-content-between'>
                          {/* <h1 className='h1 display'>Statistic Users in </h1> */}

                          <div className='col-md-4'>
                            <label>Statistic Users In Month </label>
                            <Select
                              value={monthVal}
                              name='totalMonth'
                              options={monthOptions}
                              className='basic-multi-select'
                              classNamePrefix='select'
                              onChange={this.handleChangeMonth}
                            />
                          </div>
                        </div>
                        <div>
                          <div className='chart' />
                          <Month data={chartMonth} legendPosition='top' />
                        </div>
                      </div>
                      {/* </Card> */}
                    </div>

                    <div className='col-lg-6 col-md-6 col-sm-6'>
                      <div className='col'>
                        <div className='d-flex align-items-center justify-content-between'>
                          <div className='col-md-4'>
                            <label>Statistic Users In Year </label>
                            {/* <h4 className='h4 display'>Statistic Users in </h4> */}

                            <Select
                              value={yearVal}
                              name='totalYear'
                              options={yearOptions}
                              className='basic-multi-select'
                              classNamePrefix='select'
                              onChange={this.handleChangeYear}

                              // isClearable={true}
                            />
                          </div>
                        </div>

                        <div>
                          <div className='chart'>
                            <Year data={chartYear} legendPosition='top' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className='statistics mt-4'>
          <div className='container-fluid'>
            <div className='row d-flex'>
              <div className='col-lg-4 col-md-4 col-sm-4'>
                <Card>
                  <div className='row d-flex align-items-center'>
                    <div className='col-sm-6'>
                      <img
                        src={require("../../img/totalrecord.svg")}
                        alt='group'
                        className='card-img-top img-fluid'
                      />
                    </div>
                    <div className='col-sm-6'>
                      <h3 className='h4 display'>Total Record Created :</h3>
                      <strong className='text-primary'>{totalCreated}</strong>
                      <span />
                    </div>
                  </div>
                </Card>
              </div>

              <div className='col-lg-4 col-md-4 col-sm-4'>
                <Card>
                  <div className='row d-flex align-items-center'>
                    <div className='col-sm-6'>
                      <img
                        src={require("../../img/month.svg")}
                        alt='group'
                        className='card-img-top img-fluid'
                      />
                    </div>
                    <div className='col-sm-6'>
                      <h3 className='h4 display'>Total Record This Month :</h3>
                      <strong className='text-primary'>{recordMonth}</strong>
                      <span />
                    </div>
                  </div>
                  {/* </div> */}
                </Card>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-4'>
                <Card>
                  <div className='row d-flex align-items-center'>
                    <div className='col-sm-6'>
                      <img
                        src={require("../../img/year.svg")}
                        alt='group'
                        className='card-img-top img-fluid'
                      />
                    </div>
                    <div className='col-sm-6'>
                      <h3 className='h4 display'>Total Record This Year :</h3>
                      <strong className='text-primary'>{recordYear}</strong>
                      <span />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className='statistics mt-4'>
          <div className='container-fluid'>
            <div className='row d-flex'>
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <Card className='col-lg-12 col-md-12 col-sm-12'>
                  <header>
                    <div className=' card-header '>
                      <div className='d-flex align-items-center justify-content-between'>
                        <h1 className='h3 display'>
                          Total Record Statistics :
                        </h1>
                      </div>
                    </div>
                  </header>

                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                        <FormGroup>
                          <label>Date From</label>
                          <FormGroup>
                            <DatePicker
                              // placeholderText='Date From'
                              selected={startDate}
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                              onChange={this.handleChangeStart}
                              className='form-control'
                              dateFormat='DD/MM/YYYY'
                            />
                          </FormGroup>
                        </FormGroup>
                      </div>

                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                        <FormGroup>
                          <label>Date To</label>
                          <FormGroup>
                            <DatePicker
                              placeholderText='Date To'
                              selected={endDate}
                              selectsEnd
                              startDate={startDate}
                              endDate={endDate}
                              onChange={this.handleChangeEnd}
                              className='form-control'
                              dateFormat='DD/MM/YYYY'
                            />
                          </FormGroup>
                        </FormGroup>
                      </div>

                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                        <FormGroup>
                          <label>Record Types</label>
                          <Select
                            value={recTypesVal}
                            name='recTypes'
                            options={recTypesOption}
                            className='basic-multi-select'
                            classNamePrefix='select'
                            onChange={this.handleChangeRecTypes}
                            isClearable={true}
                            isMulti
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>

                  <div className='chart'>
                    <Total data={chartData} legendPosition='bottom' />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
AnalyticComps.propTypes = {
  session: PropTypes.object.isRequired,
  getRecordTypes: PropTypes.func.isRequired,
  recTypes: PropTypes.object.isRequired,
  getTotalMonth: PropTypes.func.isRequired,
  totalMon: PropTypes.object.isRequired,
  getTotalYear: PropTypes.func.isRequired,
  totalYe: PropTypes.object.isRequired,
  getTotalCreated: PropTypes.func.isRequired,
  totalCrea: PropTypes.object.isRequired,
  getRecMonth: PropTypes.func.isRequired,
  recMonth: PropTypes.object.isRequired,
  getRecYear: PropTypes.func.isRequired,
  recYear: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recTypes: state.recTypes,
  session: state.session,
  totalCrea: state.totalCrea,
  totalMon: state.totalMon,
  totalYe: state.totalYe,
  recMonth: state.recMonth,
  recYear: state.recYear
});

export default connect(
  mapStateToProps,
  {
    getRecordTypes,
    getTotalMonth,
    getTotalYear,
    getTotalCreated,
    getRecMonth,
    getRecYear
  }
)(AnalyticComps);
