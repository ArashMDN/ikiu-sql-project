import MainLayout from "../components/MainLayout";
import SQLPracticeInterface from "../components/SQLPracticeInterface";

export const metadata = {
  title: "تمرین SQL - آموزش سریع و آسان SQL",
  description: "محیط تمرین و حل سوالات SQL با سطوح مختلف دشواری",
};

export default function PracticePage() {
  return (
    <MainLayout>
      <SQLPracticeInterface />
    </MainLayout>
  );
}
