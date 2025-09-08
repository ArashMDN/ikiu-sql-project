export const databaseSchemas = {
  ecommerce: {
    name: "سیستم فروشگاه آنلاین",
    description: "مدیریت مشتریان، محصولات، سفارشات و پرداخت‌ها",
    tables: {
      customers: {
        name: "مشتریان",
        description: "اطلاعات مشتریان فروشگاه",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "firstName", type: "TEXT", nullable: false, description: "نام" },
          { name: "lastName", type: "TEXT", nullable: false, description: "نام خانوادگی" },
          { name: "email", type: "TEXT", unique: true, description: "ایمیل" },
          { name: "phone", type: "TEXT", description: "شماره تلفن" },
          { name: "address", type: "TEXT", description: "آدرس" },
          { name: "registrationDate", type: "DATE", description: "تاریخ عضویت" }
        ]
      },
      products: {
        name: "محصولات",
        description: "کاتالوگ محصولات فروشگاه",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "name", type: "TEXT", nullable: false, description: "نام محصول" },
          { name: "description", type: "TEXT", description: "توضیحات محصول" },
          { name: "price", type: "DECIMAL", nullable: false, description: "قیمت (تومان)" },
          { name: "category", type: "TEXT", description: "دسته‌بندی" },
          { name: "stock", type: "INTEGER", description: "موجودی انبار" },
          { name: "createdAt", type: "DATETIME", description: "تاریخ ایجاد" }
        ]
      },
      orders: {
        name: "سفارشات",
        description: "سفارشات مشتریان",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "customerId", type: "INTEGER", foreign: "customers.id", description: "شناسه مشتری" },
          { name: "orderDate", type: "DATETIME", description: "تاریخ سفارش" },
          { name: "status", type: "TEXT", description: "وضعیت سفارش" },
          { name: "totalAmount", type: "DECIMAL", description: "مبلغ کل" },
          { name: "shippingAddress", type: "TEXT", description: "آدرس ارسال" }
        ]
      },
      orderItems: {
        name: "اقلام سفارش",
        description: "جزئیات اقلام هر سفارش",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "orderId", type: "INTEGER", foreign: "orders.id", description: "شناسه سفارش" },
          { name: "productId", type: "INTEGER", foreign: "products.id", description: "شناسه محصول" },
          { name: "quantity", type: "INTEGER", description: "تعداد" },
          { name: "unitPrice", type: "DECIMAL", description: "قیمت واحد" }
        ]
      },
      payments: {
        name: "پرداخت‌ها",
        description: "اطلاعات پرداخت سفارشات",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "orderId", type: "INTEGER", foreign: "orders.id", description: "شناسه سفارش" },
          { name: "amount", type: "DECIMAL", description: "مبلغ پرداخت" },
          { name: "paymentMethod", type: "TEXT", description: "روش پرداخت" },
          { name: "paymentDate", type: "DATETIME", description: "تاریخ پرداخت" },
          { name: "status", type: "TEXT", description: "وضعیت پرداخت" }
        ]
      }
    }
  },
  school: {
    name: "سیستم مدیریت مدرسه",
    description: "مدیریت دانش‌آموزان، معلمان، دروس و نمرات",
    tables: {
      students: {
        name: "دانش‌آموزان",
        description: "اطلاعات دانش‌آموزان مدرسه",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "firstName", type: "TEXT", nullable: false, description: "نام" },
          { name: "lastName", type: "TEXT", nullable: false, description: "نام خانوادگی" },
          { name: "studentNumber", type: "TEXT", unique: true, description: "شماره دانش‌آموزی" },
          { name: "grade", type: "INTEGER", description: "پایه تحصیلی" },
          { name: "birthDate", type: "DATE", description: "تاریخ تولد" },
          { name: "enrollmentDate", type: "DATE", description: "تاریخ ثبت‌نام" }
        ]
      },
      teachers: {
        name: "معلمان",
        description: "اطلاعات معلمان مدرسه",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "firstName", type: "TEXT", nullable: false, description: "نام" },
          { name: "lastName", type: "TEXT", nullable: false, description: "نام خانوادگی" },
          { name: "email", type: "TEXT", unique: true, description: "ایمیل" },
          { name: "subject", type: "TEXT", description: "تخصص درسی" },
          { name: "hireDate", type: "DATE", description: "تاریخ استخدام" },
          { name: "salary", type: "DECIMAL", description: "حقوق" }
        ]
      },
      courses: {
        name: "دروس",
        description: "لیست دروس ارائه شده",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "name", type: "TEXT", nullable: false, description: "نام درس" },
          { name: "teacherId", type: "INTEGER", foreign: "teachers.id", description: "شناسه معلم" },
          { name: "grade", type: "INTEGER", description: "پایه تحصیلی" },
          { name: "credits", type: "INTEGER", description: "تعداد واحد" },
          { name: "schedule", type: "TEXT", description: "برنامه زمانی" }
        ]
      },
      enrollments: {
        name: "ثبت‌نام دروس",
        description: "ثبت‌نام دانش‌آموزان در دروس",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "studentId", type: "INTEGER", foreign: "students.id", description: "شناسه دانش‌آموز" },
          { name: "courseId", type: "INTEGER", foreign: "courses.id", description: "شناسه درس" },
          { name: "semester", type: "TEXT", description: "ترم تحصیلی" },
          { name: "year", type: "INTEGER", description: "سال تحصیلی" }
        ]
      },
      grades: {
        name: "نمرات",
        description: "نمرات دانش‌آموزان در آزمون‌ها",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "studentId", type: "INTEGER", foreign: "students.id", description: "شناسه دانش‌آموز" },
          { name: "courseId", type: "INTEGER", foreign: "courses.id", description: "شناسه درس" },
          { name: "examType", type: "TEXT", description: "نوع آزمون" },
          { name: "score", type: "DECIMAL", description: "نمره" },
          { name: "examDate", type: "DATE", description: "تاریخ آزمون" }
        ]
      }
    }
  },
  library: {
    name: "سیستم مدیریت کتابخانه",
    description: "مدیریت کتاب‌ها، اعضا و امانات",
    tables: {
      books: {
        name: "کتاب‌ها",
        description: "کاتالوگ کتاب‌های کتابخانه",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "title", type: "TEXT", nullable: false, description: "عنوان کتاب" },
          { name: "author", type: "TEXT", description: "نویسنده" },
          { name: "isbn", type: "TEXT", unique: true, description: "شابک" },
          { name: "category", type: "TEXT", description: "دسته‌بندی" },
          { name: "publishYear", type: "INTEGER", description: "سال انتشار" },
          { name: "copies", type: "INTEGER", description: "تعداد نسخه" }
        ]
      },
      members: {
        name: "اعضا",
        description: "اطلاعات اعضای کتابخانه",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "firstName", type: "TEXT", nullable: false, description: "نام" },
          { name: "lastName", type: "TEXT", nullable: false, description: "نام خانوادگی" },
          { name: "email", type: "TEXT", unique: true, description: "ایمیل" },
          { name: "phone", type: "TEXT", description: "شماره تلفن" },
          { name: "membershipDate", type: "DATE", description: "تاریخ عضویت" },
          { name: "membershipType", type: "TEXT", description: "نوع عضویت" }
        ]
      },
      loans: {
        name: "امانات",
        description: "سوابق امانت کتاب‌ها",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "memberId", type: "INTEGER", foreign: "members.id", description: "شناسه عضو" },
          { name: "bookId", type: "INTEGER", foreign: "books.id", description: "شناسه کتاب" },
          { name: "loanDate", type: "DATE", description: "تاریخ امانت" },
          { name: "dueDate", type: "DATE", description: "مهلت بازگشت" },
          { name: "returnDate", type: "DATE", description: "تاریخ بازگشت" },
          { name: "status", type: "TEXT", description: "وضعیت امانت" }
        ]
      },
      reservations: {
        name: "رزروها",
        description: "رزرو کتاب‌ها توسط اعضا",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "memberId", type: "INTEGER", foreign: "members.id", description: "شناسه عضو" },
          { name: "bookId", type: "INTEGER", foreign: "books.id", description: "شناسه کتاب" },
          { name: "reservationDate", type: "DATE", description: "تاریخ رزرو" },
          { name: "status", type: "TEXT", description: "وضعیت رزرو" }
        ]
      }
    }
  },
  company: {
    name: "سیستم مدیریت شرکت",
    description: "مدیریت کارمندان، بخش‌ها، پروژه‌ها و حضور و غیاب",
    tables: {
      employees: {
        name: "کارمندان",
        description: "اطلاعات کارمندان شرکت",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "firstName", type: "TEXT", nullable: false, description: "نام" },
          { name: "lastName", type: "TEXT", nullable: false, description: "نام خانوادگی" },
          { name: "email", type: "TEXT", unique: true, description: "ایمیل" },
          { name: "position", type: "TEXT", description: "سمت" },
          { name: "departmentId", type: "INTEGER", foreign: "departments.id", description: "شناسه بخش" },
          { name: "salary", type: "DECIMAL", description: "حقوق" },
          { name: "hireDate", type: "DATE", description: "تاریخ استخدام" }
        ]
      },
      departments: {
        name: "بخش‌ها",
        description: "بخش‌های مختلف شرکت",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "name", type: "TEXT", nullable: false, description: "نام بخش" },
          { name: "description", type: "TEXT", description: "توضیحات بخش" },
          { name: "managerId", type: "INTEGER", foreign: "employees.id", description: "شناسه مدیر" },
          { name: "budget", type: "DECIMAL", description: "بودجه" }
        ]
      },
      projects: {
        name: "پروژه‌ها",
        description: "پروژه‌های شرکت",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "name", type: "TEXT", nullable: false, description: "نام پروژه" },
          { name: "description", type: "TEXT", description: "توضیحات پروژه" },
          { name: "startDate", type: "DATE", description: "تاریخ شروع" },
          { name: "endDate", type: "DATE", description: "تاریخ پایان" },
          { name: "deadline", type: "DATE", description: "مهلت تحویل" },
          { name: "status", type: "TEXT", description: "وضعیت پروژه" },
          { name: "budget", type: "DECIMAL", description: "بودجه" }
        ]
      },
      attendances: {
        name: "حضور و غیاب",
        description: "سوابق حضور کارمندان",
        columns: [
          { name: "id", type: "INTEGER", primary: true, description: "شناسه یکتا" },
          { name: "employeeId", type: "INTEGER", foreign: "employees.id", description: "شناسه کارمند" },
          { name: "date", type: "DATE", description: "تاریخ" },
          { name: "checkIn", type: "TIME", description: "ساعت ورود" },
          { name: "checkOut", type: "TIME", description: "ساعت خروج" },
          { name: "status", type: "TEXT", description: "وضعیت حضور" }
        ]
      }
    }
  }
};
