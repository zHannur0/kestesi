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
import {loadGetInitialProps} from "next/dist/shared/lib/utils";

interface TeachersTableProps {
    section?: IKruzhok;
}

const SectionsBlock: FC<TeachersTableProps> = ({ section }) => {
    const router = useRouter();
    const id = String(router.query.id);
    const time = new Date();
    console.log(time.getDay())
    console.log(section)
    const translations: any= {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;
    return (
        <div className={`w-full flex gap-[20px] max-sm:flex-col max-sm:gap-[10px] vr:flex-col sm:items-start`}>
            <div
                className={`w-[341px] h-[575px] flex flex-col items-center bg-white rounded-[40px]
                max-sm:flex-row max-sm:w-full max-sm:h-auto max-sm:px-[10px] max-sm:rounded-[20px] vr:flex-row vr:w-full vr:h-[300px] vr:p-[40px]`}
            >
                <img
                    src={section?.teacher?.photo3x4 ? section?.teacher?.photo3x4 : "/images/user.svg"}
                    alt="teacher"
                    className={`w-[544px] h-[369px] rounded-t-[40px] max-sm:w-[140px] max-sm:min-w-[140px] max-sm:h-[140px] max-sm:rounded-full vr:rounded-full vr:h-[200px] vr:w-[200px]`}
                />
                <div className={"flex flex-col gap-[20px] items-start text-left p-[30px] pb-[35px] vr:gap-[40px]"}>
                    <div className={`flex flex-col gap-[20px] text-left `}>
                        <p className="text-[#211F23] font-bold text-2xl max-sm:text-lg vr:text-[30px]">
                            {section?.teacher?.full_name}{" "}
                        </p>
                    </div>
                    <Link href={`/${id}/teacher/${section?.teacher?.id}`}>
                        <div
                            className="text-indigo-800 text-2xl font-medium btn-gradient-1 justify-center items-center inline-flex w-[280px] h-[64px]
                            max-sm:text-lg max-sm:px-[35px] max-sm:py-[10px] max-sm:w-auto max-sm:h-auto max-sm:rounded-[10px] vr:text-[30px]">
                            {t.sections.resume}
                        </div>
                    </Link>
                </div>
            </div>
            <div
                className={`flex flex-col items-start bg-white w-[998px] max-h-[910px] rounded-[40px] overflow-auto scrollbar-hide 
                max-sm:w-full max-sm:h-[600px] vr:w-full vr:h-[1250px] vr:max-h-none`}
            >
                <img src={section?.photo} alt="" className={"w-full h-[660px] max-sm:h-[300px] vr:h-[648px]"}/>
                <div className={"px-[50px] py-[30px] w-full flex flex-col gap-[30px] max-sm:p-[20px] vr:w-full"}>
                    { section?.purpose && <div className={"flex flex-col gap-[20px] text-[#211F23]"}>
                        <div className={"text-2xl font-bold vr:text-[50px]"}>
                            {t.sections.aboutSection}
                        </div>
                        <div className={"text-[18px] max-sm:text-[14px] vr:text-[30px]"}>
                            {section?.purpose}
                        </div>
                    </div>}
                    <div className={"flex flex-col gap-[20px] w-full"}>
                        <div className={"text-2xl font-bold vr:text-[50px]"}>
                            {t.teachers.schedule}
                        </div>
                        {
                            section?.lessons?.map((item, index) => (
                                <div key={index} className={"w-full py-[20px] px-[30px] gap-[20px] flex justify-between rounded-[20px] bg-[#F9F8FD] max-sm:p-[20px] vr:h-auto vr:w-full"}>
                                    <div className={`flex flex-col items-start h-full justify-between gap-[10px]`}>
                                        <div
                                            className={"text-2xl font-bold max-sm:text-lg vr:text-[40px]"}
                                            style={{color: Number(item.week_day) === time.getDay() ? "#ED008C" : "#211F23"}}>
                                            {t.days?.[item.week_day || ""]}
                                        </div>
                                        <div
                                            className={"text-[18px] text-[#7B7984] max-sm:text-[14px] vr:text-[30px]"}>
                                            {item.start_end_time}
                                        </div>
                                    </div>
                                    <div className={`flex flex-col h-full justify-between gap-[10px]`}>
                                        {Number(item.week_day) === time.getDay() ?
                                            <div
                                            className={"text-2xl max-sm:text-lg vr:text-[40px]"}
                                            style={{color: "#ED008C" }}>
                                            {t.schedule.Today}
                                        </div> : <div className={"text-[#F9F8FD]"}>a</div>}
                                        {item?.classroom &&
                                            <div
                                            className={"text-[18px] text-[#7B7984] max-sm:text-[14px] vr:text-[30px]"}>
                                            Кабинет <Link className={"text-[#524FA2] font-bold"}
                                                          href={`/${id}/schedule/classroom/${item?.classroom}`}>{item.classroom}</Link>
                                        </div>}
                                    </div>
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
