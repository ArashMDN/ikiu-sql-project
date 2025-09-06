import MainLayout from "./components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          آموزش سریع و آسان SQL
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          به وبسایت آموزش SQL خوش آمدید. از منوی کناری موضوع مورد نظر خود را
          انتخاب کنید.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
              مبانی کوئری
            </h3>
            <p className="text-blue-600 dark:text-blue-400">
              یادگیری دستورات اصلی SQL مانند SELECT، INSERT، UPDATE و DELETE
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
              فیلترینگ کوئری
            </h3>
            <p className="text-green-600 dark:text-green-400">
              آموزش تکنیک‌های فیلتر کردن داده‌ها با WHERE، JOIN، GROUP BY و ...
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300 mb-2">
              توابع SQL
            </h3>
            <p className="text-purple-600 dark:text-purple-400">
              بررسی انواع توابع مجموعه‌ای، پنجره‌ای، رشته‌ای و عددی
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href="/practice"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-colors duration-200"
          >
            💻 شروع تمرین SQL
          </a>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            روی دیتابیس‌های واقعی تمرین کنید و مهارت خود را تقویت کنید
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
