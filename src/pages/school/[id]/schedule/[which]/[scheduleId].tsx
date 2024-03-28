import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Schedule from "@/components/Schedule";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const SchedulePage = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const who = router.query.which;
  const classId = Number(router.query.scheduleId);
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
  const handleBack = () => {
    router.push(`/school/${id}/scheduleTabs`);
  };

  return (
    <MainLayout
      isMain={false}
      link={t.schedule.toChooseClass}
      handleClick={handleBack}
      page={`/school/${id}/schedule/${who}/${classId}`}
    >
      <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
        {t.schedule.name}
      </h1>
      <Schedule />
    </MainLayout>
  );
};

export default SchedulePage;
