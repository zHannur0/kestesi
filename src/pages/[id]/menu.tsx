import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Schedule from "@/components/Schedule";
import MenuBlocks from "@/components/blocks/MenuBlocks";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

const MenuPage = () => {
  const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
  const id = String(router.query.id);
  const handleBack = () => {
    router.push(`/school/${id}/main`);
  };

  return (
    <MainLayout isMain={false} link={t.menu.toTheMainPage} handleClick={handleBack} page={`/${id}/menu`} bg={"bg2"}>
      <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
        {t.menu.name}
      </h1>
      <MenuBlocks />
    </MainLayout>
  );
};

export default MenuPage;
