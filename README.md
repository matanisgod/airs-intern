# automated-testing-client

1. repo 환경 구성
   1. 폴더 구조
   2. router 작업
   3. api 구조체 작업
2. 저장된 case 확인하는 page
   1. header 작업
   2. case set list
   3. case table
   4. expected result
   5. create case dialog
3. 자동화 돌림 + hisotry 보여주는 page
   1. header 작업
   2. execution list
   3. case log table
   4. detail table
   5. create execution dialog

- 02/10까지 목표
  - repo 환경 구성 (完)
  - header 작업 (完)
  - api 찍먹 (完)
  - ~~시간 남으면 case set list~~

api

1. POST executions
2. POST executions/{execution_id}:cancel
3. POST executions:cancel
4. POST casesets:import

   이 외 다수
   http://192.168.40.203:8000/docs

- 02/10까지 목표(new)
  - react-hook-form 사용해서 post execution (create execution)에 해당하는
    form 받는 dialog 구현
    - 서버로 실제로 post api 날리지 말고 handler까지
