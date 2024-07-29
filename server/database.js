import sqlite3 from "sqlite3";

const databaseName = "toyprj1";
const database = new sqlite3.Database(`./${databaseName}.db`);

database.serialize(() => {
  // 모든 테이블 드롭
  database.run("DROP TABLE IF EXISTS Users");
  database.run("DROP TABLE IF EXISTS Notices");
  database.run("DROP TABLE IF EXISTS Approval");
  database.run("DROP TABLE IF EXISTS Mileage");

  // Users 테이블 생성
  database.run(
    `
      CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      password TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      profileImage TEXT,
      position TEXT,
      birthday TEXT,
      startDate TEXT,
      phone TEXT
      )`,
    (err) => {
      if (err) {
        console.error("Error creating Users table:", err.message);
      } else {
        console.log("Users table created successfully");
        const sampleUsersData = [
          {
            id: 1,
            password: "1234",
            name: "김민태",
            email: "admin@taeco.com",
            profileImage: "/public/images/kimmintae.jpeg",
            position: "사장",
            birthday: "1972.05.24",
            startDate: "2002.07.08",
            phone: "01022079124",
          },
          {
            id: 2,
            password: "1234",
            name: "권혁준",
            email: "user2@taeco.com",
            profileImage: "/public/images/red-dev-Mark.png",
            position: "차장",
            birthday: "1985.09.17",
            startDate: "2005.07.09",
            phone: "01099103689",
          },
          {
            id: 3,
            password: "1234",
            name: "권혜지",
            email: "user3@taeco.com",
            profileImage: "/public/images/hyeppyy.png",
            position: "과장",
            birthday: "1990.06.12",
            startDate: "2011.09.08",
            phone: "01089023901",
          },
          {
            id: 4,
            password: "1234",
            name: "김승민",
            email: "user4@taeco.com",
            profileImage: "/public/images/miniseung.png",
            position: "부장",
            birthday: "1995.04.10",
            startDate: "2017.03.04",
            phone: "01078301720",
          },
          {
            id: 5,
            password: "1234",
            name: "박수현",
            email: "user5@taeco.com",
            profileImage: "/public/images/suhyun9892.png",
            position: "사원",
            birthday: "1999.07.16",
            startDate: "2020.03.04",
            phone: "01086671730",
          },
        ];
        let completedInserts = 0;
        sampleUsersData.forEach((item) => {
          database.run(
            `INSERT OR REPLACE INTO Users (id, password, name, email, profileImage, position, birthday, startDate, phone)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              item.id,
              item.password,
              item.name,
              item.email,
              item.profileImage,
              item.position,
              item.birthday,
              item.startDate,
              item.phone,
            ],
            (err) => {
              if (err) {
                console.error("Error inserting sample data:", err.message);
              } else {
                console.log(`Sample data inserted: ${item.id}`);
                completedInserts++;
                if (completedInserts === sampleUsersData.length) {
                  console.log("Sample Users data insertion process completed.");
                }
              }
            }
          );
        });
      }
    }
  );
  // Notices 테이블 생성
  database.run(
    `
          CREATE TABLE IF NOT EXISTS Notices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            description TEXT,
            createdAt TEXT,
            attachments TEXT,
            views INTEGER DEFAULT 0,
            isImportant INTEGER DEFAULT 0,
            category TEXT
          )`,
    (err) => {
      if (err) {
        console.error("Error creating Notices table:", err.message);
      } else {
        console.log("Notices table created successfully");

        const sampleNoticeData = [
          {
            id: 1,
            title: "여름맞이 회사 피크닉",
            author: "admin1",
            description:
              "이번 피크닉은 직원들 간의 소통을 증진하고 즐거운 시간을 보낼 수 있는 좋은 기회가 될 것입니다. 가족들도 함께 참여할 수 있는 행사이니 많은 참여 부탁드립니다. 궁금한 사항이 있으신 분은 인사부로 문의해 주세요. 감사합니다.",
            createdAt: "2024-01-10",
            attachments: "사장",
            views: "9",
            isImportant: "1",
            category: "event",
          },
          {
            id: 2,
            title: "마일리지 적립 관련 공지사항",
            author: "admin1",
            description:
              "안녕하세요, 모든 직원 여러분! 우리 회사에서는 직원들의 노고를 인정하고 사기를 증진시키기 위해 새로운 마일리지 적립 프로그램을 도입하게 되었습니다. 아래의 공지사항을 참고하시어 많은 참여와 관심 부탁드립니다. ",
            createdAt: "2024-01-20",
            attachments: "1",
            views: "7",
            isImportant: "1",
            category: "mileage",
          },
          {
            id: 3,
            title: "마일리지 적립 효과 공유",
            author: "admin1",
            description:
              "마일리지 적립 프로그램의 효과를 공유합니다. 많은 참여 부탁드립니다.",
            createdAt: "2024-01-25",
            attachments: "0",
            views: "1",
            isImportant: "0",
            category: "mileage",
          },
          {
            id: 4,
            title: "인사행정 관련 공지사항",
            author: "admin2",
            description:
              "안녕하세요, 모든 직원 여러분! 인사행정과 관련하여 몇 가지 중요한 사항을 안내드리고자 합니다. 아래의 내용을 참고하시어 인사행정 업무에 차질이 없도록 협조해 주시기 바랍니다.",
            createdAt: "2024-02-08",
            attachments: "0",
            views: "12",
            isImportant: "1",
            category: "human-resource",
          },
          {
            id: 5,
            title: "하반기 교육 일정 및 프로그램",
            author: "admin2",
            description:
              "안녕하세요, 모든 직원 여러분! 회사의 발전과 직원 여러분의 역량 강화를 위해 2024년 하반기 회사 교육 프로그램에 대해 안내드립니다. 아래의 내용을 참고하시어 적극적인 참여 부탁드립니다.",
            createdAt: "2024-02-26",
            attachments: "1",
            views: "0",
            isImportant: "0",
            category: "education",
          },
          {
            id: 6,
            title: "사내 인트라넷 시스템 업데이트",
            author: "admin2",
            description:
              "안녕하세요, 모든 직원 여러분! 회사의 발전과 직원 여러분의 편의를 위해 몇 가지 중요한 공지 사항을 안내드리고자 합니다. 아래 내용을 꼭 확인해주시기 바랍니다.",
            createdAt: "2024-03-09",
            attachments: "1",
            views: "124",
            isImportant: "0",
            category: "etc",
          },
          {
            id: 7,
            title: "사내 친목회 개최",
            author: "admin1",
            description:
              "안녕하세요, 모든 직원 여러분! 2024년 8월 20일 (목) 18:00 ~ 21:00, 본사 대강당에서 직원 간 친목 도모 및 소통을 위한 다양한 프로그램이 준비되어 있습니다. 많은 참여 부탁드리며, 참석이 어려운 직원은 미리 인사부에 알려주시기 바랍니다.",
            createdAt: "2024-03-15",
            attachments: "1",
            views: "14",
            isImportant: "1",
            category: "event",
          },
          {
            id: 8,
            title: "온라인 세미나 개최",
            author: "admin1",
            description:
              "2024년 7월 25일 (토) 오후 14:00부터 온라인으로 진행되는 세미나입니다. 다양한 주제와 전문가들이 참여하여 유익한 정보를 제공할 예정입니다. 많은 관심 부탁드립니다.",
            attachments: "1",
            createdAt: "2024-04-20",
            views: "10",
            isImportant: "0",
            category: "event",
          },
          {
            id: 9,
            title: "팀 빌딩 외부활동 안내",
            author: "admin1",
            description:
              "2024년 7월 30일 (목) 팀 빌딩을 목적으로 외부 활동을 진행합니다. 참가를 희망하는 팀은 팀장을 통해 신청하여 주시기 바랍니다.",
            attachments: "1",
            createdAt: "2024-04-21",
            views: "8",
            isImportant: "0",
            category: "event",
          },
          {
            id: 10,
            title: "성과 공유 모임 개최",
            author: "admin1",
            attachments: "0",
            description:
              "2024년 8월 5일 (수) 저녁 18:30부터 본사 회의실에서 직원들 간의 성과를 공유하는 모임을 개최합니다. 참석을 원하시는 분은 링크를 통해 등록해 주시기 바랍니다.",
            createdAt: "2024-04-11",
            views: "4",
            isImportant: "0",
            category: "event",
          },
          {
            id: 11,
            title: "커피 브레이크 행사",
            author: "admin1",
            description:
              "2024년 7월 18일 (토) 오전 10:00부터 11:00까지 본사 로비에서 진행되는 커피 브레이크 행사에 모든 직원을 초대합니다. 친목과 소통의 시간을 가지고자 준비되었습니다.",
            attachments: "0",
            createdAt: "2024-05-01",
            views: "3",
            isImportant: "0",
            category: "event",
          },
          {
            id: 12,
            title: "새로운 연말 파티 일정 안내",
            author: "admin1",
            description:
              "올해 연말 파티 일정이 확정되었습니다! 2024년 12월 15일 (금) 저녁 7시부터 본사 라운지에서 파티가 열릴 예정입니다. 자세한 사항은 첨부된 공지를 확인해주세요.",
            attachments: "0",
            createdAt: "2022-04-01",
            views: "2",
            isImportant: "0",
            category: "event",
          },
          {
            id: 13,
            title: "사내 스포츠 대회 참가 신청 안내",
            author: "admin1",
            description:
              "2024년 9월 10일 (토) 오전 9시, 본사 체육관에서 사내 스포츠 대회가 개최됩니다. 참가를 원하시는 직원은 온라인 신청을 통해 참여 신청을 완료해 주세요.",
            attachments: "0",
            createdAt: "2022-07-05",
            views: "1",
            isImportant: "0",
            category: "event",
          },
          {
            id: 14,
            title: "신규 직원 환영 파티 안내",
            author: "admin1",
            description:
              "최근 조직에 새로 합류한 직원들을 환영하기 위해 2024년 7월 25일 (화) 오후 3시, 본사 로비에서 환영 파티를 개최합니다. 모든 직원의 참석을 부탁드립니다.",
            attachments: "1",
            createdAt: "2022-03-01",
            views: "66",
            isImportant: "0",
            category: "event",
          },
          {
            id: 15,
            title: "성과 공유 회의 일정 안내",
            author: "admin1",
            description:
              "2024년 8월 5일 (목) 오전 10시, 본사 회의실에서 2분기 성과 공유 회의가 열립니다. 모든 팀장과 관리자는 참석해 주시기 바랍니다.",
            attachments: "1",
            createdAt: "2022-05-27",
            views: "33",
            isImportant: "0",
            category: "event",
          },
          {
            id: 16,
            title: "워크샵 개최 안내",
            author: "admin1",
            description:
              "2024년 8월 30일 (화) 오전 9시부터 오후 5시까지, 본사 대회의실에서 팀 간 협업을 강화하기 위한 워크샵이 진행될 예정입니다. 참여를 원하시는 팀은 인사부로 신청 바랍니다.",
            attachments: "0",
            createdAt: "2023-01-01",
            views: "34",
            isImportant: "0",
            category: "event",
          },
          {
            id: 17,
            title: "금주 주요 일정 안내",
            author: "admin1",
            description:
              "2024년 7월 15일부터 2024년 7월 21일까지의 주요 일정을 안내드립니다. 자세한 일정은 첨부된 파일을 확인해 주세요.",
            attachments: "0",
            createdAt: "2023-02-01",
            views: "76",
            isImportant: "0",
            category: "event",
          },
          {
            id: 18,
            title: "휴가 신청 안내",
            author: "admin1",
            description:
              "휴가 신청 기간이 2024년 8월 1일부터 8월 31일까지로 연장되었습니다. 휴가를 신청하시는 직원은 인사부로 신청서를 제출해 주세요.",
            attachments: "0",
            createdAt: "2023-05-02",
            views: "33",
            isImportant: "0",
            category: "event",
          },
          {
            id: 19,
            title: "노동절 휴무 안내",
            author: "admin1",
            description:
              "2024년 8월 15일 (일)은 노동절로 인해 휴무입니다. 모든 직원들은 휴일을 즐기시기 바랍니다.",
            attachments: "0",
            createdAt: "2023-04-23",
            views: "24",
            isImportant: "0",
            category: "event",
          },
          {
            id: 20,
            title: "사내 교육 프로그램 개최 안내",
            author: "admin1",
            description:
              "2024년 9월 1일 (수) 오전 9시부터 오후 3시까지 사내 교육 프로그램이 개최됩니다. 모든 직원은 프로그램에 적극 참여해 주시기 바랍니다.",
            attachments: "0",
            createdAt: "2023-07-19",
            views: "88",
            isImportant: "0",
            category: "event",
          },
          {
            id: 21,
            title: "글로벌 파트너십 강화 관련 회의 안내",
            author: "admin1",
            description:
              "2024년 9월 12일 (월) 오후 2시, 글로벌 파트너와의 협력 강화를 위한 회의가 본사 회의실에서 진행됩니다. 관련 부서 직원은 회의 참석을 부탁드립니다.",
            attachments: "0",
            createdAt: "2023-08-11",
            views: "76",
            isImportant: "0",
            category: "event",
          },
          {
            id: 22,
            title: "신입 사원 오리엔테이션 일정 안내",
            author: "admin1",
            description:
              "2024년 9월 3일 (목) 오전 9시, 신입 사원들을 위한 오리엔테이션 프로그램이 진행될 예정입니다. 모든 신입 사원은 반드시 참석해 주시기 바랍니다.",
            attachments: "1",
            createdAt: "2023-09-11",
            views: "4",
            isImportant: "0",
            category: "event",
          },
          {
            id: 23,
            title: "신규 제품 발표 관련 브리핑 안내",
            author: "admin1",
            description:
              "2024년 9월 14일 (화) 오전 10시, 신규 제품 발표 관련 팀 브리핑이 있을 예정입니다. 관련 팀원은 반드시 참석해 주시기 바랍니다.",
            attachments: "1",
            createdAt: "2023-12-12",
            views: "325",
            isImportant: "0",
            category: "event",
          },
          {
            id: 24,
            title: "사내 헬스 챌린지 안내",
            author: "admin1",
            description:
              "2024년 9월부터 10월까지, 사내 헬스 챌린지가 시작됩니다. 관심 있는 직원들은 인사부로 신청해 주세요.",
            attachments: "1",
            createdAt: "2023-12-19",
            views: "0",
            isImportant: "0",
            category: "event",
          },
          {
            id: 25,
            title: "파트너사 초청 디너 안내",
            author: "admin1",
            description:
              "2024년 9월 20일 (토) 저녁 7시, 파트너사와의 교류를 위한 초청 디너가 있을 예정입니다. 관련 직원들의 참석을 부탁드립니다.",
            attachments: "1",
            createdAt: "2023-03-20",
            views: "142",
            isImportant: "0",
            category: "event",
          },
          {
            id: 26,
            title: "사내 IT 시스템 업데이트 예정 안내",
            author: "admin1",
            description:
              "2024년 9월 30일 (수) 오전 8시, 사내 IT 시스템 업데이트가 진행될 예정입니다. 업데이트 시간 동안 일시적인 네트워크 접속 불편이 있을 수 있습니다.",
            attachments: "1",
            createdAt: "2023-06-22",
            views: "844",
            isImportant: "0",
            category: "event",
          },
          {
            id: 27,
            title: "금융 전문가 초청 강연 안내",
            author: "admin1",
            description:
              "2024년 10월 10일 (토) 오후 2시, 금융 전문가를 초청하여 진행하는 강연이 본사 회의실에서 진행됩니다. 관심 있는 직원들의 참석을 부탁드립니다.",
            attachments: "1",
            createdAt: "2023-09-05",
            views: "6",
            isImportant: "0",
            category: "event",
          },
          {
            id: 28,
            title: "연말 송년회 안내",
            author: "admin1",
            description:
              "2024년 12월 20일, 전 직원 대상 송년회가 개최됩니다. 장소는 그랜드 호텔 연회장입니다.",
            attachments: "1",
            createdAt: "2023-03-12",
            views: "2",
            isImportant: "0",
            category: "event",
          },
          {
            id: 29,
            title: "여름 바베큐 파티 초대",
            author: "admin1",
            description:
              "2025년 7월 15일, 한강 공원에서 직원 가족 동반 바베큐 파티를 개최합니다.",
            attachments: "0",
            createdAt: "2023-02-05",
            views: "2",
            isImportant: "0",
            category: "event",
          },
          {
            id: 30,
            title: "창립기념일 기념 마라톤 대회",
            author: "admin1",
            description:
              "2025년 3월 1일, 창립 20주년 기념 5km 마라톤 대회를 개최합니다.",
            attachments: "0",
            createdAt: "2023-06-24",
            views: "11",
            isImportant: "0",
            category: "event",
          },
          {
            id: 31,
            title: "분기별 우수사원 시상식",
            author: "admin1",
            description:
              "2025년 4월 5일, 1분기 우수사원 시상식이 대강당에서 진행됩니다.",
            attachments: "0",
            createdAt: "2023-06-25",
            views: "22",
            isImportant: "0",
            category: "event",
          },
        ];
        let completedInserts = 0;
        sampleNoticeData.forEach((item) => {
          database.run(
            `INSERT OR REPLACE INTO Notices (id, title, author, description, createdAt, attachments, views, isImportant, category)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              item.id,
              item.title,
              item.author,
              item.description,
              item.createdAt,
              item.attachments,
              item.views,
              item.isImportant,
              item.category,
            ],
            (err) => {
              if (err) {
                console.error("Error inserting sample data:", err.message);
              } else {
                console.log(`Sample data inserted: ${item.id}`);
                completedInserts++;
                if (completedInserts === sampleNoticeData.length) {
                  console.log(
                    "Sample Approval data insertion process completed."
                  );
                }
              }
            }
          );
        });
      }
    }
  );

  // Approval 테이블 생성
  database.run(
    `
        CREATE TABLE IF NOT EXISTS Approval (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user TEXT,
          title TEXT,
          category TEXT,
          startdate TEXT,
          enddate TEXT,
          submitdate TEXT,
          submitreason TEXT,
          refusereason TEXT,
          isApprove INTEGER DEFAULT 0
        )`,
    (err) => {
      if (err) {
        console.error("Error creating Approval table:", err.message);
      } else {
        console.log("Approval table created successfully");
        const sampleApprovalData = [
          {
            id: 1,
            user: "권혁준",
            title: "휴가 신청합니다",
            category: "연차",
            startdate: "2023.12.01",
            enddate: "2023.12.03",
            submitdate: "2023.11.25",
            submitreason: "여름휴가",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 2,
            user: "김승민",
            title: "조퇴 신청합니다",
            category: "조퇴",
            startdate: "2023.11.15",
            enddate: "2023.11.15",
            submitdate: "2023.11.14",
            submitreason: "병원 예약",
            refusereason: "",
            isApprove: true,
          },
          {
            id: 3,
            user: "박수현",
            title: "반차 신청합니다",
            category: "반차",
            startdate: "2024.04.10",
            enddate: "2024.04.10",
            submitdate: "2024.04.05",
            submitreason: "개인 용무",
            refusereason: "인력 부족",
            isApprove: false,
          },
          {
            id: 4,
            user: "권혜지",
            title: "기타 신청합니다",
            category: "기타",
            startdate: "2023.07.20",
            enddate: "2023.07.21",
            submitdate: "2023.07.18",
            submitreason: "가족 행사",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 5,
            user: "권혁준",
            title: "연차 신청합니다",
            category: "연차",
            startdate: "2024.03.12",
            enddate: "2024.03.13",
            submitdate: "2024.03.01",
            submitreason: "휴식",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 6,
            user: "권혁준",
            title: "조퇴 신청합니다",
            category: "조퇴",
            startdate: "2024.01.25",
            enddate: "2024.01.25",
            submitdate: "2024.01.24",
            submitreason: "아이 돌봄",
            refusereason: "긴급 회의",
            isApprove: false,
          },
          {
            id: 7,
            user: "박수현",
            title: "기타 신청합니다",
            category: "기타",
            startdate: "2023.09.15",
            enddate: "2023.09.16",
            submitdate: "2023.09.10",
            submitreason: "이사",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 8,
            user: "권혜지",
            title: "연차 신청합니다",
            category: "연차",
            startdate: "2024.04.01",
            enddate: "2024.04.02",
            submitdate: "2024.03.25",
            submitreason: "휴가",
            refusereason: "",
            isApprove: true,
          },
          {
            id: 9,
            user: "김승민",
            title: "반차 신청합니다",
            category: "반차",
            startdate: "2023.10.05",
            enddate: "2023.10.05",
            submitdate: "2023.10.01",
            submitreason: "집안일",
            refusereason: "긴급 상황",
            isApprove: false,
          },
          {
            id: 10,
            user: "권혁준",
            title: "조퇴 신청합니다",
            category: "조퇴",
            startdate: "2024.02.08",
            enddate: "2024.02.08",
            submitdate: "2024.02.07",
            submitreason: "가족 행사",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 11,
            user: "박수현",
            title: "기타 신청합니다",
            category: "기타",
            startdate: "2024.05.10",
            enddate: "2024.05.12",
            submitdate: "2024.05.01",
            submitreason: "개인 행사",
            refusereason: "",
            isApprove: true,
          },
          {
            id: 12,
            user: "권혜지",
            title: "반차 신청합니다",
            category: "반차",
            startdate: "2024.04.15",
            enddate: "2024.04.15",
            submitdate: "2024.04.10",
            submitreason: "병원 방문",
            refusereason: "업무량 증가",
            isApprove: false,
          },
          {
            id: 13,
            user: "권혁준",
            title: "조퇴 신청합니다",
            category: "조퇴",
            startdate: "2024.01.18",
            enddate: "2024.01.18",
            submitdate: "2024.01.17",
            submitreason: "개인 용무",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 14,
            user: "권혁준",
            title: "연차 신청합니다",
            category: "연차",
            startdate: "2023.08.20",
            enddate: "2023.08.21",
            submitdate: "2023.08.15",
            submitreason: "여행",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 15,
            user: "권혁준",
            title: "반차 신청합니다",
            category: "반차",
            startdate: "2024.03.25",
            enddate: "2024.03.25",
            submitdate: "2024.03.20",
            submitreason: "관공서 방문",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 16,
            user: "권혜지",
            title: "조퇴 신청합니다",
            category: "조퇴",
            startdate: "2023.09.28",
            enddate: "2023.09.28",
            submitdate: "2023.09.27",
            submitreason: "병원 예약",
            refusereason: "인력 부족",
            isApprove: false,
          },
          {
            id: 17,
            user: "김승민",
            title: "기타 신청합니다",
            category: "기타",
            startdate: "2024.04.30",
            enddate: "2024.05.02",
            submitdate: "2024.04.28",
            submitreason: "가족 여행",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 18,
            user: "권혁준",
            title: "연차 신청합니다",
            category: "연차",
            startdate: "2023.11.05",
            enddate: "2023.11.06",
            submitdate: "2023.10.31",
            submitreason: "휴식",
            refusereason: "",
            isApprove: true,
          },
          {
            id: 19,
            user: "박수현",
            title: "반차 신청합니다",
            category: "반차",
            startdate: "2024.02.08",
            enddate: "2024.02.08",
            submitdate: "2024.02.05",
            submitreason: "병원 예약",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 20,
            user: "권혜지",
            title: "조퇴 신청합니다",
            category: "조퇴",
            startdate: "2023.10.10",
            enddate: "2023.10.10",
            submitdate: "2023.10.09",
            submitreason: "아이 돌봄",
            refusereason: "업무량 증가",
            isApprove: false,
          },
          {
            id: 21,
            user: "김승민",
            title: "기타 신청합니다",
            category: "기타",
            startdate: "2024.03.15",
            enddate: "2024.03.17",
            submitdate: "2024.03.10",
            submitreason: "개인 용무",
            refusereason: "",
            isApprove: true,
          },
          {
            id: 22,
            user: "권혁준",
            title: "연차 신청합니다",
            category: "연차",
            startdate: "2024.04.20",
            enddate: "2024.04.21",
            submitdate: "2024.04.15",
            submitreason: "여행",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 23,
            user: "박수현",
            title: "반차 신청합니다",
            category: "반차",
            startdate: "2023.07.25",
            enddate: "2023.07.25",
            submitdate: "2023.07.20",
            submitreason: "관공서 방문",
            refusereason: "인력 부족",
            isApprove: false,
          },
          {
            id: 24,
            user: "권혁준",
            title: "조퇴 신청합니다",
            category: "조퇴",
            startdate: "2023.11.28",
            enddate: "2023.11.28",
            submitdate: "2023.11.27",
            submitreason: "병원 방문",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 25,
            user: "김승민",
            title: "기타 신청합니다",
            category: "기타",
            startdate: "2024.01.25",
            enddate: "2024.01.26",
            submitdate: "2024.01.20",
            submitreason: "가족 행사",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 26,
            user: "권혁준",
            title: "연차 신청합니다",
            category: "연차",
            startdate: "2023.08.05",
            enddate: "2023.08.06",
            submitdate: "2023.07.30",
            submitreason: "휴식",
            refusereason: "긴급 프로젝트",
            isApprove: false,
          },
          {
            id: 27,
            user: "권혁준",
            title: "반차 신청합니다",
            category: "반차",
            startdate: "2023.11.08",
            enddate: "2023.11.08",
            submitdate: "2023.11.05",
            submitreason: "병원 예약",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 28,
            user: "권혜지",
            title: "조퇴 신청합니다",
            category: "조퇴",
            startdate: "2024.03.10",
            enddate: "2024.03.10",
            submitdate: "2024.03.09",
            submitreason: "개인 용무",
            refusereason: "",
            isApprove: null,
          },
          {
            id: 29,
            user: "김승민",
            title: "기타 신청합니다",
            category: "기타",
            startdate: "2024.05.01",
            enddate: "2024.05.02",
            submitdate: "2024.04.25",
            submitreason: "가족 모임",
            refusereason: "",
            isApprove: true,
          },
          {
            id: 30,
            user: "권혁준",
            title: "연차 신청합니다",
            category: "연차",
            startdate: "2024.03.20",
            enddate: "2024.03.21",
            submitdate: "2024.03.15",
            submitreason: "여행",
            refusereason: "업무량 증가",
            isApprove: false,
          },
        ];
        let completedInserts = 0;
        sampleApprovalData.forEach((item) => {
          database.run(
            `INSERT OR REPLACE INTO Approval (id, user, title, category, startdate, enddate, submitdate, submitreason, refusereason, isApprove)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              item.id,
              item.user,
              item.title,
              item.category,
              item.startdate,
              item.enddate,
              item.submitdate,
              item.submitreason,
              item.refusereason,
              item.isApprove === true ? 1 : item.isApprove === false ? 0 : null,
            ],
            (err) => {
              if (err) {
                console.error("Error inserting sample data:", err.message);
              } else {
                console.log(`Sample data inserted: ${item.id}`);
                completedInserts++;
                if (completedInserts === sampleApprovalData.length) {
                  console.log(
                    "Sample Approval data insertion process completed."
                  );
                }
              }
            }
          );
        });
      }
    }
  );
  // Mileage 테이블 생성
  database.run(
    `
    CREATE TABLE IF NOT EXISTS Mileage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT,
      category TEXT NOT NULL,
      score INTEGER NOT NULL,
      date TEXT NOT NULL,
      image TEXT,
      isApprove INTEGER DEFAULT 0
    )`,
    (err) => {
      if (err) {
        console.error("Error creating Mileage table:", err.message);
      } else {
        console.log("Mileage table created successfully");

        // 테이블 생성 후 샘플 데이터 삽입
        const sampleMileageData = [
          {
            id: 1,
            user: "권혁준",
            category: "재사용 및 업사이클링",
            score: 2,
            date: "2023-01-02",
            image:
              "https://www.koreaittimes.com/news/photo/202010/100899_46719_042.jpg",
            isApprove: true,
          },
          {
            id: 2,
            user: "권혁준",
            category: "대중교통 및 자전거 이용",
            score: 3,
            date: "2024-02-02",
            image:
              "https://res.heraldm.com/content/image/2016/12/01/20161201000069_0.jpg",
            isApprove: null,
          },
          {
            id: 3,
            user: "권혁준",
            category: "에너지 절약",
            score: 1,
            date: "2024-04-02",
            image:
              "https://jpassets.jobplanet.co.kr/production/uploads/company_story/contents/2023/09/06/bdc946a8-7e6d-4767-b467-47763855c085.jpg",
            isApprove: true,
          },
          {
            id: 4,
            user: "권혁준",
            category: "재활용 및 분리수거",
            score: 1,
            date: "2024-01-02",
            image:
              "https://lh3.googleusercontent.com/proxy/oLcycr-SJ__AuukCJ6ry5f_4iKWij98LMzgm0885Q34zKnhEEUxbGFvRlQK5Ui52gzK4nIK6as0UXCbNcR8idp2crfdsN1Svjco98pHC141N-Q",
            isApprove: true,
          },
          {
            id: 5,
            user: "박수현",
            category: "재활용 및 분리수거",
            score: 3,
            date: "2024-07-02",
            image:
              "https://lh3.googleusercontent.com/proxy/oLcycr-SJ__AuukCJ6ry5f_4iKWij98LMzgm0885Q34zKnhEEUxbGFvRlQK5Ui52gzK4nIK6as0UXCbNcR8idp2crfdsN1Svjco98pHC141N-Q",
            isApprove: null,
          },
          {
            id: 6,
            user: "김승민",
            category: "재사용 및 업사이클링",
            score: 1,
            date: "2024-01-04",
            image:
              "https://www.koreaittimes.com/news/photo/202010/100899_46719_042.jpg",
            isApprove: true,
          },
          {
            id: 7,
            user: "박수현",
            category: "대중교통 및 자전거 이용",
            score: 1,
            date: "2024-01-07",
            image:
              "https://res.heraldm.com/content/image/2016/12/01/20161201000069_0.jpg",
            isApprove: false,
          },
          {
            id: 8,
            user: "김승민",
            category: "재사용 및 업사이클링",
            score: 2,
            date: "2022-01-02",
            image:
              "https://www.koreaittimes.com/news/photo/202010/100899_46719_042.jpg",
            isApprove: false,
          },
          {
            id: 9,
            user: "박수현",
            category: "대중교통 및 자전거 이용",
            score: 3,
            date: "2023-11-02",
            image:
              "https://res.heraldm.com/content/image/2016/12/01/20161201000069_0.jpg",
            isApprove: false,
          },
          {
            id: 10,
            user: "김승민",
            category: "에너지 절약",
            score: 1,
            date: "2024-02-12",
            image:
              "https://jpassets.jobplanet.co.kr/production/uploads/company_story/contents/2023/09/06/bdc946a8-7e6d-4767-b467-47763855c085.jpg",
            isApprove: null,
          },
          {
            id: 11,
            user: "권혜지",
            category: "재사용 및 업사이클링",
            score: 1,
            date: "2024-01-04",
            image:
              "https://www.koreaittimes.com/news/photo/202010/100899_46719_042.jpg",
            isApprove: null,
          },
          {
            id: 12,
            user: "권혁준",
            category: "대중교통 및 자전거 이용",
            score: 1,
            date: "2024-01-07",
            image:
              "https://res.heraldm.com/content/image/2016/12/01/20161201000069_0.jpg",
            isApprove: false,
          },
          {
            id: 13,
            user: "권혜지",
            category: "재사용 및 업사이클링",
            score: 2,
            date: "2022-01-02",
            image:
              "https://www.koreaittimes.com/news/photo/202010/100899_46719_042.jpg",
            isApprove: false,
          },
          {
            id: 14,
            user: "권혁준",
            category: "대중교통 및 자전거 이용",
            score: 3,
            date: "2023-11-02",
            image:
              "https://res.heraldm.com/content/image/2016/12/01/20161201000069_0.jpg",
            isApprove: false,
          },
          {
            id: 15,
            user: "박수현",
            category: "에너지 절약",
            score: 1,
            date: "2024-02-12",
            image:
              "https://jpassets.jobplanet.co.kr/production/uploads/company_story/contents/2023/09/06/bdc946a8-7e6d-4767-b467-47763855c085.jpg",
            isApprove: null,
          },
          {
            id: 16,
            user: "권혁준",
            category: "재활용 및 분리수거",
            score: 3,
            date: "2024-07-02",
            image:
              "https://lh3.googleusercontent.com/proxy/oLcycr-SJ__AuukCJ6ry5f_4iKWij98LMzgm0885Q34zKnhEEUxbGFvRlQK5Ui52gzK4nIK6as0UXCbNcR8idp2crfdsN1Svjco98pHC141N-Q",
            isApprove: true,
          },
          {
            id: 17,
            user: "권혁준",
            category: "재사용 및 업사이클링",
            score: 1,
            date: "2024-01-04",
            image:
              "https://www.koreaittimes.com/news/photo/202010/100899_46719_042.jpg",
            isApprove: true,
          },
          {
            id: 18,
            user: "권혁준",
            category: "대중교통 및 자전거 이용",
            score: 1,
            date: "2024-01-07",
            image:
              "https://res.heraldm.com/content/image/2016/12/01/20161201000069_0.jpg",
            isApprove: true,
          },
        ];

        // 각 항목을 개별적으로 삽입
        sampleMileageData.forEach((item) => {
          database.run(
            `INSERT OR REPLACE INTO Mileage (id, user, category, score, date, image, isApprove)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              item.id,
              item.user,
              item.category,
              item.score,
              item.date,
              item.image,
              item.isApprove === true ? 1 : item.isApprove === false ? 0 : null,
            ],
            (err) => {
              if (err) {
                console.error("Error inserting sample data:", err.message);
              } else {
                console.log(`Sample data inserted: ${item.id}`);
              }
            }
          );
        });

        console.log("Sample mileage data insertion process started.");
      }
    }
  );
});

export default database;

//데이터 지우는 법:저장하고 서버 다시실행.
// 삭제할 데이터의 ID를 배열에 담습니다.
// const idsToDelete = [6, 7]; // 삭제할 데이터의 ID 목록

// // 테이블 데이터 삭제
// idsToDelete.forEach((id) => {
//   database.run(`DELETE FROM Users WHERE id = ?`, [id], (err) => {
//     if (err) {
//       console.error(`Error deleting data with id ${id}:`, err.message);
//     } else {
//       console.log(`Data with id ${id} deleted successfully.`);
//     }
//   });
// });
