import {useRouter} from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Schedule from "@/components/Schedule";
import MenuBlocks from "@/components/blocks/MenuBlocks";


const MenuPage = () => {
    const router = useRouter();
    const id=Number(router.query.id);
    const handleBack = () => {
        router.push(`/school/${id}/main`);
    }

    return (
        <MainLayout isMain={false} link={"на главную"} handleClick={handleBack}>
            <h1 className="text-[#211F23] text-4xl font-bold leading-[80%] mb-[30px]">
                {"Меню блюд в столовой"}
            </h1>
            <MenuBlocks/>
        </MainLayout>
    );
}

export default MenuPage;