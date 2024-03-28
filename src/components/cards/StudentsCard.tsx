import { FC } from "react";

interface StudentCardProps {
    id?: number;
    fullname?: string;
    student_success?: any;
    photo?: string;
}

const TeachersCard: FC<StudentCardProps> = ({
                                                 id,
                                                 fullname,
                                                 student_success,
                                                 photo
                                             }) => {
    return (
        <div
            className={`flex py-[20px] w-[520px] h-[200px] px-[30px] gap-[20px] rounded-[30px] bg-[#F8F8FB]`}
        >
            <img
                className={`w-40 h-40 min-w-40 rounded-[80px]`}
                src={photo ? photo : "/images/user.svg"}
                alt="Teacher"
            />
            <div>
                <h2 className={`text-2xl font-bold leading-normal text-[#524FA2]`}>
                    {fullname}
                </h2>
                <p className={`text-[#211F23] text-2xl font-normal leading-[34.40px]`}>
                    {student_success}
                </p>
            </div>
        </div>
    );
};

export default TeachersCard;
