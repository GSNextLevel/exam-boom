import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

import Container from 'react-bootstrap/Container';
import BTable from 'react-bootstrap/Table';

// import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
//
// import matchSorter from 'match-sorter'

import DataTable, { createTheme } from 'react-data-table-component';


import api from '../api'


createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const conditionalRowStyles = [
  {
    when: row => row.submitTotalCnt <= (row.wrongTotalCnt)*2,
    style: row => ({
      backgroundColor: row.correct === '정답' ? 'darkorange' : 'lightcoral',
      color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    }),
  },
  {
    when: row => row.submitTotalCnt >= (row.wrongTotalCnt)*5,
    style: {
      backgroundColor: 'forestgreen',
      color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    }
  },
];


const columns = [
  {
    name: '유형',
    selector: 'type',
    sortable: true,
  },
  {
    name: '문제번호',
    selector: 'examNum',
    sortable: true,
  },
  {
    name: '결과',
    selector: 'correct',
    sortable: true,
  },
  {
    name: '총 제출횟수',
    selector: 'submitTotalCnt',
    sortable: true,
  },
  {
    name: '총 틀린횟수',
    selector: 'wrongTotalCnt',
    sortable: true,
  },
  {
    name: '푼 시간',
    selector: 'timestamp',
    sortable: true,
  },
];



class SubmitHistory extends Component {
    constructor(props) {
      super(props);

      const cookies = new Cookies();

      this.state = {
          userdata: [],
          username:  cookies.get('username') === undefined ? "익명" : cookies.get('username')

      }

      // console.log(this.props);

      // console.log(examNum);
    }

    componentDidMount = async () => {
        // this.setState({ isLoading: true })
        // const examNum = this.props.value.match.params.id;
        // const type = this.props.value.match.params.type;
        //
        const type = "adp";
        const username = this.state.username;
        await api.getExamHistory(type, username).then(res => {
          console.log("history ", res);
          let userdataResult = res['data']['Items'];

          userdataResult.sort(function(a, b) {
            return a.examNum - b.examNum;
          })
          console.log("after sort", userdataResult)

          const q = userdataResult.reduce((s, { examNum, correct, type, timestamp }) => (s[examNum] = (s[examNum] || 0) + 1, s), {});
          const q2 = userdataResult.reduce((s, { examNum, correct, type, timestamp }) => (s[examNum] = correct ? (s[examNum] || 0) + 1 :  (s[examNum] || 0), s), {});
          let totalCalc = Object.keys(q).map((key) => ({ examNum: parseInt(key), totalCnt: q[key] }));
          let correctCalc = Object.keys(q2).map((key) => ({ examNum: parseInt(key), correctCnt: q2[key] }));

          let findIdx = 0;
          let prevNum = userdataResult[0].examNum;
          for(let i=0 ; i< userdataResult.length ; i++) {
            for(let j=findIdx ; j<totalCalc.length ; j++) {
                if(userdataResult[i].examNum === totalCalc[j].examNum){
                  userdataResult[i]['submitTotalCnt'] = totalCalc[j]['totalCnt']
                  userdataResult[i]['wrongTotalCnt'] = totalCalc[j]['totalCnt'] - correctCalc[j]['correctCnt']
                  // findIdx++;
                  break;
                }
            }
            if(prevNum !== userdataResult[i].examNum){
              findIdx++;
              prevNum = userdataResult[i].examNum;
            }

          }
          console.log("after merge", userdataResult)


          userdataResult.forEach((d, i) => {
            d['timestamp'] = new Date(parseInt(d['timestamp'])).toLocaleString()
            d['correct'] = d['correct'] === true ? '정답' : '오답';
          })
          this.setState({
            userdata: userdataResult
          })

        })
    }



    render() {
      const { userdata, username } = this.state;
      const titleWithUsername = username + "님의 문제 제출 현황"

      // const { match, location, history } = this.props;
      const { history } = this.props;

      // console.log(match, location, history)

      const onRowClicked = (e) => {
        const curExamNum = e.examNum;
        const curExamType = e.type;
        history.push(`/exam/${curExamType}/${curExamNum}`)
      }

      return (
        <Container>
          <p className="mt-4"> 내가 푼 문제 중 정답률이 50%이하고 틀렸을 경우 빨간색으로 표시됩니다. 자주 틀리는 문제이니 다시한번 확인하세요</p>
          <p className="mt-4"> 초록색은 정답률이 80% 이상인 경우에 표시됩니다.</p>
          <DataTable
           title={titleWithUsername}
           columns={columns}
           data={userdata}
           defaultSortField="timestamp"
           defaultSortAsc={false}
           pagination
           paginationRowsPerPageOptions={[10,15,20,75]}
           striped={true}
           highlightOnHover={true}
           conditionalRowStyles={conditionalRowStyles}
           onRowClicked={onRowClicked}


         />
        </Container>
      );
    }
}


export default SubmitHistory
