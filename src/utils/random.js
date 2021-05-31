
// 시험의 타입을 입력받아 각 시험의 문제수 반환 
export const randomQuestionNum = (type) => {
    let questionMax = type ==='adp' ? 400 : 422 
    return Math.floor(Math.random() * (questionMax - 1)) + 1 ; 
  }