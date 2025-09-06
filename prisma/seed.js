const { PrismaClient } = require("../app/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // ========================================
  // SEED E-COMMERCE SYSTEM
  // ========================================

  console.log("📦 Seeding E-Commerce data...");

  // Categories
  const electronicsCategory = await prisma.category.create({
    data: {
      name: "الکترونیک",
      description: "کالاهای الکترونیکی و دیجیتال",
    },
  });

  const clothingCategory = await prisma.category.create({
    data: {
      name: "پوشاک",
      description: "انواع لباس و پوشاک",
    },
  });

  const booksCategory = await prisma.category.create({
    data: {
      name: "کتاب",
      description: "کتاب‌های مختلف",
    },
  });

  // Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "گوشی Samsung Galaxy S23",
        description: "گوشی هوشمند پیشرفته سامسونگ",
        price: 25000000,
        stock: 15,
        categoryId: electronicsCategory.id,
        imageUrl: "/images/samsung-s23.jpg",
      },
    }),
    prisma.product.create({
      data: {
        name: "لپ‌تاپ MacBook Air",
        description: "لپ‌تاپ اپل با پردازنده M2",
        price: 45000000,
        stock: 8,
        categoryId: electronicsCategory.id,
        imageUrl: "/images/macbook-air.jpg",
      },
    }),
    prisma.product.create({
      data: {
        name: "تی‌شرت مردانه",
        description: "تی‌شرت پنبه‌ای راحت",
        price: 350000,
        stock: 50,
        categoryId: clothingCategory.id,
        imageUrl: "/images/tshirt.jpg",
      },
    }),
    prisma.product.create({
      data: {
        name: "کتاب برنامه‌نویسی Python",
        description: "آموزش کامل برنامه‌نویسی پایتون",
        price: 280000,
        stock: 30,
        categoryId: booksCategory.id,
        imageUrl: "/images/python-book.jpg",
      },
    }),
  ]);

  // Customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        firstName: "علی",
        lastName: "احمدی",
        email: "ali.ahmadi@email.com",
        phone: "09123456789",
        address: "تهران، خیابان ولیعصر",
        city: "تهران",
        country: "ایران",
      },
    }),
    prisma.customer.create({
      data: {
        firstName: "فاطمه",
        lastName: "محمدی",
        email: "fateme.mohammadi@email.com",
        phone: "09987654321",
        address: "اصفهان، خیابان چهارباغ",
        city: "اصفهان",
        country: "ایران",
      },
    }),
    prisma.customer.create({
      data: {
        firstName: "حسن",
        lastName: "کریمی",
        email: "hasan.karimi@email.com",
        phone: "09111222333",
        address: "مشهد، خیابان امام رضا",
        city: "مشهد",
        country: "ایران",
      },
    }),
  ]);

  // Orders and Order Items
  const order1 = await prisma.order.create({
    data: {
      customerId: customers[0].id,
      status: "delivered",
      totalAmount: 25350000,
      shippingAddress: "تهران، خیابان ولیعصر، پلاک 123",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: products[0].id, // Samsung Galaxy S23
      quantity: 1,
      price: 25000000,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: products[2].id, // T-shirt
      quantity: 1,
      price: 350000,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      customerId: customers[1].id,
      status: "processing",
      totalAmount: 45280000,
      shippingAddress: "اصفهان، خیابان چهارباغ، پلاک 456",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: products[1].id, // MacBook Air
      quantity: 1,
      price: 45000000,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: products[3].id, // Python Book
      quantity: 1,
      price: 280000,
    },
  });

  // Reviews
  await Promise.all([
    prisma.review.create({
      data: {
        customerId: customers[0].id,
        productId: products[0].id,
        rating: 5,
        comment: "گوشی عالی و با کیفیت، پیشنهاد می‌کنم",
      },
    }),
    prisma.review.create({
      data: {
        customerId: customers[1].id,
        productId: products[1].id,
        rating: 4,
        comment: "لپ‌تاپ سریع و کارآمد، ولی قیمت کمی بالاست",
      },
    }),
  ]);

  // ========================================
  // SEED SCHOOL MANAGEMENT SYSTEM
  // ========================================

  console.log("🎓 Seeding School data...");

  // Teachers
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        teacherId: "T001",
        firstName: "دکتر محمد",
        lastName: "رضایی",
        email: "m.rezaei@school.edu",
        phone: "09121111111",
        department: "ریاضی",
        salary: 15000000,
      },
    }),
    prisma.teacher.create({
      data: {
        teacherId: "T002",
        firstName: "دکتر زهرا",
        lastName: "موسوی",
        email: "z.mousavi@school.edu",
        phone: "09122222222",
        department: "کامپیوتر",
        salary: 18000000,
      },
    }),
    prisma.teacher.create({
      data: {
        teacherId: "T003",
        firstName: "استاد علی",
        lastName: "حسینی",
        email: "a.hosseini@school.edu",
        phone: "09123333333",
        department: "فیزیک",
        salary: 16000000,
      },
    }),
  ]);

  // Courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        courseCode: "MATH101",
        courseName: "ریاضی عمومی 1",
        description: "مبانی ریاضیات و حسابان",
        credits: 3,
        teacherId: teachers[0].id,
        semester: "Fall",
        year: 2024,
        maxStudents: 25,
      },
    }),
    prisma.course.create({
      data: {
        courseCode: "CS101",
        courseName: "مقدمه‌ای بر علوم کامپیوتر",
        description: "آشنایی با مفاهیم پایه کامپیوتر",
        credits: 4,
        teacherId: teachers[1].id,
        semester: "Fall",
        year: 2024,
        maxStudents: 20,
      },
    }),
    prisma.course.create({
      data: {
        courseCode: "PHYS101",
        courseName: "فیزیک عمومی",
        description: "مکانیک و گرما",
        credits: 4,
        teacherId: teachers[2].id,
        semester: "Fall",
        year: 2024,
        maxStudents: 30,
      },
    }),
  ]);

  // Students
  const students = await Promise.all([
    prisma.student.create({
      data: {
        studentId: "S2024001",
        firstName: "سارا",
        lastName: "امینی",
        email: "sara.amini@student.edu",
        phone: "09131111111",
        birthDate: new Date("2005-03-15"),
        address: "تهران، منطقه 3",
        status: "active",
      },
    }),
    prisma.student.create({
      data: {
        studentId: "S2024002",
        firstName: "رضا",
        lastName: "نوری",
        email: "reza.nouri@student.edu",
        phone: "09132222222",
        birthDate: new Date("2004-11-22"),
        address: "کرج، فردیس",
        status: "active",
      },
    }),
    prisma.student.create({
      data: {
        studentId: "S2024003",
        firstName: "مریم",
        lastName: "کاظمی",
        email: "maryam.kazemi@student.edu",
        phone: "09133333333",
        birthDate: new Date("2005-07-08"),
        address: "تهران، منطقه 5",
        status: "active",
      },
    }),
  ]);

  // Enrollments
  await Promise.all([
    prisma.enrollment.create({
      data: {
        studentId: students[0].id,
        courseId: courses[0].id, // Math
        status: "enrolled",
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[0].id,
        courseId: courses[1].id, // CS
        status: "enrolled",
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[1].id,
        courseId: courses[0].id, // Math
        status: "enrolled",
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[1].id,
        courseId: courses[2].id, // Physics
        status: "enrolled",
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[2].id,
        courseId: courses[1].id, // CS
        status: "enrolled",
      },
    }),
  ]);

  // Grades
  await Promise.all([
    prisma.grade.create({
      data: {
        studentId: students[0].id,
        courseId: courses[0].id,
        teacherId: teachers[0].id,
        examType: "midterm",
        score: 17.5,
        maxScore: 20,
      },
    }),
    prisma.grade.create({
      data: {
        studentId: students[0].id,
        courseId: courses[1].id,
        teacherId: teachers[1].id,
        examType: "quiz",
        score: 9,
        maxScore: 10,
      },
    }),
    prisma.grade.create({
      data: {
        studentId: students[1].id,
        courseId: courses[0].id,
        teacherId: teachers[0].id,
        examType: "final",
        score: 18,
        maxScore: 20,
      },
    }),
  ]);

  // ========================================
  // SEED LIBRARY MANAGEMENT SYSTEM
  // ========================================

  console.log("📚 Seeding Library data...");

  // Authors
  const authors = await Promise.all([
    prisma.author.create({
      data: {
        firstName: "جلال‌الدین",
        lastName: "مولوی",
        birthDate: new Date("1207-09-30"),
        nationality: "ایرانی",
        biography: "شاعر و عارف بزرگ ایرانی",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "صادق",
        lastName: "هدایت",
        birthDate: new Date("1903-02-17"),
        nationality: "ایرانی",
        biography: "نویسنده مشهور ایرانی",
      },
    }),
    prisma.author.create({
      data: {
        firstName: "احمد",
        lastName: "شاملو",
        birthDate: new Date("1925-12-12"),
        nationality: "ایرانی",
        biography: "شاعر نو ایرانی",
      },
    }),
  ]);

  // Publishers
  const publishers = await Promise.all([
    prisma.publisher.create({
      data: {
        name: "انتشارات امیرکبیر",
        address: "تهران، خیابان انقلاب",
        phone: "02133334444",
        email: "info@amir-kabir.com",
        website: "www.amir-kabir.com",
      },
    }),
    prisma.publisher.create({
      data: {
        name: "انتشارات نشر چشمه",
        address: "تهران، خیابان کریم‌خان",
        phone: "02144445555",
        email: "info@nashr-cheshmeh.com",
        website: "www.nashr-cheshmeh.com",
      },
    }),
  ]);

  // Books
  const books = await Promise.all([
    prisma.book.create({
      data: {
        isbn: "978-964-00-0001-1",
        title: "مثنوی معنوی",
        description: "شاهکار مولانا در عرفان",
        publisherId: publishers[0].id,
        publishDate: new Date("2020-01-01"),
        pages: 800,
        language: "فارسی",
        genre: "عرفان",
        totalCopies: 5,
        availableCopies: 3,
      },
    }),
    prisma.book.create({
      data: {
        isbn: "978-964-00-0002-2",
        title: "بوف کور",
        description: "داستان کوتاه معروف هدایت",
        publisherId: publishers[1].id,
        publishDate: new Date("2019-05-15"),
        pages: 120,
        language: "فارسی",
        genre: "داستان",
        totalCopies: 8,
        availableCopies: 6,
      },
    }),
    prisma.book.create({
      data: {
        isbn: "978-964-00-0003-3",
        title: "هوای تازه",
        description: "مجموعه شعر احمد شاملو",
        publisherId: publishers[0].id,
        publishDate: new Date("2021-03-20"),
        pages: 200,
        language: "فارسی",
        genre: "شعر",
        totalCopies: 10,
        availableCopies: 8,
      },
    }),
  ]);

  // Book Authors (Many-to-Many relationship)
  await Promise.all([
    prisma.bookAuthor.create({
      data: {
        bookId: books[0].id,
        authorId: authors[0].id,
      },
    }),
    prisma.bookAuthor.create({
      data: {
        bookId: books[1].id,
        authorId: authors[1].id,
      },
    }),
    prisma.bookAuthor.create({
      data: {
        bookId: books[2].id,
        authorId: authors[2].id,
      },
    }),
  ]);

  // Members
  const members = await Promise.all([
    prisma.member.create({
      data: {
        memberId: "LIB001",
        firstName: "نرگس",
        lastName: "فرهادی",
        email: "narges.farhadi@email.com",
        phone: "09141111111",
        address: "تهران، خیابان آزادی",
        membershipType: "premium",
        status: "active",
      },
    }),
    prisma.member.create({
      data: {
        memberId: "LIB002",
        firstName: "کامران",
        lastName: "علیزاده",
        email: "kamran.alizadeh@email.com",
        phone: "09142222222",
        address: "تهران، خیابان شریعتی",
        membershipType: "regular",
        status: "active",
      },
    }),
  ]);

  // Loans
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  await Promise.all([
    prisma.loan.create({
      data: {
        memberId: members[0].id,
        bookId: books[0].id,
        dueDate: nextWeek,
        status: "active",
      },
    }),
    prisma.loan.create({
      data: {
        memberId: members[1].id,
        bookId: books[1].id,
        dueDate: tomorrow,
        returnDate: new Date(),
        status: "returned",
      },
    }),
  ]);

  // ========================================
  // SEED COMPANY DATABASE (Standard Model)
  // ========================================

  console.log("🏢 Seeding COMPANY database...");

  // Departments
  const departments = await Promise.all([
    prisma.dEPARTMENT.create({
      data: {
        Dname: "Research",
        Dnumber: 5,
        Mgr_ssn: "333445555",
        Mgr_start_date: new Date("1988-05-22"),
      },
    }),
    prisma.dEPARTMENT.create({
      data: {
        Dname: "Administration",
        Dnumber: 4,
        Mgr_ssn: "987654321",
        Mgr_start_date: new Date("1995-01-01"),
      },
    }),
    prisma.dEPARTMENT.create({
      data: {
        Dname: "Headquarters",
        Dnumber: 1,
        Mgr_ssn: "888665555",
        Mgr_start_date: new Date("1981-06-19"),
      },
    }),
  ]);

  // Department Locations
  await Promise.all([
    prisma.dEPT_LOCATIONS.create({
      data: { Dnumber: 1, Dlocation: "Houston" },
    }),
    prisma.dEPT_LOCATIONS.create({
      data: { Dnumber: 4, Dlocation: "Stafford" },
    }),
    prisma.dEPT_LOCATIONS.create({
      data: { Dnumber: 5, Dlocation: "Bellaire" },
    }),
    prisma.dEPT_LOCATIONS.create({
      data: { Dnumber: 5, Dlocation: "Sugarland" },
    }),
    prisma.dEPT_LOCATIONS.create({
      data: { Dnumber: 5, Dlocation: "Houston" },
    }),
  ]);

  // Employees - Create in correct order to handle supervisor references
  // First create the top manager (no supervisor)
  const ceo = await prisma.eMPLOYEE.create({
    data: {
      Ssn: "888665555",
      Fname: "James",
      Minit: "E",
      Lname: "Borg",
      Bdate: new Date("1937-11-10"),
      Address: "450 Stone, Houston, TX",
      Sex: "M",
      Salary: 55000,
      Super_ssn: null,
      Dno: 1,
    },
  });

  // Then create middle managers
  const franklinWong = await prisma.eMPLOYEE.create({
    data: {
      Ssn: "333445555",
      Fname: "Franklin",
      Minit: "T",
      Lname: "Wong",
      Bdate: new Date("1955-12-08"),
      Address: "638 Voss, Houston, TX",
      Sex: "M",
      Salary: 40000,
      Super_ssn: "888665555",
      Dno: 5,
    },
  });

  const jenniferWallace = await prisma.eMPLOYEE.create({
    data: {
      Ssn: "987654321",
      Fname: "Jennifer",
      Minit: "S",
      Lname: "Wallace",
      Bdate: new Date("1941-06-20"),
      Address: "291 Berry, Bellaire, TX",
      Sex: "F",
      Salary: 43000,
      Super_ssn: "888665555",
      Dno: 4,
    },
  });

  // Finally create other employees
  const otherEmployees = await Promise.all([
    prisma.eMPLOYEE.create({
      data: {
        Ssn: "123456789",
        Fname: "John",
        Minit: "B",
        Lname: "Smith",
        Bdate: new Date("1965-01-09"),
        Address: "731 Fondren, Houston, TX",
        Sex: "M",
        Salary: 30000,
        Super_ssn: "333445555",
        Dno: 5,
      },
    }),
    prisma.eMPLOYEE.create({
      data: {
        Ssn: "999887777",
        Fname: "Alicia",
        Minit: "J",
        Lname: "Zelaya",
        Bdate: new Date("1968-01-19"),
        Address: "3321 Castle, Spring, TX",
        Sex: "F",
        Salary: 25000,
        Super_ssn: "987654321",
        Dno: 4,
      },
    }),
    prisma.eMPLOYEE.create({
      data: {
        Ssn: "666884444",
        Fname: "Ramesh",
        Minit: "K",
        Lname: "Narayan",
        Bdate: new Date("1962-09-15"),
        Address: "975 Fire Oak, Humble, TX",
        Sex: "M",
        Salary: 38000,
        Super_ssn: "333445555",
        Dno: 5,
      },
    }),
    prisma.eMPLOYEE.create({
      data: {
        Ssn: "453453453",
        Fname: "Joyce",
        Minit: "A",
        Lname: "English",
        Bdate: new Date("1972-07-31"),
        Address: "5631 Rice, Houston, TX",
        Sex: "F",
        Salary: 25000,
        Super_ssn: "333445555",
        Dno: 5,
      },
    }),
    prisma.eMPLOYEE.create({
      data: {
        Ssn: "987987987",
        Fname: "Ahmad",
        Minit: "V",
        Lname: "Jabbar",
        Bdate: new Date("1969-03-29"),
        Address: "980 Dallas, Houston, TX",
        Sex: "M",
        Salary: 25000,
        Super_ssn: "987654321",
        Dno: 4,
      },
    }),
  ]);

  // Projects
  const projects = await Promise.all([
    prisma.pROJECT.create({
      data: {
        Pname: "ProductX",
        Pnumber: 1,
        Plocation: "Bellaire",
        Dnum: 5,
      },
    }),
    prisma.pROJECT.create({
      data: {
        Pname: "ProductY",
        Pnumber: 2,
        Plocation: "Sugarland",
        Dnum: 5,
      },
    }),
    prisma.pROJECT.create({
      data: {
        Pname: "ProductZ",
        Pnumber: 3,
        Plocation: "Houston",
        Dnum: 5,
      },
    }),
    prisma.pROJECT.create({
      data: {
        Pname: "Computerization",
        Pnumber: 10,
        Plocation: "Stafford",
        Dnum: 4,
      },
    }),
    prisma.pROJECT.create({
      data: {
        Pname: "Reorganization",
        Pnumber: 20,
        Plocation: "Houston",
        Dnum: 1,
      },
    }),
    prisma.pROJECT.create({
      data: {
        Pname: "Newbenefits",
        Pnumber: 30,
        Plocation: "Stafford",
        Dnum: 4,
      },
    }),
  ]);

  // Works On
  await Promise.all([
    prisma.wORKS_ON.create({
      data: { Essn: "123456789", Pno: 1, Hours: 32.5 },
    }),
    prisma.wORKS_ON.create({ data: { Essn: "123456789", Pno: 2, Hours: 7.5 } }),
    prisma.wORKS_ON.create({
      data: { Essn: "666884444", Pno: 3, Hours: 40.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "453453453", Pno: 1, Hours: 20.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "453453453", Pno: 2, Hours: 20.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "333445555", Pno: 2, Hours: 10.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "333445555", Pno: 3, Hours: 10.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "333445555", Pno: 10, Hours: 10.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "333445555", Pno: 20, Hours: 10.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "999887777", Pno: 30, Hours: 30.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "999887777", Pno: 10, Hours: 10.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "987987987", Pno: 10, Hours: 35.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "987987987", Pno: 30, Hours: 5.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "987654321", Pno: 30, Hours: 20.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "987654321", Pno: 20, Hours: 15.0 },
    }),
    prisma.wORKS_ON.create({
      data: { Essn: "888665555", Pno: 20, Hours: null },
    }),
  ]);

  // Dependents
  await Promise.all([
    prisma.dEPENDENT.create({
      data: {
        Essn: "333445555",
        Dependent_name: "Alice",
        Sex: "F",
        Bdate: new Date("1986-04-05"),
        Relationship: "Daughter",
      },
    }),
    prisma.dEPENDENT.create({
      data: {
        Essn: "333445555",
        Dependent_name: "Theodore",
        Sex: "M",
        Bdate: new Date("1983-10-25"),
        Relationship: "Son",
      },
    }),
    prisma.dEPENDENT.create({
      data: {
        Essn: "333445555",
        Dependent_name: "Joy",
        Sex: "F",
        Bdate: new Date("1958-05-03"),
        Relationship: "Spouse",
      },
    }),
    prisma.dEPENDENT.create({
      data: {
        Essn: "987654321",
        Dependent_name: "Abner",
        Sex: "M",
        Bdate: new Date("1942-02-28"),
        Relationship: "Spouse",
      },
    }),
    prisma.dEPENDENT.create({
      data: {
        Essn: "123456789",
        Dependent_name: "Michael",
        Sex: "M",
        Bdate: new Date("1988-01-04"),
        Relationship: "Son",
      },
    }),
    prisma.dEPENDENT.create({
      data: {
        Essn: "123456789",
        Dependent_name: "Alice",
        Sex: "F",
        Bdate: new Date("1988-12-30"),
        Relationship: "Daughter",
      },
    }),
    prisma.dEPENDENT.create({
      data: {
        Essn: "123456789",
        Dependent_name: "Elizabeth",
        Sex: "F",
        Bdate: new Date("1967-05-05"),
        Relationship: "Spouse",
      },
    }),
  ]);

  console.log("✅ Database seeding completed successfully!");

  console.log("\n📊 Seeded data summary:");
  console.log(
    "• E-Commerce: 3 categories, 4 products, 3 customers, 2 orders, 2 reviews"
  );
  console.log(
    "• School: 3 teachers, 3 courses, 3 students, 5 enrollments, 3 grades"
  );
  console.log(
    "• Library: 3 authors, 2 publishers, 3 books, 2 members, 2 loans"
  );
  console.log(
    "• COMPANY: 3 departments, 8 employees, 6 projects, 16 work assignments, 7 dependents"
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
