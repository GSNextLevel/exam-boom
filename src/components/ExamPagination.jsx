import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Pagination from 'react-bootstrap/Pagination';

class ExamPagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      examNum: this.props.value.match.params.id,
      examType: this.props.value.match.params.type,
    };
  }

  componentDidMount = async () => {};

  changePageNum(v) {
    let curPage = this.state.examNum;
    let calcAfterPage = parseInt(curPage) + parseInt(v);
    if (calcAfterPage < 1) calcAfterPage = 1;

    this.setState({ examNum: calcAfterPage });
  }

  render() {
    const { examNum } = this.state;
    const pagenationNumList = [];
    // 선택 문항 기준으로 앞뒤로 5개 출력
    for (let i = -5; i < 5; i++) {
      let tempNum = parseInt(examNum) + i;
      if (tempNum > 0) {
        pagenationNumList.push(tempNum);
      }
    }
    console.log(pagenationNumList);
    return (
      <Pagination className="mt-4 justify-content-center">
        <Pagination.First onClick={() => this.changePageNum(-75)} />
        <Pagination.Prev onClick={() => this.changePageNum(-10)} />

        {pagenationNumList.map((n, index) => {
          if (n == examNum) {
            return <Pagination.Item active>{n}</Pagination.Item>;
          } else {
            return (
              <Pagination.Item href={parseInt(n).toString()}>
                {n}
              </Pagination.Item>
            );
          }
        })}

        <Pagination.Next onClick={() => this.changePageNum(10)} />
        <Pagination.Last onClick={() => this.changePageNum(75)} />
      </Pagination>
    );
  }
}

export default ExamPagination;
