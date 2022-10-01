import React, { Component } from 'react';
import './home.scss';
import { Inputfield } from '../../components';

const pembilang = (nilai) => {
  nilai = Math.abs(nilai);
  let simpanNilaiBagi = 0;
  let huruf = [
    '',
    'Satu',
    'Dua',
    'Tiga',
    'Empat',
    'Lima',
    'Enam',
    'Tujuh',
    'Delapan',
    'Sembilan',
    'Sepuluh',
    'Sebelas'
  ];
  let temp = '';

  if (nilai < 12) {
    temp = ' ' + huruf[nilai];
  } else if (nilai < 20) {
    temp = pembilang(nilai - 10) + ' Belas';
  } else if (nilai < 100) {
    simpanNilaiBagi = Math.floor(nilai / 10);
    temp = pembilang(simpanNilaiBagi) + ' Puluh' + pembilang(nilai % 10);
  } else if (nilai < 200) {
    temp = ' Seratus' + pembilang(nilai - 100);
  } else if (nilai < 1000) {
    simpanNilaiBagi = Math.floor(nilai / 100);
    temp = pembilang(simpanNilaiBagi) + ' Ratus' + pembilang(nilai % 100);
  } else if (nilai < 2000) {
    temp = ' Seribu' + pembilang(nilai - 1000);
  } else if (nilai < 1000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000);
    temp = pembilang(simpanNilaiBagi) + ' Ribu' + pembilang(nilai % 1000);
  } else if (nilai < 1000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000);
    temp = pembilang(simpanNilaiBagi) + ' Juta' + pembilang(nilai % 1000000);
  } else if (nilai < 1000000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000000);
    temp = pembilang(simpanNilaiBagi) + ' Miliar' + pembilang(nilai % 1000000000);
  } else if (nilai < 1000000000000000) {
    simpanNilaiBagi = Math.floor(nilai / 1000000000000);
    temp = pembilang(nilai / 1000000000000) + ' Triliun' + pembilang(nilai % 1000000000000);
  }

  return temp;
};

class Index extends Component {
  state = {
    operation: '+',
    box1: 0,
    box2: 0,
    pembilang: 'Nol',
    answer: 0
  };
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  formOnChange = (e) => {
    setTimeout(() => {
      this.setState({
        [e.target.name]: parseInt(e.target.value)
      });
    }, 300);
  };

  onClickOperation = (operation) => {
    this.setState({
      operation
    });
  };

  onEnter = () => {
    if (this.state.operation === '+') {
      this.setState({
        answer: this.state.box1 + this.state.box2
      });
    } else if (this.state.operation === '-') {
      this.setState({
        answer: this.state.box1 - this.state.box2
      });
    } else if (this.state.operation === '/') {
      this.setState({
        answer: this.state.box1 / this.state.box2
      });
    } else if (this.state.operation === '*') {
      this.setState({
        answer: this.state.box1 * this.state.box2
      });
    }

    setTimeout(() => {
      this.setState({
        pembilang: this.state.answer === 0 ? 'Nol' : pembilang(this.state.answer)
      });
    }, 100);
  };

  onReset = () => {
    this.setState({
      box1: 0,
      box2: 0,
      pembilang: '',
      operation: '+',
      answer: 0
    });
    // this.myRef.current.childMethod();
    this.myRef.current.reset();
  };

  render() {
    return (
      <div className="home">
        <form ref={this.myRef} className="box1">
          <div className="sb">
            <Inputfield
              type="number"
              name="box1"
              className="ring-0 outline-0"
              defaultValue={this.state.box1}
              onChange={this.formOnChange}
            />
          </div>
          <div className="sb">{this.state.operation}</div>
          <div className="sb">
            <Inputfield
              type="number"
              name="box2"
              className="ring-0 outline-0"
              defaultValue={this.state.box2}
              onChange={this.formOnChange}
            />
          </div>
        </form>
        <div className="box1">
          <div className="sb"> {this.state.answer}</div>
          <div className="sb"> {this.state.pembilang}</div>
        </div>
        <div className="box2">
          <div className="operation" onClick={() => this.onClickOperation('+')}>
            +
          </div>
          <div className="operation" onClick={() => this.onClickOperation('-')}>
            -
          </div>
          <div className="operation" onClick={() => this.onClickOperation('/')}>
            /
          </div>
          <div className="operation" onClick={() => this.onClickOperation('*')}>
            *
          </div>
          <div className="operation-reset" onClick={this.onReset}>
            <i className="fas fa-undo"></i>
          </div>
          <div className="operation-enter" onClick={this.onEnter}>
            Enter
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
