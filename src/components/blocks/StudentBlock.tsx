import { FC } from "react";
import {ISchoolPride, Teachers} from "@/types/assets.type";
import TeachersCard from "@/components/cards/TeachersCard";
import Button from "@/components/ui/Button";
import QrComponent from "@/components/QrComponent";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";
import Link from "next/link";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

interface StudentsProps {
    student?: ISchoolPride;
    t?: any;
}

const StudentBlock: FC<StudentsProps> = ({ student }) => {
    const router = useRouter();
    const id = String(router.query.id);
    const translations:any = {
        kz: kz,
        ru: ru,
        en: en,
    };
    const t = translations[router.locale || "kz"] || en;

    const successType = (success: string) => {
        if(success === "sport") {
            return t.proud.sports;
        }
        if(success === "oner") {
            return t.proud.art;
        }
        if(success === "olimpiada") {
            return t.proud.subjectOlympiad;
        }
        if(success === "altynbelgi") {
            return t.proud.goldMedal;
        }
        if(success === "redcertificate") {
            return t.proud.redDiploma;
        }
        return "";
    }
    return (
        <div className={`w-full flex gap-[20px] max-sm:flex-col max-sm:h-[90vh] max-sm:gap-[10px] vr:flex-col`}>
            <div
                className={`w-[341px] h-[575px] flex flex-col items-center justify-between bg-white rounded-[40px] py-[30px]
        max-sm:w-full max-sm:h-auto max-sm:flex-row max-sm:p-[20px] max-sm:gap-[10px] vr:w-full vr:h-auto vr:flex-row vr:p-[20px]`}
            >
                <img
                    src={student?.photo ? student?.photo : "/images/user.svg"}
                    alt="student"
                    className={`w-[280px] h-[280px] max-h-[280px] rounded-full max-sm:w-[140px] max-sm:h-[140px] max-sm:min-w-[140px] vr:w-[455px] vr:h-[460px]`}
                />
                <div className={`flex flex-col gap-[20px] text-left px-[30px] items-start max-sm:gap-[10px] max-sm:p-0 w-full `}>
                </div>
            </div>
                <div
                    className={`p-[50px] flex flex-col gap-[50px] bg-white w-[998px] max-h-[910px] rounded-[40px] overflow-auto scrollbar-hide 
        max-sm:w-full max-sm:px-[20px] max-sm:py-[10px] max-sm:h-[100%] vr:w-full vr:px-[40px] vr:max-h-[1300px]`}
                >
                    <div className={`flex flex-col gap-[20px] w-full`}>
                        <h1 className={`text-[#211F23] text-3xl font-bold leading-[8.40px] max-sm:text-2xl max-sm:leading-[30px]`}>
                            {successType(student?.success || "")}
                        </h1>
                        <div
                            className={`py-[20px] px-[30px] w-[full] min-h-[80px]  flex flex-col bg-slate-50 text-start gap-[20px] rounded-[20px]
              max-sm:p-[20px] max-sm:gap-[10px]`}
                        >
                            <p
                                className={`text-neutral-800 text-lg font-medium leading-none max-sm:text-[14px]`}
                            >
                                {student?.student_success}
                            </p>
                        </div>
                    </div>
                    <div className={`flex flex-col w-full gap-[20px]`}>
                        <h1 className={`text-[#211F23] text-3xl font-bold leading-[8.40px]`}>
                            {t.proud.head}
                        </h1>

                    </div>
                </div>
            <QrComponent/>
        </div>
    );
};


export default StudentBlock;
