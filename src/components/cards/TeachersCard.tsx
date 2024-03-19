import { FC } from "react";

interface TeachersCardProps{
    id?:number;
    img?: string;
    fullname?: string;
    job?: string;
    handleChooseTeacher?: any;
}

const TeachersCard: FC<TeachersCardProps> = ({id, img, fullname, job, handleChooseTeacher }) => {
    return (
        <div onClick={() => handleChooseTeacher(id)} className={`flex py-[20px] w-[520px] h-[200px] px-[30px] gap-[20px] rounded-[30px] border-2 border-purple-800`}>
             <img className={`w-40 rounded-[10px]`} src={img} alt="Teacher" />
            <div>
                 <h2 className={`text-neutral-800 text-2xl font-bold leading-normal`}>{fullname}</h2>
                 <p className={`text-zinc-500 text-2xl font-normal leading-[34.40px]`}>{job!=="Null" && job}</p>
            </div>
        </div>
    );
};

export default TeachersCard;
