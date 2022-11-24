export const IMAGE_TYPE = {
  AVATAR: {
    code: "AVATAR",
    meaning: "avatar",
  },
  OTHER: {
    code: "OTHER",
    meaning: "other",
  },
};

export const ROLE = {
  ADMIN: { code: "ADMIN", meaning: "Quản trị viên" },
  STUDENT: { code: "STUDENT", meaning: "Học sinh" },
  TEACHER: { code: "TEACHER", meaning: "Giáo viên" },
};

export const EXAM_TYPE = {
  ONE: "ONE",
  MANY: "MANY",
};

export const QUESTION_TYPE = {
  ONE: { code: "ONE", meaning: "Câu hỏi có một câu trả lời đúng" },
  MANY: { code: "MANY", meaning: "Câu hỏi có nhiều câu trả lời đúng" },
  FILL: {
    code: "FILL",
    meaning: "Câu hỏi điền đáp án đúng",
  },
  TRUE_FALSE: {
    code: "TRUE_FALSE",
    meaning: "Câu hỏi đúng sai",
  },
};

export const RESULT_TYPE = {
  PASS: "PASS",
  NO_PASS: "NO_PASS",
};
