import { FC } from "react";
import {IKruzhok, Teachers} from "@/types/assets.type";
import TeachersCard from "@/components/cards/TeachersCard";
import Button from "@/components/ui/Button";
import QrComponent from "@/components/QrComponent";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import Link from "next/link";

interface TeachersTableProps {
    section?: IKruzhok;
}

const SectionsBlock: FC<TeachersTableProps> = ({ section }) => {
    const router = useRouter();
    const id = String(router.query.id);
    const time = new Date();

    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    return (
        <div className={`w-full flex gap-[20px]`}>
            <div
                className={`w-[341px] h-[575px] flex flex-col items-center bg-white rounded-[40px]`}
            >
                <img
                    src={section?.teacher?.photo3x4 ? section?.teacher?.photo3x4 : "/images/user.svg"}
                    alt="teacher"
                    className={`w-[544px] h-[369px] rounded-t-[20px]`}
                />
                <div className={"flex flex-col gap-[20px] items-start text-left p-[30px] pb-[35px]"}>
                    <div className={`flex flex-col gap-[20px] text-left`}>
                        <p className="text-[#211F23] font-bold text-2xl">
                            {section?.teacher?.full_name}{" "}
                        </p>
                    </div>
                    <Link href={`/${id}/teacher/${section?.teacher?.id}`}>
                        <div
                            className="text-indigo-800 text-2xl font-medium btn-gradient-1 justify-center items-center inline-flex w-[280px] h-[64px]">
                            {t.sections.resume}
                        </div>
                    </Link>
                </div>
            </div>
            <div
                className={`flex flex-col items-start bg-white w-[998px] max-h-[910px] rounded-[40px] overflow-auto scrollbar-hide `}
            >
                <img src={section?.photo} alt="" className={"w-[998px] h-[660px]"}/>
                <div className={"px-[50px] py-[30px] flex flex-col gap-[30px]"}>
                    <div className={"flex flex-col gap-[20px] text-[#211F23]"}>
                        <div className={"text-2xl font-bold"}>
                        {t.sections.aboutSection}
                        </div>
                        <div className={"text-[18px] "}>
                            {section?.purpose}
                        </div>
                    </div>
                    <div className={"flex flex-col gap-[20px]"}>
                        <div className={"text-2xl font-bold"}>
                            {t.teachers.schedule}
                        </div>
                        {
                            section?.lessons?.map((item, index) => (
                                <div key={index} className={"w-full h-[100px] py-[20px] px-[30px] gap-[20px] flex flex-col items-start rounded-[20px] bg-[#F9F8FD]"}>
                                    <div className={"text-2xl leading-[85%] font-bold"} style={{color: item.week_day === time.getDay() ? "#ED008C" : "#211F23"}}>
                                        {t.days?.[item.week_day || "none"]}
                                    </div>
                                    <div className={"text-[18px] leading-[70%] text-[#7B7984]"}>
                                        {item.start_end_time}
                                    </div>
                                 <div></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>

                </div>
            </div>

            <QrComponent/>
        </div>
    );
};




export default SectionsBlock;