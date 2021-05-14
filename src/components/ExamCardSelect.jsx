import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class ExamCardSelect extends Component {
    constructor(props) {
      super(props);

      this.state = {
          choice: [],
          answer: [],
          choiceType: "",
          isLoading: false,
      }

      // console.log(this.props);

      // console.log(examNum);
    }

    render() {
      const { choice, answer, choiceType, isLoading } = this.state;
      console.log(choice);
      return (
        <Form>
          <div>

              <Form.Check inline label="A. 탄력적 IP 주소가 연결된 퍼블릭 서브넷에서 인스턴스를 시작합니다. 애플리케이션이 설치되고 실행되면 나중에 스크립트를 실행하여 탄력적 IP 주소 연결을 해제합니다." name="group1" type="radio" id="p-1-a"  />
              <Form.Check inline label="B. NAT 게이트웨이를 설정합니다. 프라이빗 서브넷에 EC2 인스턴스를 배포합니다. NAT 게이트웨이를 기본 경로로 사용하도록 프라이빗 서브넷의 라우팅 테이블을 업데이트합니다." name="group1" type="radio" id="p-1-b"  />
              <Form.Check inline label="C. Amazon S3 버킷에 애플리케이션 아티팩트를 게시하고 S3 용 VPC 엔드 포인트를 생성합니다. S3 버킷에서 애플리케이션 아티팩트를 읽을 수 있도록 EC2 인스턴스에 IAM 인스턴스 프로파일을 할당합니다." name="group1" type="radio" id="p-1-c"  />
              <Form.Check inline label="D. 애플리케이션 인스턴스에 대한 보안 그룹을 생성하고 아티팩트 리포지토리에 대한 아웃 바운드 트래픽 만 허용 목록에 추가합니다. 설치가 완료되면 보안 그룹 규칙을 제거합니다." name="group1" type="radio" id="p-1-d"  />
          </div>
        </Form>
      );
    }
}


// <Form>
// <div key="radio" className="mb-3">
//   <Form.Check type="radio" id="check-api-radio">
//     <Form.Check.Input type="radio" isValid />
//     <Form.Check.Label>asdasd</Form.Check.Label>
//     <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
//   </Form.Check>
// </div>
//
// </Form>




export default ExamCardSelect
