import express from "express";
import morgan from "morgan";
import fs from "fs";
import db from "./database.js";
import multer from "multer"; // multer import 추가
import path from "path";

const THRESHOLD = 2000;
const port = process.env.PORT || 8080;
const app = express();

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD);

  setTimeout(() => {
    next();
  }, delayTime);
});

app.use(morgan("dev"));
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const noticeUploadsDir = path.join(process.cwd(), "notice_uploads");
if (!fs.existsSync(noticeUploadsDir)) {
  fs.mkdirSync(noticeUploadsDir, { recursive: true });
}

const mileageUploadsDir = path.join(process.cwd(), "mileage_uploads");
if (!fs.existsSync(mileageUploadsDir)) {
  fs.mkdirSync(mileageUploadsDir, { recursive: true });
}

// Multer 설정: 프로필 이미지를 uploads/ 디렉토리에 저장
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const noticeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "notice_uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const noticeUpload = multer({ storage: noticeStorage });

// 유저 목록 조회
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM Users";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    res.json({
      status: "OK",
      data: rows,
    });
  });
});

// 유저 추가
app.post("/api/users", upload.single("profileImage"), (req, res) => {
  const { name, email, position, birthday, startDate, phone, password } =
    req.body;
  const profileImage = req.file
    ? `/uploads/${req.file.filename}`
    : "/public/images/defaultProfile.png"; // Get uploaded image path if available

  const sql = `INSERT INTO Users (name, email, profileImage, position, birthday, startDate, phone, password)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    name,
    email,
    profileImage,
    position,
    birthday,
    startDate,
    phone,
    password,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    res.status(201).json({
      status: "OK",
      data: {
        id: this.lastID,
        name,
        email,
        profileImage,
        position,
        birthday,
        startDate,
        phone,
        password,
      },
    });
  });
});

// 유저 삭제
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Users WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "User deleted",
    });
  });
});

// 유저 정보 업데이트
app.put("/api/users/:id", upload.single("profileImage"), (req, res) => {
  const userId = req.params.id;
  const { name, email, position, birthday, startDate, phone, password } =
    req.body;
  const profileImage = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.profileImage;

  const sql = `UPDATE Users SET name = ?, email = ?, profileImage = ?, position = ?, 
               birthday = ?, startDate = ?, phone = ?, password = ? WHERE id = ?`;
  const params = [
    name,
    email,
    profileImage,
    position,
    birthday,
    startDate,
    phone,
    password,
    userId,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    res.json({
      status: "OK",
      message: "User updated successfully",
      data: {
        id: userId,
        name,
        email,
        profileImage,
        position,
        birthday,
        startDate,
        phone,
      },
    });
  });
});

// 공지사항 목록 조회
app.get("/api/notices", (req, res) => {
  //Notices 테이블의 모든 데이터를 가져오되, 생성일(createdAt)을 기준으로 최신순으로 정렬
  const sql = "SELECT * FROM Notices ORDER BY createdAt DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    res.json({
      status: "OK",
      data: rows,
    });
  });
});

// 공지사항 생성
app.post("/api/notices", noticeUpload.single("attachments"), (req, res) => {
  const { category, title, author, isImportant, description } = req.body;
  const attachments = req.file ? `/notice_uploads/${req.file.filename}` : null;
  const currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
  const dd = String(currentDate.getDate()).padStart(2, "0");
  const createdAt = `${yyyy}-${mm}-${dd}`;

  const sql = `INSERT INTO Notices (category, title, author, createdAt, attachments, isImportant, description)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    category,
    title,
    author,
    createdAt,
    attachments,
    isImportant === "1" ? 1 : 0,
    description,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    res.status(201).json({
      status: "OK",
      data: {
        id: this.lastID,
        category,
        title,
        author,
        createdAt,
        attachments,
        views: 0,
        isImportant: isImportant === "1" ? 1 : 0,
        description,
      },
    });
  });
});

// 공지사항 삭제
app.delete("/api/notices/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Notices WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Notice not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Notice deleted",
    });
  });
});

// 공지사항 조회수 증가
app.put("/api/notices/:id/view", (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE Notices SET views = views + 1 WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Notice not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "View count increased",
    });
  });
});

// 마일리지 이미지를 위한 Multer 설정
const mileageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "mileage_uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const mileageUpload = multer({ storage: mileageStorage });

