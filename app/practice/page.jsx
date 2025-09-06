import MainLayout from "../components/MainLayout";
import SQLQueryInterface from "../components/SQLQueryInterface";

export const metadata = {
  title: "تمرین SQL - آموزش سریع و آسان SQL",
  description: "محیط تمرین کوئری‌های SQL روی دیتابیس‌های نمونه",
};

export default function PracticePage() {
  return (
    <MainLayout>
      <SQLQueryInterface />
    </MainLayout>
  );
}
