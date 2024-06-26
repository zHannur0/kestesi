import { FC } from "react";

interface StudentCardProps {
    id?: number;
    fullname?: string;
    student_success?: any;
    photo?: string;
    onClick?:  () => void;
}


const StudentsCard: FC<StudentCardProps> = ({
                                                 id,
                                                 fullname,
                                                 student_success,
                                                 photo
                                             }) => {
    return (
        <div
            className={`flex py-[20px] w-[520px] h-auto px-[30px] gap-[20px] rounded-[30px] bg-[#F8F8FB] 
            max-sm:w-full max-sm:rounded-[20px] vr:w-full`}
        >
            <img
                className={`w-40 h-40 min-w-40 rounded-[100%] max-sm:w-[120px] max-sm:h-[120px] max-sm:min-w-[120px] vr:h-[260px] vr:w-[160px] vr:min-w-[260px]`}
                src={photo ? photo : "/images/user.svg"}
                alt="Teacher"
            />
            <div>
                <h2 className={`text-2xl font-bold leading-normal text-[#211F23] max-sm:text-lg vr:text-[50px]`}>
                    {fullname}
                </h2>
                <p className={`text-[#211F23] text-2xl font-normal leading-[34.40px] max-sm:text-[14px] max-sm:leading-normal vr:text-[30px]`}>
                    {student_success}
                </p>
            </div>
        </div>
    );
};

export default StudentsCard;