// 1. 마일리지 목록 조회
app.get("/api/mileage", (req, res) => {
  const sql = "SELECT * FROM Mileage ORDER BY date DESC"; //날짜 순서대로
  // ASC: 오름차순 (1~), DESC: 내림차순 (~1)

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    res.json({
      status: "OK",
      data: rows,
    });
  });
});

// 2. 마일리지 신청 (사용자용)
app.post("/api/mileage/apply", mileageUpload.single("image"), (req, res) => {
  const { user, category, score, date } = req.body;
  const image = req.file ? `/mileage_uploads/${req.file.filename}` : null;
  const sql = `INSERT INTO Mileage (user, category, score, date, image, isApprove)
               VALUES (?, ?, ?, ?, ?, ?)`; // 순서에 맞게!
  const params = [user, category, score, date, image, null]; // isApprove를 0(심사중)으로 설정

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ status: "Error", error: err.message });
    }
    res.status(201).json({
      status: "OK",
      data: {
        id: this.lastID,
        user,
        category,
        score,
        date,
        image,
        isApprove: null,
      },
    });
  });
});

// 3. 마일리지 승인/거절 (관리자용)
app.put("/api/mileage/:id/approve", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { isApprove } = req.body;

  console.log("Received request:", { id, isApprove }); // 요청 로깅

  if (isNaN(id)) {
    return res.status(400).json({ status: "Error", message: "Invalid ID" });
  }

  const sql = "UPDATE Mileage SET isApprove = ? WHERE id = ?";
  const isApproveValue = isApprove === true || isApprove === 1 ? 1 : 0;
  const params = [isApproveValue, id];

  console.log("Executing SQL:", sql, "with params:", params); // SQL 쿼리 로깅

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        status: "Error",
        message: "Database operation failed",
        error: err.message,
      });
    }

    console.log("SQL execution result:", { changes: this.changes }); // 실행 결과 로깅

    if (this.changes === 0) {
      return res
        .status(404)
        .json({ status: "Error", message: "Mileage record not found" });
    }

    res.status(200).json({
      status: "OK",
      message: isApprove ? "Mileage approved" : "Mileage rejected",
    });
  });
});

// 전자결제 multer
const uploadApprovalMiddleware = multer();

//전자결제 목록 조회
app.get("/api/approval", (req, res) => {
  const sql = "SELECT * FROM Approval ORDER BY submitdate DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    res.json({
      status: "OK",
      data: rows,
    });
  });
});

//전자결제 목록 추가
app.post("/api/approval", uploadApprovalMiddleware.none(), (req, res) => {
  const { user, title, category, startdate, enddate, submitreason } = req.body;
  const currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
  const dd = String(currentDate.getDate()).padStart(2, "0");
  const submitdate = `${yyyy}.${mm}.${dd}`;

  const sql = ` INSERT INTO Approval (user, title, category, startdate, enddate, submitdate, submitreason, refusereason, isApprove)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    user,
    title,
    category,
    startdate,
    enddate,
    submitdate,
    submitreason,
    "", // refusereason
    null, // isApprove
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    res.status(201).json({
      status: "OK",
      data: {
        id: this.lastID,
        user,
        title,
        category,
        startdate,
        enddate,
        submitdate,
        submitreason,
        refusereason: "",
        isApprove: null,
      },
    });
  });
});

// 전자결제 승인/거절 처리
app.put("/api/approval/:id", uploadApprovalMiddleware.none(), (req, res) => {
  const id = req.params.id;
  const isApprove = req.body.isApprove === "true";
  const refusereason = req.body.refusereason || "";

  let sql, params;

  if (isApprove) {
    // 승인 처리
    sql = `UPDATE Approval SET isApprove = 1 WHERE id = ?`;
    params = [id];
  } else {
    // 거절 처리
    sql = `UPDATE Approval SET isApprove = 0, refusereason = ? WHERE id = ?`;
    params = [refusereason, id];
  }

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({
        status: "Error",
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        status: "Error",
        error: "해당 ID의 전자결제를 찾을 수 없습니다.",
      });
    }

    // 업데이트된 데이터 조회
    db.get(`SELECT * FROM Approval WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res.status(500).json({
          status: "Error",
          error: err.message,
        });
      }

      res.json({
        status: "OK",
        message: isApprove
          ? "전자결재가 승인되었습니다."
          : "전자결재가 거절되었습니다.",
        data: row,
      });
    });
  });
});
app.listen(port, () => {
  console.log(`ready to ${port}`);
});
