# automated-testing-client

사용자 입장에서 어떨지 생각해보세요

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

- 02/14까지 목표

  - 코드리뷰 반영
  - 기능 개발 마무리
    - react-hook-form 사용해서 post execution (create execution)에 해당하는 form 받는 dialog 구현
      - UI 수정
      - 기타 기능 개선
  - 간단한 table 구현해보기(구현 난이도 가장 낮은 것으로)
    - caseSet Table
      - MUI DataGrid 사용하는 것에 중점을 두고 진행
      - 소원님이랑 소통하면서 row, column 어떻게 해야할지 고민해볼것
    - api에서 get해온 애들 table에 넣어보기
  - 디자인 concept 잡기
    - modal(알림 이런 것들), dialog(input 받는 form)(밖과 interaction 가능), table 등등 기본적인 design
    - 디자인 캡처본 전달받을 예정
